import './globals.css';
import { Inter } from 'next/font/google';
import React from 'react';
const inter = Inter({ subsets: ['latin'] });
import Navbar from './components/navbar/Navbar';
export const metadata = {
  title: 'SurvApp',
  description: 'A Survey App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <main>
            <div>
          <Navbar />
            {children}
            </div>
          </main>
      </body>
    </html>
  );
}
