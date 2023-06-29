import React from 'react';
import { ToastContainer } from 'react-toastify';
import AppRouter from './router';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <>
      <AppRouter />
      <ToastContainer position="top-right" theme="colored" />
    </>
  );
};

export default App;
