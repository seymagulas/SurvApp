//LOG IN// Registration
import styles from './page.module.css';
import { Dancing_Script } from 'next/font/google';
const dans = Dancing_Script({
  subsets: ['latin'],
  weight: '400',
});
const Home = () => {
  return <h1 className={`${dans.className}`}>Hello world!</h1>;
};

export default Home;
