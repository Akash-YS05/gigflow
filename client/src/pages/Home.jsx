import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-bold text-xl text-slate-900">GigFlow</div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-600 hover:text-slate-900 text-sm font-medium">
              Features
            </a>
            <a href="#pricing" className="text-slate-600 hover:text-slate-900 text-sm font-medium">
              Pricing
            </a>
            <a href="#testimonials" className="text-slate-600 hover:text-slate-900 text-sm font-medium">
              Testimonials
            </a>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                to="/gigs/create"
                className="bg-slate-900 text-white px-6 py-2 text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                Post Job
              </Link>
            ) : (
              <Link
                to="/register"
                className="bg-slate-900 text-white px-6 py-2 text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-20 md:pt-20 md:pb-28 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block mb-6 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full">
              <span className="text-blue-300 text-sm font-medium">Trusted by 50,000+ freelancers</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight text-balance">
              The global platform for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                talented creators
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed font-light">
              Connect with elite freelancers worldwide. Post your project, receive vetted proposals, and deliver
              excellence every time.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/gigs"
                className="bg-white text-slate-900 px-8 py-3.5 text-base font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Browse Talent
              </Link>
              {isAuthenticated ? (
                <Link
                  to="/gigs/create"
                  className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3.5 text-base font-semibold transition-colors duration-200 border border-slate-600"
                >
                  Post Your Project
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3.5 text-base font-semibold transition-colors duration-200 border border-slate-600"
                >
                  Get Started Free
                </Link>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-8 border-t border-slate-800 pt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50K+</div>
              <div className="text-slate-400 text-sm">Active Freelancers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">$500M+</div>
              <div className="text-slate-400 text-sm">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">98%</div>
              <div className="text-slate-400 text-sm">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Why Choose GigFlow?</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Everything you need to find, hire, and work with world-class talent
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mb-6 group-hover:from-blue-100 group-hover:to-blue-200 transition-colors">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Lightning Fast</h3>
            <p className="text-slate-600 leading-relaxed font-light">
              Get matched with perfect candidates in minutes, not days. Our AI algorithm finds exactly who you need.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mb-6 group-hover:from-blue-100 group-hover:to-blue-200 transition-colors">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Vetted Professionals</h3>
            <p className="text-slate-600 leading-relaxed font-light">
              Every freelancer on our platform is thoroughly vetted and verified for skills and reliability.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mb-6 group-hover:from-blue-100 group-hover:to-blue-200 transition-colors">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Transparent Pricing</h3>
            <p className="text-slate-600 leading-relaxed font-light">
              No hidden fees. You only pay for results. Secure payments and milestone-based releases.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mb-6 group-hover:from-blue-100 group-hover:to-blue-200 transition-colors">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Advanced Tools</h3>
            <p className="text-slate-600 leading-relaxed font-light">
              Project tracking, time logging, and collaboration tools built in to ensure smooth workflows.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mb-6 group-hover:from-blue-100 group-hover:to-blue-200 transition-colors">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Full Control</h3>
            <p className="text-slate-600 leading-relaxed font-light">
              Customize your project requirements, hiring criteria, and communication preferences.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mb-6 group-hover:from-blue-100 group-hover:to-blue-200 transition-colors">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">24/7 Support</h3>
            <p className="text-slate-600 leading-relaxed font-light">
              Our expert support team is always ready to help. Live chat, email, and phone support available.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="bg-slate-50 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Trusted by Leading Companies</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              See what clients and freelancers say about their GigFlow experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Founder, TechStartup Co",
                text: "GigFlow made it incredibly easy to find experienced developers. The entire hiring process took less than a week.",
                rating: 5,
              },
              {
                name: "Marcus Johnson",
                role: "Senior Designer",
                text: "As a freelancer, I've earned more in 6 months on GigFlow than I did in 2 years on other platforms.",
                rating: 5,
              },
              {
                name: "Priya Patel",
                role: "Project Manager",
                text: "The built-in collaboration tools are a game-changer. We've cut project delivery time by 40%.",
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white p-8 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20 overflow-hidden">
        
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-300 mb-10">
            Join thousands of successful clients and freelancers on GigFlow
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">

            <Link
              to="/register"
              className="bg-white text-slate-900 px-8 py-3.5 font-semibold hover:bg-gray-100 transition-all"
            >
              Create Your Account
            </Link>
            <Link
              to="/gigs"
              className="bg-slate-700 text-white px-8 py-3.5 font-semibold hover:bg-slate-600 transition-all border border-slate-600"
            >
              Browse Talent
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 text-gray-400 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-white mb-4">GigFlow</h4>
              <p className="text-sm">The global platform for talented creators</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">&copy; 2026 GigFlow. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="https://x.com/akashpandeytwt" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                Twitter
              </a>
              <a href="https://linkedin.com/in/li-akash-pandey" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                LinkedIn
              </a>
              <a href="https://github.com/Akash-YS05" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
