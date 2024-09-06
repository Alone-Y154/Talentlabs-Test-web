/* eslint-disable no-unused-vars */
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ token, redirectTo }) => {
  const isAuthenticated = token !== null;

  if (isAuthenticated && redirectTo) {
    return <Navigate to={redirectTo} />;
  }

  if (!isAuthenticated && redirectTo === '/courses') {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
