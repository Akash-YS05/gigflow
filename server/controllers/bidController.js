const mongoose = require('mongoose');
const Bid = require('../models/Bid');
const Gig = require('../models/Gig');

//to submit a bid for a gig
const submitBid = async (req, res) => {
  try {
    const { gigId, message, price } = req.body;

    //check if gig exists and is open
    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({
        success: false,
        message: 'Gig not found'
      });
    }

    if (gig.status !== 'open') {
      return res.status(400).json({
        success: false,
        message: 'This gig is no longer accepting bids'
      });
    }

    //owner cant bid on their own gig
    if (gig.ownerId.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot bid on your own gig'
      });
    }

    //check if user already bid on this gig
    const existingBid = await Bid.findOne({
      gigId,
      freelancerId: req.user._id
    });

    if (existingBid) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted a bid for this gig'
      });
    }

    const bid = await Bid.create({
      gigId,
      freelancerId: req.user._id,
      message,
      price
    });

    const populatedBid = await Bid.findById(bid._id)
      .populate('freelancerId', 'name email')
      .populate('gigId', 'title');

    //socket event for new bid
    if (req.io) {
      req.io.to(`gig_${gigId}`).emit('newBid', populatedBid);
    }

    res.status(201).json({
      success: true,
      bid: populatedBid
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// to get all bids for a gig (Owner only)

const getBidsForGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.gigId);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: 'Gig not found'
      });
    }

    if (gig.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view bids for this gig'
      });
    }

    const bids = await Bid.find({ gigId: req.params.gigId })
      .populate('freelancerId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bids.length,
      bids
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

//to hire a freelancer (Atomic update with optimistic locking)
const hireBid = async (req, res) => {
  try {
    // Find the bid
    const bid = await Bid.findById(req.params.bidId);

    if (!bid) {
      return res.status(404).json({
        success: false,
        message: 'Bid not found'
      });
    }

    const gig = await Gig.findById(bid.gigId);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: 'Gig not found'
      });
    }

    //verify the requester is the gig owner
    if (gig.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Only the gig owner can hire freelancers'
      });
    }

    if (gig.status !== 'open') {
      return res.status(400).json({
        success: false,
        message: 'This gig has already been assigned to another freelancer'
      });
    }

    if (bid.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'This bid is no longer available'
      });
    }

    //preventing race conditions - only one hire can succeed
    const updatedGig = await Gig.findOneAndUpdate(
      { 
        _id: gig._id, 
        status: 'open'
      },
      { 
        status: 'assigned',
        hiredFreelancerId: bid.freelancerId
      },
      { 
        new: true
      }
    );

    //if gig wasn't updated (race condition - another hire happened first)
    if (!updatedGig) {
      return res.status(400).json({
        success: false,
        message: 'This gig has already been assigned. Please refresh.'
      });
    }

    await Bid.findByIdAndUpdate(bid._id, { status: 'hired' });

    await Bid.updateMany(
      { 
        gigId: gig._id, 
        _id: { $ne: bid._id },
        status: 'pending'
      },
      { status: 'rejected' }
    );

    const finalBid = await Bid.findById(bid._id)
      .populate('freelancerId', 'name email')
      .populate('gigId', 'title');

    const finalGig = await Gig.findById(gig._id)
      .populate('ownerId', 'name email')
      .populate('hiredFreelancerId', 'name email');

    if (req.io) {
      req.io.to(`user_${bid.freelancerId}`).emit('hired', {
        message: `You have been hired for "${gig.title}"!`,
        gig: finalGig,
        bid: finalBid
      });

      const rejectedBids = await Bid.find({ 
        gigId: gig._id, 
        status: 'rejected' 
      });

      rejectedBids.forEach(rejectedBid => {
        req.io.to(`user_${rejectedBid.freelancerId}`).emit('bidRejected', {
          message: `Your bid for "${gig.title}" was not selected.`,
          gigId: gig._id
        });
      });

      req.io.to(`gig_${gig._id}`).emit('gigUpdated', finalGig);
    }

    res.status(200).json({
      success: true,
      message: 'Freelancer hired successfully',
      bid: finalBid,
      gig: finalGig
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  submitBid,
  getBidsForGig,
  hireBid
};
