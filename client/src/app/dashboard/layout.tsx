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
    <html lang="en">
      <header>
        <Navbar />
      </header>
      <body>
        <main>
          <Dashboard/>
            {children}
        </main>
      </body>
    </html>
  );
}
