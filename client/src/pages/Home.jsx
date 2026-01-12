import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Find the Perfect <span className="text-indigo-600">Freelancer</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            GigFlow connects clients with talented freelancers. Post a job, receive bids, 
            and hire the best talent for your project.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/gigs"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition"
            >
              Browse Gigs
            </Link>
            {isAuthenticated ? (
              <Link
                to="/gigs/create"
                className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-50 transition"
              >
                Post a Job
              </Link>
            ) : (
              <Link
                to="/register"
                className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-50 transition"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Post a Job</h3>
            <p className="text-gray-600">
              Describe your project and set your budget. It only takes a few minutes.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Receive Bids</h3>
            <p className="text-gray-600">
              Get proposals from talented freelancers ready to work on your project.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Hire the Best</h3>
            <p className="text-gray-600">
              Review proposals and hire the perfect freelancer for your needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
