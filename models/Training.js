const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
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
  completed: {
    type: Boolean,
    default: false
  },
  score: {
    type: Number,
    min: 0,
    max: 100
  },
  completedAt: {
    type: Date
  },
  assignedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Training', trainingSchema);
