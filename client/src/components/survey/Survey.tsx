import React, { useEffect, useState } from 'react';
import QuestionList from '../questions/QuestionList';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import { ISurveyProvider } from '../../providers/SurveyProvider';
import SurveyForm from './surveyForm/SurveyForm';

const Survey: React.FC = () => {
  const params = useParams();
  const surveyId = params.id;
  const { handleGetSurvey, questions } = useOutletContext<ISurveyProvider>();
  const [surveyName, setSurveyName] = useState<string>('');

  useEffect(() => {
    handleGetSurvey({ surveyId });
  }, [surveyId]);

  return (
    <>
      <SurveyForm />
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Survey Name:</h2>
        <label className="block mb-4">
          <input
            type="text"
            placeholder="Name your survey..."
            className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md pl-2"
            value={surveyName}
            onChange={(e) => setSurveyName(e.target.value)}
          />
        </label>
        <QuestionList questions={questions} />
        <Link to="/survey/questions" state={{ surveyId }}>
          <button className="px-4 py-2 bg-indigo-500 text-white rounded-md">
            Add Question
          </button>
        </Link>
        <div>
          <button className="px-4 py-2 bg-indigo-500 text-white rounded-md">
            Save Survey
          </button>
        </div>
      </div>
    </>
  );
};

export default Survey;
