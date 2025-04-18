
import './App.css'
import HomePage from './components/HomePage'
import Login from './components/Login'
import Signup from './components/Signup'
import {createBrowserRouter , RouterProvider , Navigate } from "react-router-dom"


import useLoadUser from './hooks/useLoadUser'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'


// const rootLoader = (store) => async () => {
//   // Check if user is authenticated
//   const state = store.getState();
//   if (!state.user.authUser) {
//     return { redirect: '/login' };
//   }
//   return null;
// };

// const router = createBrowserRouter([
//   {
//     path:"/",
//     element:<HomePage/>
//   },
//   {
//     path:"/signup",
//     element:<Signup/>
//   },
//   {
//     path:"/login",
//     element:<Login/>
//   },

// ])


function App() {
  // Check if user is authenticated and get loading state
  const isLoading = useLoadUser();
  const authUser = useSelector(state => state.user.authUser);
  const [router, setRouter] = useState(null);

  // Create router after we know authentication state
  useEffect(() => {
    if (!isLoading) {
      const newRouter = createBrowserRouter([
        {
          path: "/",
          element: authUser ? <HomePage /> : <Navigate to="/login" />
        },
        {
          path: "/signup",
          element: <Signup />
        },
        {
          path: "/login",
          element: authUser ? <Navigate to="/" /> : <Login />
        },
      ]);
      
      setRouter(newRouter);
    }
  }, [isLoading, authUser]);

  // Show loading state while checking authentication
  if (isLoading || !router) {
    return <div className='p-4 h-screen flex items-center justify-center'>Loading...</div>;
  }

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
