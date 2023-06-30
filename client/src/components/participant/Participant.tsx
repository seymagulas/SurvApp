import React from 'react';
import { Link, useOutletContext, useSearchParams } from 'react-router-dom';
import './participant.css';

const Participant: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const hash = searchParams.get('hash');

  return (
    <div className="participant-component max-w-md mx-auto">
      <div className="image-div">
        <img
          src="/assests/images/SurveyApp2.png"
          alt="laptop image for landing page"
        />
      </div>
      <div className="text-div">
        <p>Welcome to SurvApp</p>
        <p>Share Your Voice</p>
        <p>Make a Difference!</p>
        <Link
          className="start-button"
          to="/participant/questions"
          state={{ hash }}
        >
          Start Survey
        </Link>
      </div>
    </div>
  );
};

export default Participant;
