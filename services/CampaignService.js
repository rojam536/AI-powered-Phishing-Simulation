const mongoose = require('mongoose');
const Campaign = require('../models/Campaign');
const User = require('../models/User');
const EmailLog = require('../models/EmailLog');
const AIService = require('./AIService');
const EmailService = require('./EmailService');

class CampaignService {
  async createCampaign(data, adminId) {
    const { name, theme, difficulty, targetUsers } = data;

    // Parse targetUsers if it's a stringified array
    let parsedTargetUsers = targetUsers;
    if (typeof targetUsers === 'string') {
      try {
        parsedTargetUsers = JSON.parse(targetUsers);
      } catch (e) {
        console.error('Failed to parse targetUsers:', targetUsers);
        parsedTargetUsers = [];
      }
    }

    // Convert string IDs to ObjectIds, filtering out invalid ones
    const objectIds = parsedTargetUsers
      .map(id => {
        try {
          return typeof id === 'string' ? new mongoose.Types.ObjectId(id) : id;
        } catch (e) {
          console.error('Invalid ObjectId:', id);
          return null;
        }
      })
      .filter(id => id !== null);

    // 1. Generate AI Content
    const aiContent = await AIService.generatePhishingEmail(theme, difficulty);

    // 2. Save Campaign
    const campaign = await Campaign.create({
      name,
      theme,
      difficulty,
      createdBy: adminId,
      targetUsers: objectIds,
      emailTemplate: aiContent,
      status: 'active'
    });

    // 3. Trigger Email Dispatch (Async)
    this.launchCampaign(campaign);

    return campaign;
  }

  async launchCampaign(campaign) {
    const users = await User.find({ _id: { $in: campaign.targetUsers } });

    for (const user of users) {
      const trackingUrl = `${process.env.BASE_URL}/api/track/${user._id}/${campaign._id}`;
      
      const emailSent = await EmailService.sendPhishingEmail(
        user.email,
        campaign.emailTemplate.subject,
        campaign.emailTemplate.body,
        trackingUrl,
        campaign.emailTemplate.ctaText
      );

      // Log the event
      await EmailLog.create({
        userId: user._id,
        campaignId: campaign._id,
        emailSent,
        sentAt: new Date(),
        simulationId: `SIM-${campaign._id}-${user._id}`
      });
    }

    campaign.status = 'completed';
    await campaign.save();
  }

  async getCampaignAnalytics(campaignId) {
    const logs = await EmailLog.find({ campaignId });
    const totalSent = logs.filter(l => l.emailSent).length;
    const totalClicks = logs.filter(l => l.clicked).length;
    
    const clickRate = totalSent > 0 ? (totalClicks / totalSent) * 100 : 0;
    
    const riskyUsers = await EmailLog.find({ campaignId, clicked: true })
      .populate('userId', 'name email');

    return {
      totalSent,
      totalClicks,
      clickRate: clickRate.toFixed(2) + '%',
      riskyUsers: riskyUsers.map(l => l.userId)
    };
  }
}

module.exports = new CampaignService();
