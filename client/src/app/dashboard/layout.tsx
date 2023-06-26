import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import Navbar from '../components/navbar/Navbar';
import Dashboard from './page';

export const metadata = {
  title: 'SurvApp-dashboard',
  description: 'SurvApp-dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <section>
        <Dashboard />
        {children}
      </section>
    </>
  );
}
