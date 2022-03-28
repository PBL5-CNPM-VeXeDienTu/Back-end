const express = require('express');
const checkAuthMiddleware = require('../middleware/check-auth');
const authController = require('../controllers/auth/index');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/verify-email/:email', authController.verifyEmail);
router.post('/forgot-password', authController.forgotPassword);
router.get('/reset-password/:email', authController.resetPassword);
router.get('/get-authenticated-user', checkAuthMiddleware.checkAuth, authController.getAuthenticatedUser);

module.exports = router;