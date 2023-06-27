'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { userInfo, logOut } from '@/src/redux/features/auth-slice';
import styles from './page.module.css';
import Login from './(Auth)/login/page';
import Image from 'next/image';
import { Dancing_Script } from 'next/font/google';

const dans = Dancing_Script({
  subsets: ['latin'],

  weight: '400',
});

export default function Home() {


  return (
    <>
      <h1 className={`${dans.className}  text-6xl flex justify-center mt-10`}>
        Welcome to SurvApp!
      </h1>
      <div className="flex justify-center  ml-44 items-center mt-10">
        <div className="mr-20">
          <Image
            src="/assests/images/survapp.gif"
            alt="GIF"
            width={450}
            height={450}
          />
        </div>
          <Login/>
      </div>
    </>
  );
}
