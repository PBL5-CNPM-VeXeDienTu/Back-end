const express = require('express')
const checkAuthMiddleware = require('../middleware/check-auth')
const checkOwnerMiddleware = require('../middleware/check-owner')

const uploadHelpers = require('../helpers/uploaders')
const uploadControllers = require('../controllers/upload')

const router = express.Router()

router.post(
    '/avatar/user/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkAccountOwner,
    uploadHelpers.userAvatarUploader,
    uploadControllers.userAvatarController,
)
router.post(
    '/avatar/vehicle/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkVehicleOwner,
    uploadHelpers.vehicleAvatarUploader,
    uploadControllers.vehicleAvatarController,
)
router.post(
    '/avatar/parking-lot/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkParkingLotOwner,
    uploadHelpers.parkingLotAvatarUploader,
    uploadControllers.parkingLotAvatarController,
)
router.post(
    '/cavet/back/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkVehicleOwner,
    uploadHelpers.cavetBackUploader,
    uploadControllers.cavetBackController,
)
router.post(
    '/cavet/front/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkVehicleOwner,
    uploadHelpers.cavetFrontUploader,
    uploadControllers.cavetFrontController,
)

module.exports = router
