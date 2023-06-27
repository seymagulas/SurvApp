import './globals.css';
import { Inter } from 'next/font/google';
import React from 'react';
const inter = Inter({ subsets: ['latin'] });
import Navbar from './components/navbar/Navbar';

import { ReduxProvider } from '../redux/provider';
import { ToastContainer } from './ToastProvider/ToastProvider';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'Survapp',
  description: 'A Survery App',
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
          <main>
            <Navbar />
            {children}
          </main>
          {children}
        </main>
      </body>
    </html>
  );
}
