import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';
import { ShieldAlert, AlertCircle, Loader2, UserPlus, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    role: 'employee' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await authService.register(formData);
      login(data.user, data.token);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100vw',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#0f172a',
      padding: '20px',
      margin: 0,
      position: 'fixed',
      top: 0,
      left: 0,
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-10%',
        width: '40%',
        height: '40%',
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        borderRadius: '50%',
        filter: 'blur(120px)',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '-10%',
        width: '40%',
        height: '40%',
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        borderRadius: '50%',
        filter: 'blur(120px)',
        zIndex: 0
      }} />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          maxWidth: '450px',
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          padding: '40px',
          borderRadius: '40px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <motion.div 
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            style={{
              margin: '0 auto 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '56px',
              width: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
              color: 'white',
              boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)'
            }}
          >
            <UserPlus size={32} />
          </motion.div>
          <h2 style={{ fontSize: '28px', fontWeight: 900, color: 'white', margin: 0 }}>Join PhishSim</h2>
          <p style={{ marginTop: '8px', color: '#94a3b8', fontWeight: 500, margin: 0 }}>Start your security training</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#f87171',
              padding: '10px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px'
            }}
          >
            <AlertCircle size={16} />
            {error}
          </motion.div>
        )}

        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#cbd5e1', marginBottom: '5px' }}>Full Name</label>
              <input
                type="text"
                required
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: 'white',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#cbd5e1', marginBottom: '5px' }}>Email Address</label>
              <input
                type="email"
                required
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: 'white',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#cbd5e1', marginBottom: '5px' }}>Password</label>
              <input
                type="password"
                required
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: 'white',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#cbd5e1', marginBottom: '5px' }}>Role</label>
              <select
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  backgroundColor: '#1e293b',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: 'white',
                  outline: 'none'
                }}
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(to right, #2563eb, #4f46e5)',
              borderRadius: '12px',
              border: 'none',
              color: 'white',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                Create Account <ArrowRight size={18} />
              </span>
            )}
          </motion.button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '5px' }}>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ fontWeight: 700, color: '#60a5fa', textDecoration: 'none' }}>
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
