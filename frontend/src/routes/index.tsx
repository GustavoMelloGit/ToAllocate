import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/Login';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
    </Routes>
  );
}
