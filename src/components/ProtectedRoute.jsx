import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from './store/authSlice';

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const timestamp = useSelector((state) => state.auth.timestamp);
  const expireTime = 3600 * 1000 * 24 * 7; // 5 seconds for testing

  useEffect(() => {
    const checkSession = () => {
      if (timestamp && Date.now() - timestamp > expireTime) {
        dispatch(clearUser());
      }
    };

    const intervalId = setInterval(checkSession, 3600 * 1000); // Check every hour

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [timestamp, dispatch]);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
