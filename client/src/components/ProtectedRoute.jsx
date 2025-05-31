import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

export default function ProtectedRoute({ children, requireAdmin = false }) {
    const { isAuthenticated, isAdmin, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex justify-center items-center w-screen h-screen">
                <div className="text-2xl">Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated()) {
        return <Navigate to="/pos/login" replace />;
    }

    if (requireAdmin && !isAdmin()) {
        return (
            <div className="flex justify-center items-center w-screen h-screen">
                <div className="text-2xl text-red-500">Access Denied: Admin Only</div>
            </div>
        );
    }

    return children;
}