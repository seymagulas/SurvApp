'use client';
import styles from './navbar.module.css';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Dancing_Script } from 'next/font/google';
import { useAppSelector } from '@/src/redux/store';
const dans = Dancing_Script({
  subsets: ['latin'],
  weight: '600',
});
const Navbar = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [toggleDropdown, setToggleDropDown] = useState(false);

  const name = useAppSelector((state) => state.authReducer.value.username);
  return (
    <nav className=" w-full flex  justify-between mb-16 pt-3 ">
      <Link href="/" className="flex gap-2 flex-center">
        {/* <Image
          src="/assests/images/logo.png"
          alt="surapp logo"
          width={50}
          height={40}
          className="ml-10 object-contain"
        /> */}
        <p
          className={`${dans.className} marker:max-sm:hidden ml-10 text-3xl mt-2 text-black tracking-wide self-center `}
        >
          SurVapp
        </p>
      </Link>

      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/dashboard/createNewSurvey" className="black_button">
              Create Survey
            </Link>
            <button type="button" className="white_button" onClick={() => {}}>
              Sign Out
            </button>
            <Link href="/dashboard/userPage">
              <Image
                src="/assests/images/avatar.jpeg"
                width={47}
                height={47}
                className="rounded-full mr-5"
                alt="user-pic"
              />
            </Link>
          </div>
        ) : (
          <>
            <Link href="/dashboard/login">
              <button
                type="button"
                onClick={() => {}}
                className="black_button mr-5"
              >
                Sign in
              </button>
            </Link>
            <Link href="/dashboard/signup">
              <button
                type="button"
                onClick={() => {}}
                className="white_button mr-5"
              >
                Register
              </button>
            </Link>
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
              src="/assests/images/avatar.jpeg"
              width={37}
              height={37}
              className="rounded-full mr-5"
              alt="user-pic"
              onClick={() => setToggleDropDown((prev) => !prev)}
            />
            <span>HI {name}</span>
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/dashboard/userPage"
                  className=" text-sm font-inter text-gray-700 hover:text-gray-500 font-medium"
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/dashboard/createNewSurvey"
                  className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium;"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Survey
                </Link>
                <Link href="/">
                  <button
                    type="button"
                    onClick={() => {
                      setToggleDropDown(false);
                    }}
                    className="black_button"
                  >
                    Sign Out
                  </button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/dashboard/login">
              <button
                type="button"
                onClick={() => {
                  setIsUserLoggedIn(true);
                }}
                className="black_button mr-5"
              >
                Sign in
              </button>
            </Link>
            <Link href="/dashboard/signup">
              <button
                type="button"
                onClick={() => {
                  setIsUserLoggedIn(true);
                }}
                className="white_button mr-5"
              >
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
