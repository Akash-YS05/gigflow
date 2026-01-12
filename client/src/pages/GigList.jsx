import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGigs } from '../store/gigSlice';
import GigCard from '../components/GigCard';

const GigList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const { gigs, isLoading } = useSelector(state => state.gigs);

  useEffect(() => {
    dispatch(fetchGigs());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchGigs(searchTerm));
  };

  const handleClear = () => {
    setSearchTerm('');
    dispatch(fetchGigs(''));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Open Gigs</h1>
          <form onSubmit={handleSearch} className="flex gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search gigs by title..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition cursor-pointer"
            >
              Search
            </button>
            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition cursor-pointer"
              >
                Clear
              </button>
            )}
          </form>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : gigs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gigs.map(gig => (
              <GigCard key={gig._id} gig={gig} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No gigs found. Try a different search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GigList;
