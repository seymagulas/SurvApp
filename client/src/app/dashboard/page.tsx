import ListOfSurveys from '../components/questions/ListOfSurveys';
import Link from 'next/link';
import React from 'react';
import ButtonWithDropdown from '../components/ButtonWithDropdown/button';

const Dashboard = () => {
  const userId: number = 45456;
  return (
    <>
      <div className=" mt-44 flex justify-center items-center">
        <ButtonWithDropdown />
      </div>
      <div className="w-full mt-10 flex justify-center items-center">
        <div>
          <ListOfSurveys userId={userId} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
