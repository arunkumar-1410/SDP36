import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import type { UserRole } from '@/types';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};
