import Navbar from '../components/navbar/Navbar';
import Link from 'next/link';


const Dashboard = () => {
  return (
    <div>
      <div>
        <Navbar/>
      </div>
      <div>
        <Link href="/dashboard/createNewSurvey">
          <input type='button' value='Create new Survey'/>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
