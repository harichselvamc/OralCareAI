import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Home, Info, List, LogIn } from 'lucide-react';

export function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/signin');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link to="/" className="flex items-center space-x-2 text-blue-600">
              <Activity className="h-6 w-6" />
              <span className="font-bold text-xl">OralCare AI</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-100">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link to="/about" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-100">
                <Info className="h-4 w-4" />
                <span>About</span>
              </Link>
              <Link to="/diseases" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-100">
                <List className="h-4 w-4" />
                <span>Diseases</span>
              </Link>
              <Link to="/predict" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-100">
                <Activity className="h-4 w-4" />
                <span>Predict</span>
              </Link>

              {/* New Link for Prediction History */}
              {user && (
                <Link to="/prediction-history" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-100">
                  <List className="h-4 w-4" />
                  <span>Prediction History</span>
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-700">Welcome, {user}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                className="flex items-center space-x-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
