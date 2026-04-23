const mongoose = require('mongoose');

const emailLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  campaignId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Campaign',
    required: true
  },
  emailSent: {
    type: Boolean,
    default: false
  },
  opened: {
    type: Boolean,
    default: false
  },
  clicked: {
    type: Boolean,
    default: false
  },
  sentAt: {
    type: Date
  },
  clickedAt: {
    type: Date
  },
  simulationId: {
    type: String,
    description: "Internal tracking identifier for simulation"
  }
});

module.exports = mongoose.model('EmailLog', emailLogSchema);
