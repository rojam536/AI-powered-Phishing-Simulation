const express = require('express');
const { completeTraining } = require('../controllers/TrainingController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.use(protect);

router.post('/complete', completeTraining);

module.exports = router;
