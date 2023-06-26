import Navbar from '../components/navbar/Navbar';
import Link from 'next/link';
import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
 createsurvey
        <Index />
      </div>
      <div>

        <Link href="/dashboard/createNewSurvey">
          <input type="button" value="Create new Survey" />
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
