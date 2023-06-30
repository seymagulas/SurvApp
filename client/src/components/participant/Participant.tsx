import React from 'react';
import { Link, useOutletContext, useSearchParams } from 'react-router-dom';

const Participant: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const hash = searchParams.get('hash');

  return (
    <div className="max-w-md mx-auto">
      <div>
        <img
          alt="laptop image for landing page"
          src="../../public/assets/images/participant_landing_img.png"
        />
      </div>
      <div>
        <Link to="/participant/questions" state={{ hash }}>
          Start Survey
        </Link>
      </div>
    </div>
  );
};

export default Participant;
