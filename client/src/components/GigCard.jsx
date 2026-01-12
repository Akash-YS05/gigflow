import { Link } from 'react-router-dom';

const GigCard = ({ gig }) => {
  const statusColors = {
    open: 'bg-green-100 text-green-800',
    assigned: 'bg-yellow-100 text-yellow-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">
          {gig.title}
        </h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[gig.status]}`}>
          {gig.status.charAt(0).toUpperCase() + gig.status.slice(1)}
        </span>
      </div>
      <p className="text-gray-600 mb-4 line-clamp-2">
        {gig.description}
      </p>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-2xl font-bold text-indigo-600">${gig.budget}</span>
          <span className="text-gray-500 text-sm ml-1">Budget</span>
        </div>
        <Link
          to={`/gigs/${gig._id}`}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition"
        >
          View Details
        </Link>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-500">
          Posted by <span className="font-medium text-gray-700">{gig.ownerId?.name}</span>
        </p>
      </div>
    </div>
  );
};

export default GigCard;
