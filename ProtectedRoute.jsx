import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, token } = useAuthStore();

  if (!token && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
