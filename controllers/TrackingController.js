const EmailLog = require('../models/EmailLog');
const Training = require('../models/Training');

// @desc    Track email click
// @route   GET /api/track/:userId/:campaignId
// @access  Public
exports.trackClick = async (req, res, next) => {
  try {
    const { userId, campaignId } = req.params;

    // 1. Update EmailLog
    const log = await EmailLog.findOneAndUpdate(
      { userId, campaignId },
      { 
        clicked: true, 
        clickedAt: new Date() 
      },
      { new: true }
    );

    if (!log) {
      return res.status(404).json({ success: false, error: 'Log entry not found' });
    }

    // 2. Trigger/Update Training Record
    await Training.findOneAndUpdate(
      { userId, campaignId },
      { 
        completed: true, 
        completedAt: new Date() 
      },
      { upsert: true, new: true }
    );

    // 3. Inform user and provide training message
    res.send(`
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
        <h1 style="color: #d9534f;">Cybersecurity Awareness Training</h1>
        <p style="font-size: 18px;">
          This was a <strong>phishing simulation</strong> conducted by your IT Security Department.
        </p>
        <div style="background-color: #fcf8e3; border: 1px solid #faebcc; color: #8a6d3b; padding: 20px; margin: 20px auto; max-width: 600px;">
          <p>You clicked on a link that could have led to a credential theft or malware infection.</p>
          <p><strong>Remember:</strong> Always check the sender's email address and hover over links before clicking.</p>
        </div>
        <p>You have been automatically enrolled in mandatory security awareness training.</p>
      </div>
    `);
  } catch (error) {
    next(error);
  }
};
