'use client';
import './navbar.css';
import React from 'react';
import { useState } from 'react';
import { logout } from '../../services/auth.service';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [toggleDropdown, setToggleDropDown] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className=" w-full flex  justify-between mb-7 pt-3 ">
      <div className="flex gap-2 flex-center">
        <img
          src="https://pastlenomad.github.io/Pictures/Screenshot_2023-06-25_at_21.14.40-removebg-preview%20(1).png"
          alt="surapp logo"
          width={50}
          height={40}
          className="ml-10 object-contain"
        />
        <p
          className={`marker:max-sm:hidden ml-10 text-3xl mt-2 text-black tracking-wide self-center `}
        >
          SurVapp
        </p>
      </div>

      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        <div className="flex gap-3 md:gap-5">
          <button type="button" className="white_button" onClick={handleLogout}>
            Log Out
          </button>
          <Link to="/profile">
            <img
              src="/assests/images/avatar.jpeg"
              width={47}
              height={47}
              className="rounded-full mr-5"
              alt="user-pic"
            />
          </Link>
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        <div className="flex">
          <img
            src="/assests/images/avatar.jpeg"
            width={37}
            height={37}
            className="rounded-full mr-5"
            alt="user-pic"
            onClick={() => setToggleDropDown((prev) => !prev)}
          />
          {toggleDropdown && (
            <div className="dropdown">
              <Link
                to="/profile"
                className=" text-sm font-inter text-gray-700 hover:text-gray-500 font-medium"
                onClick={() => setToggleDropDown(false)}
              >
                My Profile
              </Link>
              <Link to="/">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="black_button"
                >
                  Log Out
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
