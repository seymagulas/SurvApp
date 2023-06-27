'use client';
import styles from './navbar.module.css';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Dancing_Script } from 'next/font/google';
import { useAppSelector } from '@/src/redux/store';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/src/redux/store';
import { logout } from '@src/services/auth.service';

const dans = Dancing_Script({
  subsets: ['latin'],
  weight: '600',
});
const Navbar = () => {
  const [toggleDropdown, setToggleDropDown] = useState(false);

  const name = useAppSelector((state) => state.authReducer.value.username);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    logout();
    router.push('/');
   
  };
  return (
    <nav className=" w-full flex  justify-between mb-7 pt-3 ">
      <div className="flex gap-2 flex-center">
        <Image
          src="https://pastlenomad.github.io/Pictures/Screenshot_2023-06-25_at_21.14.40-removebg-preview%20(1).png"
          alt="surapp logo"
          width={50}
          height={40}
          className="ml-10 object-contain"
        />
        <p
          className={`${dans.className} marker:max-sm:hidden ml-10 text-3xl mt-2 text-black tracking-wide self-center `}
        >
          SurVapp
        </p>
      </div>

      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        <div className="flex gap-3 md:gap-5">
          {/* <Link href="/dashboard/createNewSurvey" className="black_button">
            Create Survey
          </Link> */}
          <button
            type="button"
            className="white_button"
            
           onClick={handleLogout}
              
          >
            Log Out
          </button>
          <Link href="/userPage">
            <Image
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
                href="/userPage"
                className=" text-sm font-inter text-gray-700 hover:text-gray-500 font-medium"
                onClick={() => setToggleDropDown(false)}
              >
                My Profile
              </Link>
              <Link
                href="/createNewSurvey"
                className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium;"
                onClick={() => setToggleDropDown(false)}
              >
                Create Survey
              </Link>
              <Link href="/">
                <button
                  type="button"
                  onClick={() => {
                    dispatch(logOut());
                  }}
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
