const express = require('express')
const checkAuthMiddleware = require('../middleware/check-auth')
const checkOwnerMiddleware = require('../middleware/check-owner')
const parkingHistoryApiController = require('../controllers/api/parking_history.controller')

const router = express.Router()

router.get(
    '/',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkRoleAdmin,
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
    checkOwnerMiddleware.checkRoleAdmin,
    parkingHistoryApiController.updateById,
)
router.delete(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkRoleAdmin,
    parkingHistoryApiController.deleteById,
)

module.exports = router
