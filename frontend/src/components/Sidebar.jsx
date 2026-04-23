import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Mail, 
  Users, 
  GraduationCap, 
  LogOut, 
  PlusCircle,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const { logout, isAdmin } = useAuth();

  const adminLinks = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { to: '/admin/campaigns', icon: Mail, label: 'Campaigns' },
    { to: '/admin/create-campaign', icon: PlusCircle, label: 'New Campaign' },
    { to: '/admin/users', icon: Users, label: 'Manage Users' },
  ];

  const employeeLinks = [
    { to: '/employee/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/training', icon: GraduationCap, label: 'Security Training' },
  ];

  const links = isAdmin ? adminLinks : employeeLinks;

  return (
    <div style={{
      height: '100vh',
      width: '280px',
      backgroundColor: '#020617',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      borderRight: '1px solid rgba(255, 255, 255, 0.05)',
      zIndex: 1000
    }}>
      <div style={{ padding: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          backgroundColor: '#2563eb', 
          padding: '8px', 
          borderRadius: '12px', 
          boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <ShieldAlert size={24} color="white" />
        </div>
        <span style={{ 
          fontSize: '20px', 
          fontWeight: 900, 
          letterSpacing: '-0.025em',
          background: 'linear-gradient(to right, #fff, #94a3b8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>PhishSim AI</span>
      </div>
      
      <nav style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px',
              borderRadius: '16px',
              textDecoration: 'none',
              transition: 'all 0.2s',
              backgroundColor: isActive ? '#2563eb' : 'transparent',
              color: isActive ? 'white' : '#94a3b8',
              boxShadow: isActive ? '0 10px 15px -3px rgba(37, 99, 235, 0.2)' : 'none',
              fontWeight: 700,
              fontSize: '14px'
            })}
          >
            <link.icon size={20} />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: '24px' }}>
        <div style={{
          background: 'linear-gradient(to bottom right, #1e293b, #0f172a)',
          padding: '24px',
          borderRadius: '32px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <p style={{ fontSize: '10px', fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Account</p>
          <button
            onClick={logout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '14px',
              padding: 0
            }}
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
