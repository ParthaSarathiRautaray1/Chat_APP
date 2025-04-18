import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import useLoadUser from '../hooks/useLoadUser';

const ProtectedRoute = ({ children }) => {
  useLoadUser(); // Try to load user if not already loaded
  const authUser = useSelector(state => state.user.authUser);
  
  if (!authUser) {
    // Show loading or redirect to login
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default ProtectedRoute;