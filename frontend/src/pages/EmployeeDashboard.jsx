import React, { useState, useEffect } from 'react';
import { campaignService } from '../services/api';
import { 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

const EmployeeDashboard = () => {
  // Mocking training data as backend might need specific logic for user-specific logs
  const [trainings, setTrainings] = useState([
    { id: '1', title: 'HR Policy Phishing Simulation', status: 'completed', date: '2024-03-15', score: 100 },
    { id: '2', title: 'IT Password Reset Simulation', status: 'failed', date: '2024-04-10', score: 0 },
    { id: '3', title: 'Security Basics 101', status: 'pending', date: 'Pending', score: null }
  ]);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Your Security Health</h2>
            <p className="text-blue-100 max-w-md">
              Great job! You've identified 80% of phishing attempts this month. 
              Keep stay vigilant and always report suspicious emails.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl flex items-center gap-4">
            <div className="h-16 w-16 rounded-full border-4 border-blue-400 flex items-center justify-center text-xl font-bold">
              80%
            </div>
            <div>
              <p className="text-sm font-medium text-blue-100">Overall Score</p>
              <p className="text-xl font-bold">Healthy</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Training Modules */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Assigned Training Modules</h3>
          <div className="grid grid-cols-1 gap-4">
            {trainings.map((t) => (
              <div key={t.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex justify-between items-center group">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${
                    t.status === 'completed' ? 'bg-green-100 text-green-600' : 
                    t.status === 'failed' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {t.status === 'completed' ? <CheckCircle2 size={24} /> : 
                     t.status === 'failed' ? <AlertCircle size={24} /> : <Clock size={24} />}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{t.title}</h4>
                    <p className="text-xs text-slate-500">Assigned: {t.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {t.score !== null && (
                    <div className="text-right">
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Score</p>
                      <p className={`font-bold ${t.score === 100 ? 'text-green-600' : 'text-red-600'}`}>
                        {t.score}%
                      </p>
                    </div>
                  )}
                  <button className="px-4 py-2 bg-slate-50 text-slate-600 rounded-lg text-sm font-bold group-hover:bg-blue-600 group-hover:text-white transition-all flex items-center gap-2">
                    {t.status === 'completed' ? 'Review' : 'Start'}
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Tips */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Security Tips</h3>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
            <div className="space-y-4">
              <div className="flex gap-4">
                <ShieldCheck className="text-emerald-500 shrink-0" size={20} />
                <p className="text-sm text-slate-600">
                  <span className="font-bold text-slate-800">Check the Sender:</span> Hover over the sender name to see the actual email address.
                </p>
              </div>
              <div className="flex gap-4">
                <ShieldCheck className="text-emerald-500 shrink-0" size={20} />
                <p className="text-sm text-slate-600">
                  <span className="font-bold text-slate-800">Think before you click:</span> Phishing emails often use urgent language to pressure you.
                </p>
              </div>
              <div className="flex gap-4">
                <ShieldCheck className="text-emerald-500 shrink-0" size={20} />
                <p className="text-sm text-slate-600">
                  <span className="font-bold text-slate-800">Inspect Links:</span> Hover over links to verify the destination URL before clicking.
                </p>
              </div>
            </div>
            <button className="w-full py-3 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-100 transition-colors">
              View More Resources
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
