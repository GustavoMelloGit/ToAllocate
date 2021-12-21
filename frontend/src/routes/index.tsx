import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import ProjectFormPage from '../pages/Project';

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
        path='/project'
        element={
          <ProtectedRoute>
            <ProjectFormPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
