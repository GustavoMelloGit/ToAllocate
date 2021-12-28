import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import LoginPage from '../pages/Login';
import {
  CreateProject,
  EditProject,
  ProjectDetailPage,
  ProjectsList,
} from '../pages/Project';
import { UserRoles } from '../shared/constants/AppEnums';

export default function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />

      <Route
        path='/projects/create-project'
        element={
          <ProtectedRoute role={UserRoles.ADMIN}>
            <CreateProject />
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
            <EditProject />
          </ProtectedRoute>
        }
      />
      <Route
        path='/project/:uuid'
        element={
          <ProtectedRoute>
            <ProjectDetailPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
