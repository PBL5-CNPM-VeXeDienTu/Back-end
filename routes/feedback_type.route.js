const express = require('express')
const checkAuthMiddleware = require('../middleware/check-auth')
const checkOwnerMiddleware = require('../middleware/check-owner')
const checkRoleMiddleware = require('../middleware/check-role')
const feedbackTypeApiController = require('../controllers/api/feedback_type.controller')

const router = express.Router()

router.get('/', checkAuthMiddleware.checkAuth, feedbackTypeApiController.index)

router.get(
    '/:id',
    checkAuthMiddleware.checkAuth,
    feedbackTypeApiController.showById,
)

router.post(
    '/',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkRoleAdmin,
    feedbackTypeApiController.create,
)

router.patch(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkRoleAdmin,
    feedbackTypeApiController.updateById,
)
router.delete(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkRoleAdmin,
    feedbackTypeApiController.deleteById,
)

module.exports = router
