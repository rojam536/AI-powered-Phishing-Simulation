import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Mail, ShieldCheck, ShieldAlert, X, Loader2, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { authService, userService } from '../services/api';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: 'password123', role: 'employee' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await userService.getUsers();
      setUsers(data.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      // Fallback to demo data if backend list isn't ready
      setUsers([
        { _id: '1', name: 'Alice Smith', email: 'alice@company.com', role: 'employee', status: 'warning' },
        { _id: '2', name: 'Bob Johnson', email: 'bob@company.com', role: 'employee', status: 'safe' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await authService.register(formData);
      setIsModalOpen(false);
      setFormData({ name: '', email: '', password: 'password123', role: 'employee' });
      fetchUsers(); // Refresh list
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add user');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all"
            placeholder="Search employees..."
          />
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
        >
          <UserPlus size={18} />
          Add Employee
        </motion.button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Employee</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Role</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-slate-50/30 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-black text-lg">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{user.name}</div>
                      <div className="text-sm text-slate-500 font-medium">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="text-sm font-black text-blue-600 hover:text-blue-700 transition-colors">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Employee Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-xl text-blue-600">
                      <UserPlus size={24} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900">Add New Employee</h3>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <X size={24} />
                  </button>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm font-bold flex items-center gap-2">
                    <ShieldAlert size={18} />
                    {error}
                  </div>
                )}

                <form onSubmit={handleAddUser} className="space-y-4">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                    <input
                      required
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="Jane Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                    <input
                      required
                      type="email"
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Assign Role</label>
                    <select
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                      <option value="employee">Employee</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                    >
                      {submitting ? <Loader2 className="animate-spin" size={20} /> : (
                        <>
                          <UserPlus size={18} />
                          Confirm & Add
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UsersList;
