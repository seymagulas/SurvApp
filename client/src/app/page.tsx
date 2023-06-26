import styles from './page.module.css';
import { Dancing_Script } from 'next/font/google';
import Link from 'next/link';
const dans = Dancing_Script({
  subsets: ['latin'],

  weight: '400',
});
const Home = () => {
  return (
    <div>
      <h1 className={`${dans.className}  text-6xl flex justify-center mt-10`}>
        Welcome to SurvApp!
      </h1>
      <div className="flex justify-center  items-center  mt-48 ">
        <Link href="/login">
          <button
            type="button"
            className="text-slate-500 border border-slate-500 hover:bg-slate-500 hover:text-white active:bg-slate-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150 mr-7"
          >
            Sign in
          </button>
        </Link>
        <Link href="/signup">
          <button
            type="button"
            className="text-slate-500 border border-slate-500 hover:bg-slate-500 hover:text-white active:bg-slate-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          >
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
