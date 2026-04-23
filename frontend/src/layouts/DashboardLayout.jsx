import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800">Welcome, {user.name}</h1>
            <p className="text-slate-500 capitalize">{user.role} Dashboard</p>
          </header>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
