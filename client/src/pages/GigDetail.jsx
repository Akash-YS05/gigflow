import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGig } from '../store/gigSlice';
import { fetchBidsForGig, submitBid, hireBid, clearBids } from '../store/bidSlice';
import { useSocket } from '../hooks/useSocket';
import BidCard from '../components/BidCard';
import toast from 'react-hot-toast';

const GigDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentGig, isLoading: gigLoading } = useSelector(state => state.gigs);
  const { bids, isLoading: bidLoading } = useSelector(state => state.bids);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const { joinGigRoom, leaveGigRoom } = useSocket();

  const [showBidForm, setShowBidForm] = useState(false);
  const [bidData, setBidData] = useState({ message: '', price: '' });

  const isOwner = user && currentGig?.ownerId?._id === user._id;

  useEffect(() => {
    dispatch(fetchGig(id));
    joinGigRoom(id);

    return () => {
      dispatch(clearBids());
      leaveGigRoom(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  useEffect(() => {
    if (isOwner) {
      dispatch(fetchBidsForGig(id));
    }
  }, [dispatch, id, isOwner]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(submitBid({
      gigId: id,
      message: bidData.message,
      price: Number(bidData.price)
    }));

    if (submitBid.fulfilled.match(result)) {
      toast.success('Bid submitted successfully!');
      setShowBidForm(false);
      setBidData({ message: '', price: '' });
    } else {
      toast.error(result.payload || 'Failed to submit bid');
    }
  };

  const handleHire = async (bidId) => {
    const result = await dispatch(hireBid(bidId));
    if (hireBid.fulfilled.match(result)) {
      toast.success('Freelancer hired successfully!');
      dispatch(fetchGig(id));
    } else {
      toast.error(result.payload || 'Failed to hire freelancer');
    }
  };

  if (gigLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!currentGig) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600 text-lg">Gig not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Gig Details */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{currentGig.title}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              currentGig.status === 'open' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {currentGig.status === 'open' ? 'Open' : 'Assigned'}
            </span>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-600 whitespace-pre-wrap">{currentGig.description}</p>
          </div>

          <div className="flex items-center justify-between border-t pt-6">
            <div>
              <span className="text-3xl font-bold text-indigo-600">${currentGig.budget}</span>
              <span className="text-gray-500 ml-2">Budget</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Posted by</p>
              <p className="font-medium text-gray-900">{currentGig.ownerId?.name}</p>
            </div>
          </div>

          {currentGig.status === 'assigned' && currentGig.hiredFreelancerId && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-green-800 font-medium">
                Hired: {currentGig.hiredFreelancerId.name} ({currentGig.hiredFreelancerId.email})
              </p>
            </div>
          )}

          {/* Bid Button for non-owners */}
          {isAuthenticated && !isOwner && currentGig.status === 'open' && (
            <div className="mt-6">
              {!showBidForm ? (
                <button
                  onClick={() => setShowBidForm(true)}
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition cursor-pointer"
                >
                  Place a Bid
                </button>
              ) : (
                <form onSubmit={handleBidSubmit} className="space-y-4 border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900">Submit Your Bid</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message
                    </label>
                    <textarea
                      value={bidData.message}
                      onChange={(e) => setBidData({ ...bidData, message: e.target.value })}
                      required
                      rows={4}
                      maxLength={1000}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                      placeholder="Explain why you're the best fit for this job..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Price ($)
                    </label>
                    <input
                      type="number"
                      value={bidData.price}
                      onChange={(e) => setBidData({ ...bidData, price: e.target.value })}
                      required
                      min={1}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      placeholder="Enter your price"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowBidForm(false)}
                      className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={bidLoading}
                      className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {bidLoading ? 'Submitting...' : 'Submit Bid'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {isOwner && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Bids ({bids.length})
            </h2>
            {bidLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </div>
            ) : bids.length > 0 ? (
              <div className="space-y-4">
                {bids.map(bid => (
                  <BidCard
                    key={bid._id}
                    bid={bid}
                    isOwner={isOwner}
                    onHire={handleHire}
                    isLoading={bidLoading}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">
                No bids yet. Share your gig to get more visibility!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GigDetail;
