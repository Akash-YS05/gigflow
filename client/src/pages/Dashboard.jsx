"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchMyGigs, fetchMyBids } from "../store/gigSlice"
import { useSocket } from "../hooks/useSocket"

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("myGigs")
  const dispatch = useDispatch()
  const { myGigs, myBids, isLoading } = useSelector((state) => state.gigs)
  const { user } = useSelector((state) => state.auth)

  useSocket()

  useEffect(() => {
    dispatch(fetchMyGigs())
    dispatch(fetchMyBids())
  }, [dispatch])

  const statusColors = {
    open: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    assigned: "bg-amber-50 text-amber-700 border border-amber-200",
    pending: "bg-blue-50 text-blue-700 border border-blue-200",
    hired: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    rejected: "bg-red-50 text-red-700 border border-red-200",
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-2 font-light">Welcome back, {user?.name}!</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 mb-8">
          <button
            onClick={() => setActiveTab("myGigs")}
            className={`px-6 py-3 font-semibold text-sm cursor-pointer transition ${
              activeTab === "myGigs"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            My Posted Jobs ({myGigs.length})
          </button>
          <button
            onClick={() => setActiveTab("myBids")}
            className={`px-6 py-3 font-semibold text-sm cursor-pointer transition ${
              activeTab === "myBids"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            My Bids ({myBids.length})
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {activeTab === "myGigs" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">Jobs You Posted</h2>
                  <Link
                    to="/gigs/create"
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition shadow-lg"
                  >
                    Post New Job
                  </Link>
                </div>
                {myGigs.length > 0 ? (
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-slate-200">
                    <table className="min-w-full divide-y divide-slate-200">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                            Title
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                            Budget
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                            Hired
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-200">
                        {myGigs.map((gig) => (
                          <tr key={gig._id} className="hover:bg-slate-50 transition">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-semibold text-slate-900">{gig.title}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-semibold text-slate-900">${gig.budget}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-3 py-1.5 text-xs rounded-full font-semibold ${statusColors[gig.status]}`}
                              >
                                {gig.status.charAt(0).toUpperCase() + gig.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-slate-600">{gig.hiredFreelancerId?.name || "-"}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Link
                                to={`/gigs/${gig._id}`}
                                className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
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
                  <div className="bg-white rounded-lg shadow-lg p-8 text-center border border-slate-200">
                    <p className="text-slate-600 mb-4 font-light">You haven't posted any jobs yet.</p>
                    <Link to="/gigs/create" className="text-blue-600 font-semibold hover:text-blue-700">
                      Post your first job
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === "myBids" && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Jobs You Bid On</h2>
                {myBids.length > 0 ? (
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-slate-200">
                    <table className="min-w-full divide-y divide-slate-200">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                            Job Title
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                            Your Bid
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                            Budget
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-200">
                        {myBids.map((bid) => (
                          <tr key={bid._id} className="hover:bg-slate-50 transition">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-semibold text-slate-900">{bid.gigId?.title || "N/A"}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-semibold text-slate-900">${bid.price}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-slate-600">${bid.gigId?.budget || "N/A"}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-3 py-1.5 text-xs rounded-full font-semibold ${statusColors[bid.status]}`}
                              >
                                {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {bid.gigId && (
                                <Link
                                  to={`/gigs/${bid.gigId._id}`}
                                  className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
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
                  <div className="bg-white rounded-lg shadow-lg p-8 text-center border border-slate-200">
                    <p className="text-slate-600 mb-4 font-light">You haven't bid on any jobs yet.</p>
                    <Link to="/gigs" className="text-blue-600 font-semibold hover:text-blue-700">
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
  )
}

export default Dashboard
