const express = require('express');
const { register, login, getUsers } = require('../controllers/AuthController');
const { protect } = require('../middlewares/auth');
const { authorize } = require('../middlewares/role');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', protect, authorize('admin'), getUsers);

module.exports = router;
