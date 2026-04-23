import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { campaignService, userService } from '../services/api';
import { 
  Send, 
  Target, 
  Info,
  Loader2,
  CheckCircle2,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { motion } from 'framer-motion';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    theme: 'it',
    difficulty: 'easy',
    targetUsers: []
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await userService.getUsers();
      setUsers(data.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setError('Failed to load users. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await campaignService.createCampaign(formData);
      navigate('/admin/campaigns');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to launch campaign. Check backend logs.');
    } finally {
      setLoading(false);
    }
  };

  const toggleUser = (userId) => {
    // Ensure we are working with the correct ID string
    const idStr = typeof userId === 'object' ? userId._id : userId;
    
    setFormData(prev => ({
      ...prev,
      targetUsers: prev.targetUsers.includes(idStr)
        ? prev.targetUsers.filter(id => id !== idStr)
        : [...prev.targetUsers, idStr]
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-8"
    >
      {error && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-[2.5rem] font-bold flex items-center gap-3 shadow-sm shadow-red-100"
        >
          <ShieldAlert size={24} />
          {error}
        </motion.div>
      )}
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-bl-[5rem]" />
        
        <div className="flex items-center gap-4 mb-10 relative z-10">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-blue-500/20">
            <Target size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Configure New Simulation</h2>
            <p className="text-slate-500 font-medium">Define your phishing campaign parameters</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Campaign Name</label>
              <input
                required
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                placeholder="e.g., Q2 Security Awareness"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Theme</label>
              <div className="relative">
                <select
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none font-medium cursor-pointer"
                  value={formData.theme}
                  onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                >
                  <option value="it">IT Support Reset</option>
                  <option value="hr">Internal Policy Update</option>
                  <option value="banking">Financial Transaction Alert</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <ChevronRight size={18} className="rotate-90" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Complexity Level</label>
            <div className="flex gap-4">
              {['easy', 'medium', 'hard'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFormData({ ...formData, difficulty: level })}
                  className={`flex-1 py-4 px-6 rounded-2xl border-2 text-sm font-black capitalize transition-all duration-200 ${
                    formData.difficulty === level 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/20 scale-[1.02]' 
                      : 'bg-white border-slate-100 text-slate-500 hover:border-blue-200'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6 pt-10 border-t border-slate-50">
            <div className="flex justify-between items-end">
              <div>
                <h4 className="text-lg font-black text-slate-900">Target Recipients</h4>
                <p className="text-sm text-slate-500 font-medium">Select the employees for this simulation</p>
              </div>
              <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black uppercase">
                {formData.targetUsers.length} Selected
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto p-2 scrollbar-hide">
              {users.map((user) => (
                <motion.div
                  key={user._id}
                  whileHover={{ y: -2 }}
                  onClick={() => toggleUser(user._id)}
                  className={`flex items-center justify-between p-5 rounded-3xl border-2 cursor-pointer transition-all ${
                    formData.targetUsers.includes(user._id)
                      ? 'bg-blue-50 border-blue-600/20 ring-1 ring-blue-600/10'
                      : 'bg-white border-slate-50 hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-black text-slate-500">
                      {user.name.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  {formData.targetUsers.includes(user._id) && (
                    <div className="bg-blue-600 rounded-full p-1 text-white">
                      <CheckCircle2 size={16} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-6 pt-10 border-t border-slate-50">
            <button
              type="button"
              onClick={() => navigate('/admin/campaigns')}
              className="px-8 py-4 text-sm font-black text-slate-400 hover:text-slate-600 transition-colors"
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={loading || formData.targetUsers.length === 0}
              className="flex items-center gap-3 px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/40 transition-all disabled:opacity-50 disabled:scale-100"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  <Send size={20} />
                  Launch Campaign
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 flex gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="bg-blue-500/10 p-4 rounded-2xl text-blue-500 h-fit">
          <ShieldAlert size={32} />
        </div>
        <div>
          <h4 className="text-white font-black text-lg mb-2">AI-Powered Content Generation</h4>
          <p className="text-slate-400 text-sm leading-relaxed max-w-2xl font-medium">
            Our AI engine will craft a unique, contextually relevant phishing email based on your selected theme. 
            All tracking parameters are embedded automatically to monitor user interaction safely.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CreateCampaign;
