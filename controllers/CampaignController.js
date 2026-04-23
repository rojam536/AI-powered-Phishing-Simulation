const CampaignService = require('../services/CampaignService');
const Campaign = require('../models/Campaign');

// @desc    Create new campaign
// @route   POST /api/campaigns
// @access  Private/Admin
exports.createCampaign = async (req, res, next) => {
  try {
    const campaign = await CampaignService.createCampaign(req.body, req.user.id);
    
    res.status(201).json({
      success: true,
      data: campaign
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all campaigns
// @route   GET /api/campaigns
// @access  Private/Admin
exports.getCampaigns = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find().populate('createdBy', 'name email');
    
    res.json({
      success: true,
      count: campaigns.length,
      data: campaigns
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get campaign analytics
// @route   GET /api/analytics/:id
// @access  Private/Admin
exports.getAnalytics = async (req, res, next) => {
  try {
    const analytics = await CampaignService.getCampaignAnalytics(req.params.id);
    
    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete campaign
// @route   DELETE /api/campaigns/:id
// @access  Private/Admin
exports.deleteCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ success: false, error: 'Campaign not found' });
    }

    await campaign.deleteOne();

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
