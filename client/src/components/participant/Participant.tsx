import React from 'react';
import { Link, useOutletContext, useSearchParams } from 'react-router-dom';
import './participant.css';

const Participant: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const hash = searchParams.get('hash');

  return (
    <div className="participant-component">
      <div className="image-div">
        <img
          src="assests/images/6179a89d5e443dd17b13944e_engagment-participation.jpeg"
          alt="laptop image for landing page"
        />
      </div>
      <div className="text-div">
        <p className="Header">Welcome to SurvApp</p>
        <p className="slogan">Share your voice, make a difference!</p>
        {/* <p>Make a Difference!</p> */}
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
