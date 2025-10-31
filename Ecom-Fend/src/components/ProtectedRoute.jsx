import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, adminOnly = false }) => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (adminOnly && (!user.role || user.role.toLowerCase() !== 'admin')) {
    return <Navigate to="/products" replace />;
  }

  return Component;
};

export default ProtectedRoute;