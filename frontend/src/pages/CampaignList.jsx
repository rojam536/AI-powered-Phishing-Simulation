import React, { useState, useEffect } from 'react';
import { campaignService } from '../services/api';
import { Mail, Calendar, Target, BarChart3, Loader2, Plus, Trash2, ShieldAlert, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const { data } = await campaignService.getCampaigns();
      setCampaigns(data.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (campaignId) => {
    if (!window.confirm('Are you sure you want to delete this campaign?')) {
      return;
    }

    try {
      await campaignService.deleteCampaign(campaignId);
      setCampaigns(campaigns.filter(c => c._id !== campaignId));
    } catch (err) {
      console.error(err);
      setError('Failed to delete campaign');
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div style={{ height: '48px', width: '48px', borderRadius: '50%', border: '4px solid #e2e8f0', borderTopColor: '#2563eb', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ padding: '2rem' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.5rem' }}>Active Simulations</h2>
          <p style={{ color: '#64748b', fontWeight: '500' }}>Manage and monitor your phishing campaigns</p>
        </div>
        <Link
          to="/admin/create-campaign"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#2563eb',
            color: 'white',
            borderRadius: '1rem',
            fontWeight: 'bold',
            textDecoration: 'none',
            boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.2)',
            transition: 'all 0.2s'
          }}
        >
          <Plus size={18} /> New Campaign
        </Link>
      </div>

      {error && (
        <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '1.5rem', borderRadius: '2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <ShieldAlert size={24} /> {error}
        </div>
      )}

      {campaigns.length === 0 ? (
        <div style={{ backgroundColor: 'white', padding: '5rem', borderRadius: '3rem', border: '1px solid #f1f5f9', textAlign: 'center' }}>
          <div style={{ backgroundColor: '#f8fafc', width: '80px', height: '80px', borderRadius: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#cbd5e1' }}>
            <Mail size={40} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.5rem' }}>No Campaigns Yet</h3>
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Start your first security simulation to see results here.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {campaigns.map((campaign) => (
            <motion.div
              key={campaign._id}
              whileHover={{ y: -4 }}
              style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '1.5rem',
                border: '1px solid #f1f5f9',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ backgroundColor: '#eff6ff', padding: '1rem', borderRadius: '1rem', color: '#2563eb' }}>
                  <Target size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '0.25rem' }}>{campaign.name}</h3>
                  <div style={{ display: 'flex', gap: '1rem', color: '#64748b', fontSize: '0.875rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={14} /> {campaign.theme} Theme
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <BarChart3 size={14} /> {campaign.difficulty} Difficulty
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Calendar size={14} /> {new Date(campaign.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Targeted</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#0f172a' }}>{campaign.targetUsers?.length || 0}</p>
                </div>
                <div style={{ height: '12px', width: '1px', backgroundColor: '#f1f5f9', margin: '0 1rem' }} />
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Clicks</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#dc2626' }}>{campaign.clicks || 0}</p>
                </div>
                <button
                  onClick={() => handleDelete(campaign._id)}
                  style={{
                    height: '2.5rem',
                    width: '2.5rem',
                    borderRadius: '1.25rem',
                    backgroundColor: '#fef2f2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#dc2626',
                    transition: 'all 0.2s',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  title="Delete campaign"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default CampaignList;