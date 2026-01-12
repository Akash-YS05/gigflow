"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchGigs } from "../store/gigSlice"
import GigCard from "../components/GigCard"

const GigList = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const dispatch = useDispatch()
  const { gigs, isLoading } = useSelector((state) => state.gigs)

  useEffect(() => {
    dispatch(fetchGigs())
  }, [dispatch])

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(fetchGigs(searchTerm))
  }

  const handleClear = () => {
    setSearchTerm("")
    dispatch(fetchGigs(""))
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Browse Open Gigs</h1>
          <p className="text-slate-600 mb-6 font-light">Find the perfect job that matches your skills</p>
          <form onSubmit={handleSearch} className="flex gap-3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search gigs by title..."
              className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer shadow-lg"
            >
              Search
            </button>
            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="bg-slate-200 text-slate-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-slate-300 transition cursor-pointer"
              >
                Clear
              </button>
            )}
          </form>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : gigs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gigs.map((gig) => (
              <GigCard key={gig._id} gig={gig} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No gigs found. Try a different search.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default GigList
