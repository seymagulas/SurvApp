'use client';
import styles from './navbar.module.css';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Dancing_Script } from 'next/font/google';
const dans = Dancing_Script({
  subsets: ['latin'],
  weight: '600',
});
const Navbar = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [toggleDropdown, setToggleDropDown] = useState(false);

  return (
    <nav className=" w-full flex  justify-between mb-7 pt-3 ">
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
          SurApp
        </p>
      </Link>

      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link
              href="/dashboard/createNewSurvey"
              className="rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center"
            >
              Create Survey
            </Link>
            <button
              type="button"
              className="rounded-full border border-black bg-transparent py-1.5 px-5 text-black transition-all hover:bg-black hover:text-white text-center text-sm font-inter flex items-center justify-center"
              onClick={() => {
                setIsUserLoggedIn(false);
              }}
            >
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
            <button
              type="button"
              onClick={() => {
                setIsUserLoggedIn(true);
              }}
              className="rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center mr-10"
            >
              Sign in
            </button>
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
            {toggleDropdown && (
              <div className="absolute right-0 top-full mt-3 w-full bg-slate-50 p-5 rounded-lg bg-slate min-w-[210px] flex flex-col gap-2 justify-end items-end">
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
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropDown(false);
                    setIsUserLoggedIn(false);
                  }}
                  className=" mt-5 w-full rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                setIsUserLoggedIn(true);
              }}
              className="rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center mr-10"
            >
              Sign in
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
