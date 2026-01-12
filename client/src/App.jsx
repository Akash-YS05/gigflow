import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import store from './store';
import { getMe } from './store/authSlice';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import GigList from './pages/GigList';
import GigDetail from './pages/GigDetail';
import CreateGig from './pages/CreateGig';
import Dashboard from './pages/Dashboard';

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/gigs" element={<GigList />} />
          <Route path="/gigs/:id" element={<GigDetail />} />
          <Route
            path="/gigs/create"
            element={
              <ProtectedRoute>
                <CreateGig />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Toaster position="top-right" />
    </Router>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
