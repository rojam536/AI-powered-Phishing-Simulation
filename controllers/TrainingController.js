const Training = require('../models/Training');

// @desc    Complete training
// @route   POST /api/training/complete
// @access  Private
exports.completeTraining = async (req, res, next) => {
  try {
    const { campaignId, score } = req.body;
    const userId = req.user.id;

    const training = await Training.findOneAndUpdate(
      { userId, campaignId },
      { 
        completed: true, 
        score: score || 100,
        completedAt: new Date() 
      },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      message: 'Training completed successfully',
      data: training
    });
  } catch (error) {
    next(error);
  }
};
