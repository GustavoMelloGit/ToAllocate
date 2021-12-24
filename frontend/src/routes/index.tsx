import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import ProjectFormPage from '../pages/Project/Create';
import ProjectsList from '../pages/Project/List';
import { UserRoles } from '../shared/constants/AppEnums';

export default function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route
        path='/home'
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path='/projects/create-project'
        element={
          <ProtectedRoute role={UserRoles.ADMIN}>
            <ProjectFormPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='/projects'
        element={
          <ProtectedRoute>
            <ProjectsList />
          </ProtectedRoute>
        }
      />
      <Route
        path='/project/:uuid'
        element={
          <ProtectedRoute>
            <ProjectFormPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
