const express = require('express')
const checkAuthMiddleware = require('../middleware/check-auth')
const checkOwnerMiddleware = require('../middleware/check-owner')
const checkRoleMiddleware = require('../middleware/check-role')
const parkingLotApiController = require('../controllers/api/parking_lot.controller')

const router = express.Router()

router.get('/', checkAuthMiddleware.checkAuth, parkingLotApiController.index)
router.get(
    '/get-by-owner/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkAccountOwner,
    parkingLotApiController.indexByOwnerId,
)
router.get(
    '/:id',
    checkAuthMiddleware.checkAuth,
    parkingLotApiController.showById,
)
router.post(
    '/',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkRoleParkingLot,
    parkingLotApiController.create,
)
router.patch(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkParkingLotOwner,
    parkingLotApiController.updateById,
)
router.delete(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkParkingLotOwner,
    parkingLotApiController.softDeleteById,
)

module.exports = router
