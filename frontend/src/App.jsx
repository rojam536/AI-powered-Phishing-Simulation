import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';

// Pages (to be implemented next)
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import CreateCampaign from './pages/CreateCampaign';
import CampaignList from './pages/CampaignList';
import UsersList from './pages/UsersList';
import EmployeeDashboard from './pages/EmployeeDashboard';
import TrainingPage from './pages/TrainingPage';

const ProtectedRoute = ({ children, role }) => {
  const { user, isAdmin } = useAuth();
  
  if (!user) return <Navigate to="/login" />;
  if (role === 'admin' && !isAdmin) return <Navigate to="/employee/dashboard" />;
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard Routes */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/login" />} />
          
          {/* Admin Routes */}
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="admin/campaigns" element={<CampaignList />} />
          <Route path="admin/create-campaign" element={<CreateCampaign />} />
          <Route path="admin/users" element={<UsersList />} />

          {/* Employee Routes */}
          <Route path="employee/dashboard" element={<EmployeeDashboard />} />
          <Route path="training" element={<TrainingPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
