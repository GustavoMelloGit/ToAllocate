import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';

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
    </Routes>
  );
}
