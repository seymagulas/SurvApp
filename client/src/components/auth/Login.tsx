'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, login } from '../../services/auth.service';
import axios from 'axios';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<FormData>({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const handleValidSubmit = async (data: FormData) => {
    setIsSubmitted(true);
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      });
      if (response) {
        await getUser();
        navigate('/main');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
      throw error;
    }
    setIsSubmitted(false);
  };

  return (
    <>
      <h1 className={`text-6xl flex justify-center mt-10`}>
        Welcome to SurvApp!
      </h1>
      <div className="flex justify-center  ml-44 items-center mt-10">
        <div className="mr-20">
          <img
            src="/assests/images/survapp.gif"
            alt="flying messages"
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
                  Email
                </label>
                <input
                  type="text"
                  id="name"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md
               focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring 
               focus:ring-opacity-40"
                  {...register('email')}
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

              <div className="mt-2">
                <button
                  id="login"
                  type="submit"
                  disabled={!isDirty || !isValid || isSubmitted}
                  className="disabled_button"
                >
                  Login
                </button>
              </div>
            </form>

            <p className="mt-4 text-sm text-center text-gray-700">
              Don&apos;t have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
