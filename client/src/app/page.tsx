'use client';
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { userInfo, logOut } from '@/src/redux/features/auth-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/src/redux/store';
import styles from './page.module.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Dancing_Script } from 'next/font/google';

const dans = Dancing_Script({
  subsets: ['latin'],

  weight: '400',
});

export default function Home() {
  const router = useRouter();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  type Props = Yup.InferType<typeof schema>;
  const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    password: Yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<Props>({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const handleValidSubmit = async (data: Props) => {
    setIsSubmitted(true);

    try {
      const response = await axios.post('/api/test', {
        username: data.name,
        password: data.password,
      });
      console.log(response);
      if (response.status == 201) {
        dispatch(
          userInfo({
            username: response.data.username,
            password: response.data.password,
          }),
        );
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error(error.message);
    }
    setIsSubmitted(false);
  };

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
        <div className="  w-5/6 relative flex flex-col max-h-screen overflow-hidden">
          <div className="p-6 mt-4 bg-white rounded-md shadow-md lg:max-w-lg">
            <h1 className="text-3xl font-bold text-center text-gray-700">
              Login
            </h1>
            <form className="mt-6" onSubmit={handleSubmit(handleValidSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="name"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md
               focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring 
               focus:ring-opacity-40"
                  {...register('name')}
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md
               focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring
                focus:ring-opacity-40"
                  {...register('password')}
                />
              </div>

              <Link
                href="/forget"
                className="text-xs text-blue-600 hover:underline"
              >
                Forget Password?
              </Link>
              <div className="mt-2">
                <button
                  type="submit"
                  disabled={!isDirty || !isValid || isSubmitted}
                  className="disabled_button"
                >
                  Login
                </button>
              </div>
            </form>

            <p className="mt-4 text-sm text-center text-gray-700">
              Don&apos;t have an account?
              <Link
                href="/register"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
