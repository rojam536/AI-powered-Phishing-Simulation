const express = require('express');
const { trackClick } = require('../controllers/TrackingController');

const router = express.Router();

router.get('/:userId/:campaignId', trackClick);

module.exports = router;
