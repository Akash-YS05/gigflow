const Gig = require('../models/Gig');
const Bid = require('../models/Bid');

const getGigs = async (req, res) => {
  try {
    const { search } = req.query;
    let query = { status: 'open' };

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const gigs = await Gig.find(query)
      .populate('ownerId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: gigs.length,
      gigs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id)
      .populate('ownerId', 'name email')
      .populate('hiredFreelancerId', 'name email');

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: 'Gig not found'
      });
    }

    res.status(200).json({
      success: true,
      gig
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const createGig = async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    const gig = await Gig.create({
      title,
      description,
      budget,
      ownerId: req.user._id
    });

    const populatedGig = await Gig.findById(gig._id)
      .populate('ownerId', 'name email');

    res.status(201).json({
      success: true,
      gig: populatedGig
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ ownerId: req.user._id })
      .populate('ownerId', 'name email')
      .populate('hiredFreelancerId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: gigs.length,
      gigs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getMyBidGigs = async (req, res) => {
  try {
    const bids = await Bid.find({ freelancerId: req.user._id })
      .populate({
        path: 'gigId',
        populate: { path: 'ownerId', select: 'name email' }
      })
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

module.exports = {
  getGigs,
  getGig,
  createGig,
  getMyGigs,
  getMyBidGigs
};
