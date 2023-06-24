import Navbar from '../components/navbar/Navbar';
import Index from './index/page';
import Link from 'next/link';


const Dashboard = () => {
  return (
    <div>
      <div>
        <Navbar/>
      </div>
      <div>
        <Index/>
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
