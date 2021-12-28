import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import LoginPage from '../pages/Login';
import { ProjectDetail, ProjectsList } from '../pages/Project';
import ProjectFormPage from '../pages/Project/Create';
import { UserRoles } from '../shared/constants/AppEnums';

export default function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route
        path='/project/:uuid'
        element={
          <ProtectedRoute>
            <ProjectDetail />
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
        path='/project/:uuid/edit'
        element={
          <ProtectedRoute>
            <ProjectFormPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
