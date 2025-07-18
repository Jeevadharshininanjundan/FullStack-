import { Navigate } from "react-router-dom";
import { useUser } from '../context/AuthContext.jsx';

const AdminRoute = ({ children }) => {
  const {user,loading} = useUser();
  if(loading) return null;

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }
  return children;
};

export default AdminRoute;
