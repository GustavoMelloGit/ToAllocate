import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

interface IProtectedRoute {
  children: JSX.Element;
}
export default function ProtectedRoute({ children }: IProtectedRoute) {
  const auth = useAuth();

  const location = useLocation();

  if (!auth.user) {
    return <Navigate to='/' state={{ from: location }} />;
  }

  return children;
}
