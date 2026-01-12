const BidCard = ({ bid, isOwner, onHire, isLoading }) => {
  const statusColors = {
    pending: 'bg-blue-100 text-blue-800',
    hired: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-semibold text-gray-800">
            {bid.freelancerId?.name}
          </h4>
          <p className="text-sm text-gray-500">{bid.freelancerId?.email}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[bid.status]}`}>
          {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
        </span>
      </div>
      <p className="text-gray-600 mb-3">{bid.message}</p>
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold text-indigo-600">${bid.price}</span>
        {isOwner && bid.status === 'pending' && (
          <button
            onClick={() => onHire(bid._id)}
            disabled={isLoading}
            className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? 'Hiring...' : 'Hire'}
          </button>
        )}
        {bid.status === 'hired' && (
          <span className="text-green-600 font-semibold">Hired!</span>
        )}
      </div>
    </div>
  );
};

export default BidCard;
