import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bus, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { authState, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 max-w-7xl">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-primary-600">
            <Bus size={28} className="text-primary-500" />
            <span className="text-xl font-bold">TravelEase</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-primary-500 transition-colors">
              Home
            </Link>
            <Link to="/search" className="text-gray-600 hover:text-primary-500 transition-colors">
              Search Buses
            </Link>
            
            {authState.isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/bookings" className="text-gray-600 hover:text-primary-500 transition-colors">
                  My Bookings
                </Link>
                
                {authState.user?.isAdmin && (
                  <Link 
                    to="/admin" 
                    className="text-gray-600 hover:text-primary-500 transition-colors"
                  >
                    Admin Dashboard
                  </Link>
                )}
                
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-primary-500">
                    <User size={18} />
                    <span>{authState.user?.name}</span>
                  </button>
                  
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-10 transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-top-right invisible group-hover:visible">
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut size={16} className="mr-2" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-primary-500 focus:outline-none"
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-3">
            <Link 
              to="/" 
              className="block py-2 text-gray-600 hover:text-primary-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className="block py-2 text-gray-600 hover:text-primary-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Search Buses
            </Link>
            
            {authState.isAuthenticated ? (
              <>
                <Link 
                  to="/bookings" 
                  className="block py-2 text-gray-600 hover:text-primary-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Bookings
                </Link>
                
                {authState.user?.isAdmin && (
                  <Link 
                    to="/admin" 
                    className="block py-2 text-gray-600 hover:text-primary-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="py-2 text-gray-600">
                    Signed in as: <span className="font-medium">{authState.user?.name}</span>
                  </div>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center py-2 text-red-500 hover:text-red-600"
                  >
                    <LogOut size={16} className="mr-2" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                <Link 
                  to="/login" 
                  className="py-2 text-primary-600 hover:text-primary-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="py-2 px-4 bg-primary-500 text-white rounded-md hover:bg-primary-600 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;