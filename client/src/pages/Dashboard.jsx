import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyGigs, fetchMyBids } from '../store/gigSlice';
import { useSocket } from '../hooks/useSocket';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('myGigs');
  const dispatch = useDispatch();
  const { myGigs, myBids, isLoading } = useSelector(state => state.gigs);
  const { user } = useSelector(state => state.auth);
  
  // Initialize socket for real-time notifications
  useSocket();

  useEffect(() => {
    dispatch(fetchMyGigs());
    dispatch(fetchMyBids());
  }, [dispatch]);

  const statusColors = {
    open: 'bg-green-100 text-green-800',
    assigned: 'bg-yellow-100 text-yellow-800',
    pending: 'bg-blue-100 text-blue-800',
    hired: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.name}!</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('myGigs')}
            className={`px-6 py-3 font-medium text-sm cursor-pointer ${
              activeTab === 'myGigs'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            My Posted Jobs ({myGigs.length})
          </button>
          <button
            onClick={() => setActiveTab('myBids')}
            className={`px-6 py-3 font-medium text-sm cursor-pointer ${
              activeTab === 'myBids'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            My Bids ({myBids.length})
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <>
            {/* My Posted Jobs */}
            {activeTab === 'myGigs' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Jobs You Posted</h2>
                  <Link
                    to="/gigs/create"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
                  >
                    Post New Job
                  </Link>
                </div>
                {myGigs.length > 0 ? (
                  <div className="bg-white rounded-xl shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Budget
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Hired
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {myGigs.map(gig => (
                          <tr key={gig._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{gig.title}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">${gig.budget}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full font-medium ${statusColors[gig.status]}`}>
                                {gig.status.charAt(0).toUpperCase() + gig.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {gig.hiredFreelancerId?.name || '-'}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Link
                                to={`/gigs/${gig._id}`}
                                className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                              >
                                View Details
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow p-8 text-center">
                    <p className="text-gray-600 mb-4">You haven't posted any jobs yet.</p>
                    <Link
                      to="/gigs/create"
                      className="text-indigo-600 font-medium hover:text-indigo-500"
                    >
                      Post your first job
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* My Bids */}
            {activeTab === 'myBids' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Jobs You Bid On</h2>
                {myBids.length > 0 ? (
                  <div className="bg-white rounded-xl shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Job Title
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Your Bid
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Budget
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {myBids.map(bid => (
                          <tr key={bid._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {bid.gigId?.title || 'N/A'}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">${bid.price}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                ${bid.gigId?.budget || 'N/A'}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full font-medium ${statusColors[bid.status]}`}>
                                {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {bid.gigId && (
                                <Link
                                  to={`/gigs/${bid.gigId._id}`}
                                  className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                                >
                                  View Gig
                                </Link>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow p-8 text-center">
                    <p className="text-gray-600 mb-4">You haven't bid on any jobs yet.</p>
                    <Link
                      to="/gigs"
                      className="text-indigo-600 font-medium hover:text-indigo-500"
                    >
                      Browse available gigs
                    </Link>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
