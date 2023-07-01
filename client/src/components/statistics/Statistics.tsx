import React, { useEffect, useRef } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { ISurveyProvider } from '../../providers/SurveyProvider';
import { downloadAsPDF, prepareChart } from './utils';
import { FaDownload, FaChartSimple } from 'react-icons/fa6';
import './statistics.css';

const Statistics: React.FC = () => {
  const { surveyName, handleGetSurvey, questions } =
    useOutletContext<ISurveyProvider>();
  const params = useParams();
  const surveyId = params.id;

  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handleGetSurvey({ surveyId });
  }, [surveyId]);

  return (
    <div className="statContainer">
      <div className="statHeader">
        <p className="surveyName">
          <FaChartSimple /> {surveyName} Stats
        </p>
        <button
          className="mt-2 px-4 py-2 bg-black text-white rounded-md"
          onClick={downloadAsPDF}
        >
          PDF
          <FaDownload />
        </button>
      </div>
      <div className="stats" ref={statsRef}>
        {questions &&
          questions.map((question) => {
            return prepareChart(question);
          })}
      </div>
    </div>
  );
};

export default Statistics;
