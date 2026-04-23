const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a campaign name'],
    trim: true
  },
  theme: {
    type: String,
    required: [true, 'Please add a theme (e.g., banking, HR, IT)'],
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy'
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  targetUsers: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['draft', 'active', 'completed'],
    default: 'draft'
  },
  emailTemplate: {
    subject: String,
    body: String,
    ctaText: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Campaign', campaignSchema);
