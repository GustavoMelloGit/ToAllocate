import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../shared/context/user';

interface IProtectedRoute {
  children: JSX.Element;
}
export default function ProtectedRoute({ children }: IProtectedRoute) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to='/' state={{ from: location }} />;
  }

  return children;
}
