const express = require('express')
const checkAuthMiddleware = require('../middleware/check-auth')
const checkRoleMiddleware = require('../middleware/check-owner')
const vehicleApiController = require('../controllers/api/vehicle.controller')

const router = express.Router()

router.get(
    '/',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkVehicleOwner,
    vehicleApiController.index,
)
router.get(
    '/get-by-owner/:id',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkAccountOwner,
    vehicleApiController.indexByOwnerId,
)
router.get(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkVehicleOwner,
    vehicleApiController.showById,
)
router.post('/', checkAuthMiddleware.checkAuth, vehicleApiController.create)
router.patch(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkVehicleOwner,
    vehicleApiController.updateById,
)
router.delete(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkVehicleOwner,
    vehicleApiController.softDeleteById,
)

module.exports = router
