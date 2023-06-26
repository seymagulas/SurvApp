'use client';
import { useState } from 'react';

import { AiFillEdit } from 'react-icons/ai';

const UserProfilePage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex justify-center align-middle w-full">
      <div className="relative w-/12 p-2.5">
        <div className="flex ">
          <span className=" text-2xl mb-5 text-gray-800">
            Update Your Profile
          </span>
        </div>
        <form className="flex flex-col">
          <label className="text-lg mt-5">Profile Picture</label>
          <div className="flex items-center mt-2 mb-2">
            {/* <img
              src={}
              className=" w-16 h-16 rounded-2xl object-cover"
              alt=""
            /> */}
            <label className="text-lg mt-5" htmlFor="fileInput">
              <AiFillEdit className="cursor-pointer  ml-3" />
            </label>
            <input
              className="mt-2 mb-2 h-5 border-none border-b-gray-500"
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
            />
          </div>
          <label className="text-lg mt-5">Username</label>
          <input
            className="mt-2 mb-2 h-7 border-none border-b-gray-500"
            type="text"
            placeholder="Enter new Username"
          />
          <label className="text-lg mt-5">Email</label>
          <input
            className="mt-2 mb-2 h-7 border-none border-b-gray-500"
            type="email"
            placeholder="Enter new Email"
          />
          <label className="text-lg mt-5">Password</label>
          <input
            className="mt-2 mb-2 h-7 border-none border-b-gray-500"
            type="password"
            placeholder="Enter new password"
          />
          <button
            className=" mt-5 w-full rounded-full border border-teal-300 bg-teal-300 py-1.5 px-5 text-white transition-all hover:bg-white hover:text-teal-300 text-center text-sm font-inter flex items-center justify-center "
            type="submit"
          >
            Update
          </button>
          <button className="mt-5 w-full rounded-full border border-red-300 bg-red-300 py-1.5 px-5 text-white transition-all hover:bg-white hover:text-red-300 text-center text-sm font-inter flex items-center justify-center">
            Delete Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfilePage;
