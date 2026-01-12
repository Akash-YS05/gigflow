"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { createGig } from "../store/gigSlice"
import toast from "react-hot-toast"

const CreateGig = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading } = useSelector((state) => state.gigs)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const result = await dispatch(
      createGig({
        ...formData,
        budget: Number(formData.budget),
      }),
    )

    if (createGig.fulfilled.match(result)) {
      toast.success("Gig created successfully!")
      navigate("/dashboard")
    } else {
      toast.error(result.payload || "Failed to create gig")
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-slate-200">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Post a New Job</h1>
          <p className="text-slate-600 mb-6 font-light">Get quality work from experienced professionals</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-slate-900 mb-2">
                Job Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                maxLength={100}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-slate-50"
                placeholder="e.g., Build a React Dashboard"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-slate-900 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
                maxLength={2000}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none bg-slate-50"
                placeholder="Describe your project requirements in detail..."
              />
              <p className="text-sm text-slate-500 mt-1">{formData.description.length}/2000 characters</p>
            </div>
            <div>
              <label htmlFor="budget" className="block text-sm font-semibold text-slate-900 mb-2">
                Budget ($)
              </label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                min={1}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-slate-50"
                placeholder="e.g., 500"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 bg-slate-200 text-slate-700 py-2.5 px-4 rounded-lg font-semibold hover:bg-slate-300 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg"
              >
                {isLoading ? "Creating..." : "Post Job"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateGig
