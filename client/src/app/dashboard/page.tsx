import ListOfSurveys from '../components/questions/ListOfSurveys'
import Link from 'next/link';



const Dashboard = () => {
  const userId: number = 45456;

  return (
    <div>
      <div>
        <ListOfSurveys userId={userId} />
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
