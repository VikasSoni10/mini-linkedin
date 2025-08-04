import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  let userId;

  if (token) {
    try {
      userId = jwtDecode(token).id;
    } catch (error) {
      localStorage.removeItem('token');
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully.');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-linkedin-blue tracking-tight">
            Mini-In
          </Link>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-3">
            {token ? (
              <>
                <Link
                  to={`/profile/${userId}`}
                  className="text-sm font-medium text-linkedin-text-secondary hover:text-linkedin-blue transition"
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-red-600 hover:text-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-linkedin-text-secondary hover:text-linkedin-blue transition"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-medium text-white bg-linkedin-blue hover:bg-linkedin-blue-hover px-4 py-1.5 rounded-md transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
