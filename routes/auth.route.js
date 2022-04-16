const express = require('express')
const checkAuthMiddleware = require('../middleware/check-auth')
const authController = require('../controllers/auth/index')

const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/verify-email/:email/:authKey', authController.verifyEmail)
router.post(
    '/change-password',
    checkAuthMiddleware.checkAuth,
    authController.changePassword,
)
router.post('/forgot-password', authController.forgotPassword)
router.get('/reset-password/:email/:authKey', authController.resetPassword)
router.get(
    '/get-authenticated-user',
    checkAuthMiddleware.checkAuth,
    authController.getAuthenticatedUser,
)

module.exports = router
