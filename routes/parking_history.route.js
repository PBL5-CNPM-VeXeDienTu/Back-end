const express = require('express')
const checkAuthMiddleware = require('../middleware/check-auth')
const checkOwnerMiddleware = require('../middleware/check-owner')
const checkRoleMiddleware = require('../middleware/check-role')
const parkingHistoryApiController = require('../controllers/api/parking_history.controller')

const router = express.Router()

router.get(
    '/',
    checkAuthMiddleware.checkAuth,
    parkingHistoryApiController.index,
)
router.get(
    '/get-by-user/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkAccountOwner,
    parkingHistoryApiController.indexByUserId,
)
router.get(
    '/:id',
    checkAuthMiddleware.checkAuth,
    parkingHistoryApiController.showById,
)
router.patch(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkRoleAdmin,
    parkingHistoryApiController.updateById,
)
router.delete(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkRoleAdmin,
    parkingHistoryApiController.deleteById,
)

module.exports = router
