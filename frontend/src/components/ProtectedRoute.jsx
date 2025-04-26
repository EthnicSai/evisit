import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  
  // If there is no token, redirect to login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;  // Render children components if the user is authenticated
};

export default ProtectedRoute;
