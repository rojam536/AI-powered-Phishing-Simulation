const express = require('express');
const { createCampaign, getCampaigns, getAnalytics, deleteCampaign } = require('../controllers/CampaignController');
const { protect } = require('../middlewares/auth');
const { authorize } = require('../middlewares/role');

const router = express.Router();

// All routes here require protection and admin role
router.use(protect);
router.use(authorize('admin'));

router.post('/', createCampaign);
router.get('/', getCampaigns);
router.get('/analytics/:id', getAnalytics);
router.delete('/:id', deleteCampaign);

module.exports = router;
