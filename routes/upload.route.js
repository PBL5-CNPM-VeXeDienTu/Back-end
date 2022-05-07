const express = require('express')
const checkAuthMiddleware = require('../middleware/check-auth')
const checkRoleMiddleware = require('../middleware/check-owner')

const uploadHelpers = require('../helpers/uploaders')
const uploadControllers = require('../controllers/upload')

const router = express.Router()

router.post(
    '/avatar/user/:id',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkAccountOwner,
    uploadHelpers.userAvatarUploader,
    uploadControllers.userAvatarController,
)
router.post(
    '/avatar/vehicle/:id',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkVehicleOwner,
    uploadHelpers.vehicleAvatarUploader,
    uploadControllers.vehicleAvatarController,
)
router.post(
    '/avatar/parking-lot/:id',
    checkAuthMiddleware.checkAuth,
    uploadHelpers.parkingLotAvatarUploader,
    uploadControllers.parkingLotAvatarController,
)
router.post(
    '/cavet/back/:id',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkVehicleOwner,
    uploadHelpers.cavetBackUploader,
    uploadControllers.cavetBackController,
)
router.post(
    '/cavet/front/:id',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkVehicleOwner,
    uploadHelpers.cavetFrontUploader,
    uploadControllers.cavetFrontController,
)

module.exports = router
