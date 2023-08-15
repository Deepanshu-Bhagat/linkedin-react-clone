import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getUserAuth } from './store/login-actions';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginPage from './pages/Login';
import HeaderLayout from './pages/HeaderLayout';
import Home from './components/Home';

const router = createBrowserRouter([
  { path: '/', element: <LoginPage /> },
  {
    path: '/home',
    element: <HeaderLayout />,
    children: [{ path: '', element: <Home /> }],
  },
]);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAuth());
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </>
  );
};

export default App;
