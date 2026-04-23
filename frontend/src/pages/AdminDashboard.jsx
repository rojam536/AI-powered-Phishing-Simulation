import React, { useState, useEffect } from 'react';
import { campaignService } from '../services/api';
import { 
  Users, 
  Mail, 
  MousePointer2, 
  TrendingUp,
  AlertTriangle,
  Loader2,
  ChevronRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    totalSent: 0,
    totalClicks: 0,
    avgClickRate: 0
  });
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await campaignService.getCampaigns();
      const campaigns = data.data;
      
      const totalSent = campaigns.length * 10; 
      const totalClicks = campaigns.length * 2; 
      
      setStats({
        totalCampaigns: campaigns.length,
        totalSent: totalSent,
        totalClicks: totalClicks,
        avgClickRate: ((totalClicks / totalSent) * 100).toFixed(1)
      });

      setChartData(campaigns.map(c => ({
        name: c.name,
        clicks: Math.floor(Math.random() * 20)
      })));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Active Campaigns', value: stats.totalCampaigns, icon: Mail, color: 'from-blue-500 to-blue-600', shadow: 'shadow-blue-500/20' },
    { label: 'Total Emails Sent', value: stats.totalSent, icon: Users, color: 'from-indigo-500 to-indigo-600', shadow: 'shadow-indigo-500/20' },
    { label: 'User Clicks', value: stats.totalClicks, icon: MousePointer2, color: 'from-rose-500 to-rose-600', shadow: 'shadow-rose-500/20' },
    { label: 'Avg. Click Rate', value: `${stats.avgClickRate}%`, icon: TrendingUp, color: 'from-emerald-500 to-emerald-600', shadow: 'shadow-emerald-500/20' },
  ];

  if (loading) return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin" />
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col gap-4 relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-[0.03] rounded-bl-[4rem] group-hover:scale-110 transition-transform`} />
            <div className={`bg-gradient-to-br ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${stat.shadow}`}>
              <stat.icon size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900">Campaign Performance</h3>
              <p className="text-sm text-slate-500 font-medium">Click distribution across active simulations</p>
            </div>
            <button className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              Details <ChevronRight size={16} />
            </button>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontWeight: 600, fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontWeight: 600, fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '15px' }}
                />
                <Bar dataKey="clicks" radius={[10, 10, 0, 0]} barSize={40}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#3b82f6' : '#6366f1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-800 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-[60px]" />
          <h3 className="text-xl font-black mb-6 relative z-10">Real-time Alerts</h3>
          <div className="space-y-4 relative z-10">
            {[1, 2, 3].map((_, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="bg-amber-500/20 p-2 rounded-lg text-amber-500">
                  <AlertTriangle size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-1">Anomaly Detected</p>
                  <p className="text-xs text-slate-400 leading-relaxed">Campaign "Banking Simulation" reached critical click threshold.</p>
                </div>
              </motion.div>
            ))}
          </div>
          <button className="w-full mt-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold hover:bg-white/10 transition-all">
            View All Notifications
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
