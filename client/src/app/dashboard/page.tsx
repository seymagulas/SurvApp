'use client';
import ListOfSurveys from '../components/questions/ListOfSurveys';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
const Dashboard = () => {
  const router = useRouter();
  const userId: number = 45456;
  return (
    <div className="flex flex-col items-center content-center w-full">
      <button
        type="button"
        className=" space-x-1 border w-1/6 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded px-4 py-2 focus:outline-none"
        onClick={() => {
          router.push('/dashboard/createNewSurvey');
        }}
      >
        <span>Create Survey</span>
      </button>
      <div className="flex items-center  mt-10 ">
        <div>
          <ListOfSurveys userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

