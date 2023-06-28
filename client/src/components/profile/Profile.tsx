'use client';

import React from 'react';
import { getCurrentUser } from '../../services/auth.service';

const ProfilePage = () => {
  const user = getCurrentUser();

  return (
    <div className="flex justify-center align-middle mt-20 w-full">
      <div className="relative w-/12 p-2.5">
        <div className="flex ">
          <span className=" text-2xl mb-5 text-gray-800">
            {user?.name} Profile
          </span>
        </div>

        <div className="flex flex-col">
          <p className="text-lg mt-5">Name</p>
          <p className="mt-2 mb-2 h-7">{user?.name}</p>
          <p className="text-lg mt-5">Email</p>
          <p className="mt-2 mb-2 h-7">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
