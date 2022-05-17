const express = require('express')
const checkAuthMiddleware = require('../middleware/check-auth')
const checkOwnerMiddleware = require('../middleware/check-owner')
const parkingPriceApiController = require('../controllers/api/parking_price.controller')

const router = express.Router()

router.get(
    '/get-by-parking-lot/:id',
    checkAuthMiddleware.checkAuth,
    parkingPriceApiController.indexByParkingLotId,
)
router.get(
    '/:id',
    checkAuthMiddleware.checkAuth,
    parkingPriceApiController.showById,
)
router.post(
    '/',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkParkingLotOwner,
    parkingPriceApiController.create,
)
router.patch(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkParkingLotOwner,
    parkingPriceApiController.updateById,
)
router.delete(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkParkingLotOwner,
    parkingPriceApiController.deleteById,
)

module.exports = router
