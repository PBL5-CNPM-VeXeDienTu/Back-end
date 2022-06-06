const express = require('express')
const checkAuthMiddleware = require('../middleware/check-auth')
const checkOwnerMiddleware = require('../middleware/check-owner')
const checkRoleMiddleware = require('../middleware/check-role')
const feedbackApiController = require('../controllers/api/feedback.controller')

const router = express.Router()

router.get(
    '/',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkRoleAdmin,
    feedbackApiController.index,
)
router.get(
    '/get-by-user/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkAccountOwner,
    feedbackApiController.indexByUserId,
)
router.get(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkFeedbackOwner,
    feedbackApiController.showById,
)
router.post('/', checkAuthMiddleware.checkAuth, feedbackApiController.create)
router.patch(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkFeedbackOwner,
    feedbackApiController.updateById,
)
router.delete(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkFeedbackOwner,
    feedbackApiController.deleteById,
)

module.exports = router
