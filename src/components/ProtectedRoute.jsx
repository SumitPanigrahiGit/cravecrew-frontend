import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="page-loading" style={{ paddingTop: '90px' }}>
      <div className="loading-spinner" />
    </div>
  );

  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to={user.role === 'chef' ? '/chef-dashboard' : '/dashboard'} replace />;

  return children;
}
