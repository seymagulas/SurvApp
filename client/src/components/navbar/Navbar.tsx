'use client';
import './navbar.css';
import React from 'react';
import { useState } from 'react';
import { logout } from '../../services/auth.service';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg mb-10 w-full p-2">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link className="flex gap-2 flex-center items-center" to="/main">
              <img
                className="h-10 w-10"
                src="/assests/images/logo.png"
                alt="Logo"
              />
              <p
                className={`marker:max-sm:hidden text-3xl text-black tracking-wide self-center `}
              >
                SurVapp
              </p>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link to="/profile">
              <img
                src="/assests/images/avatar.jpeg"
                width={47}
                height={47}
                className="rounded-full mr-5"
                alt="user-pic"
              />
            </Link>
            <button className="white_button" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div className="sm:hidden flex items-center -mr-2">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              className="block px-3 py-2 rounded-md text-left font-medium text-black hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
              to="/profile"
            >
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="w-full block px-3 py-2 rounded-md text-left font-medium text-black hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
