import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { initialUrl } from '../../shared/constants/AppConstants';
import { UserRoles } from '../../shared/constants/AppEnums';

interface IProtectedRoute {
  children: JSX.Element;
  role?: UserRoles;
}
export default function ProtectedRoute({ children, role }: IProtectedRoute) {
  const { user } = useAuth();

  const location = useLocation();

  if (!user) {
    return <Navigate to='/' state={{ from: location }} />;
  }

  if (role) {
    if (user.role !== role) {
      return <Navigate to={initialUrl} state={{ from: location }} />;
    }
  }

  return children;
}
