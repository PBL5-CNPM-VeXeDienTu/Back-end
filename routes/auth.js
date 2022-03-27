const express = require('express');
const authController = require('../controllers/auth.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

router.post('/register', authController.register);
// router.post('/verify-email/:email', authController.verifyEmail);

module.exports = router;