const express = require('express')
const checkAuthMiddleware = require('../middleware/check-auth')
const checkRoleMiddleware = require('../middleware/check-role')

const uploadHelpers = require('../helpers/uploaders')
const uploadControllers = require('../controllers/upload')

const router = express.Router()

router.post(
    '/avatar/user/:id',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkRoleUpload,
    uploadHelpers.userAvatarUploader,
    uploadControllers.userAvatarController,
)
router.post(
    '/avatar/vehicle/:id',
    checkAuthMiddleware.checkAuth,
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
    uploadHelpers.cavetBackUploader,
    uploadControllers.cavetBackController,
)
router.post(
    '/cavet/front/:id',
    checkAuthMiddleware.checkAuth,
    uploadHelpers.cavetFrontUploader,
    uploadControllers.cavetFrontController,
)

module.exports = router
