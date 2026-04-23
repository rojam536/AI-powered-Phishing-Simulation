import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';
import { ShieldAlert, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      console.log('Submitting login with:', formData);
      const response = await authService.login(formData);
      console.log('Full response:', response);
      console.log('Response data:', response.data);
      
      if (response.data && response.data.success) {
        login(response.data.user, response.data.token);
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      console.error('Error message:', err.message);
      console.error('Error response:', err.response);
      console.error('Error data:', err.response?.data);
      setError(err.response?.data?.error || err.message || 'Invalid credentials. Please try again.');
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
      {/* Animated Background Shapes */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-10%',
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
        right: '-10%',
        width: '40%',
        height: '40%',
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        borderRadius: '50%',
        filter: 'blur(120px)',
        zIndex: 0
      }} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          maxWidth: '450px',
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          padding: '50px',
          borderRadius: '40px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: '30px'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <motion.div 
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            style={{
              margin: '0 auto 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '64px',
              width: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
              color: 'white',
              boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)'
            }}
          >
            <ShieldAlert size={36} />
          </motion.div>
          <h2 style={{ 
            fontSize: '32px', 
            fontWeight: 900, 
            color: 'white', 
            letterSpacing: '-0.025em',
            margin: 0
          }}>Welcome Back</h2>
          <p style={{ 
            marginTop: '12px', 
            color: '#94a3b8', 
            fontWeight: 500,
            margin: 0
          }}>Elevate your security awareness</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#f87171',
              padding: '12px 16px',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px'
            }}
          >
            <AlertCircle size={18} />
            {error}
          </motion.div>
        )}

        <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: 700, 
                color: '#cbd5e1', 
                marginBottom: '8px',
                marginLeft: '4px'
              }}>Email Address</label>
              <input
                type="email"
                required
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  color: 'white',
                  outline: 'none',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: 700, 
                color: '#cbd5e1', 
                marginBottom: '8px',
                marginLeft: '4px'
              }}>Password</label>
              <input
                type="password"
                required
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  color: 'white',
                  outline: 'none',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '16px',
              background: 'linear-gradient(to right, #2563eb, #4f46e5)',
              borderRadius: '16px',
              border: 'none',
              color: 'white',
              fontSize: '16px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)',
              transition: 'all 0.2s'
            }}
          >
            {loading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Sign In <ArrowRight size={20} />
              </span>
            )}
          </motion.button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ 
              fontWeight: 700, 
              color: '#60a5fa', 
              textDecoration: 'none' 
            }}>
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
