import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import StoresList from './pages/stores/StoresList';
import UsersList from './pages/users/UsersList';
import ProfileSettings from './pages/profile/ProfileSettings';
import NotFound from './pages/NotFound';

// Route Guards
const PrivateRoute = ({ children, allowedRoles = [] }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="register" element={<PublicRoute><Register /></PublicRoute>} />
      </Route>
      
      {/* Private Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route path="dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />
        <Route path="stores" element={
          <PrivateRoute><StoresList /></PrivateRoute>
        } />
        <Route path="users" element={
          <PrivateRoute allowedRoles={['admin']}><UsersList /></PrivateRoute>
        } />
        <Route path="profile" element={
          <PrivateRoute><ProfileSettings /></PrivateRoute>
        } />
      </Route>
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;