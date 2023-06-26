import ListOfSurveys from '../components/questions/ListOfSurveys'
import Link from 'next/link';



const Dashboard = () => {
  return (
    <div>
      <div>
        <ListOfSurveys/>
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
