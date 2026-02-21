// Protected route wrapper — redirects unauthenticated users to login
// and optionally restricts access to admin users only.

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ adminOnly = false }) => {
    const { isAuthenticated, loading, user } = useSelector((state) => state.user);

    // Wait until the session check completes before deciding
    if (loading) return null;

    // Not logged in — redirect to login page
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Admin-only route but user isn't an admin — redirect to home
    if (adminOnly && user?.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    // Auth check passed — render the child route
    return <Outlet />;
};

export default ProtectedRoute;
