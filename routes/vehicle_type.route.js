const express = require('express')
const checkAuthMiddleware = require('../middleware/check-auth')
const checkOwnerMiddleware = require('../middleware/check-owner')
const checkRoleMiddleware = require('../middleware/check-role')
const vehicleTypeApiController = require('../controllers/api/vehicle_type.controller')

const router = express.Router()

router.get('/', checkAuthMiddleware.checkAuth, vehicleTypeApiController.index)

router.get(
    '/:id',
    checkAuthMiddleware.checkAuth,
    vehicleTypeApiController.showById,
)

router.post(
    '/',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkRoleAdmin,
    vehicleTypeApiController.create,
)

router.patch(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkRoleAdmin,
    vehicleTypeApiController.updateById,
)
router.delete(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkRoleAdmin,
    vehicleTypeApiController.deleteById,
)

module.exports = router
