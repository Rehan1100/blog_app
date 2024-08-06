import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ element, requiredRole }) {
  const { auth } = useAuth();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && auth.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return element;
}

export default ProtectedRoute;
