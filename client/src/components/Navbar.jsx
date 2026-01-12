"use client"

import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../store/authSlice"
import toast from "react-hot-toast"

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await dispatch(logout())
    toast.success("Logged out successfully")
    navigate("/")
  }

  return (
    <nav className="bg-slate-900 border-b border-slate-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
                GigFlow
              </span>
            </Link>
            <div className="hidden md:flex ml-12 space-x-8">
              <Link
                to="/gigs"
                className="text-slate-300 hover:text-blue-400 px-3 py-2 rounded text-sm font-medium transition-colors duration-200"
              >
                Browse Gigs
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/gigs/create"
                    className="text-slate-300 hover:text-blue-400 px-3 py-2 rounded text-sm font-medium transition-colors duration-200"
                  >
                    Post a Job
                  </Link>
                  <Link
                    to="/dashboard"
                    className="text-slate-300 hover:text-blue-400 px-3 py-2 rounded text-sm font-medium transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-6">
                <span className="text-slate-300 text-sm">
                  Welcome, <span className="font-semibold text-white">{user?.name}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 text-white px-5 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-x-4 flex">
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-blue-400 px-3 py-2 rounded text-sm font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-5 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
