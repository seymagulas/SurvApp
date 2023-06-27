'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
const Register = () => {
  const router = useRouter();
  type Props = Yup.InferType<typeof schema>;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string()
      .required()
      .matches(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
        'Password should contains a lowercase, a uppercase character and a digit.',
      ),
    confirmPassword: Yup.string()
      .required()
      .matches(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
        'Password should contains a lowercase, a uppercase character and a digit.',
      )
      .oneOf([Yup.ref('password')]),
  });

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm<Props>({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const handleValidSubmit = async (data: Props) => {
    setIsSubmitted(true);
    try {
      const response = await axios.post('/api/register', {
        username: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      if (response.status === 201) {
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error(error.message);
    }
    setIsSubmitted(false);
  };

  return (
    <div className="flex ml-20 mt-20 mr-20">
      <div className="">
        <Image
          src="/assests/images/survapp.gif"
          alt="GIF"
          width={450}
          height={250}
        />
      </div>
      <div className="rml-20 w-5/6 elative flex flex-col items-center  min-h-screen overflow-hidden">
        <div className="w-5/6 p-6 bg-white rounded-md shadow-md lg:max-w-lg">
          <h1 className="text-3xl font-bold text-center text-gray-700">
            Register
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
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                {...register('name')}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                {...register('password')}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-gray-800"
              >
                Confirm Password
              </label>
              <input
                type="confirmPassword"
                id="confirmPassword"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                {...register('confirmPassword')}
              />
            </div>
            {errors.confirmPassword ? (
              <span className="error">{'Password does not match'}</span>
            ) : (
              <></>
            )}
            <br />

            <div className="mt-2">
              <button
                className="disabled_button"
                type="submit"
                disabled={!isDirty || !isValid || isSubmitted}
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-4 text-sm text-center text-gray-700">
            Already have an account?{' '}
            <Link
              href="/"
              className="font-medium text-blue-600 hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
