//LOG IN// Registration
import { Dancing_Script } from 'next/font/google';


const dana = Dancing_Script({
  subsets: ['latin'],
  weight: '400',
});
const Home = () => {
  return 
  <div>
  <h1 className={`${dana.className}`}>Hello world!</h1>
  
  </div>
  
};

export default Home;
