'use client';

import { useNavigate } from 'react-router-dom';
import ListOfSurveys from '../survey/surveyList/ListOfSurveys';
import React from 'react';

const Main: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center content-center w-full">
      <button
        type="button"
        className="space-x-1 border w-1/6 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded px-4 py-2 focus:outline-none"
        aria-label="Create question"
        onClick={() => {
          navigate('/survey/new');
        }}
      >
        <span> + Create Survey</span>
      </button>
      <div className="mt-10">
        <div>
          <ListOfSurveys />
        </div>
      </div>
    </div>
  );
};

export default Main;
