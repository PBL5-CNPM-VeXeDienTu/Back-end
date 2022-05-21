const express = require('express')
const checkAuthMiddleware = require('../middleware/check-auth')
const checkOwnerMiddleware = require('../middleware/check-owner')
const packageApiController = require('../controllers/api/package.controller')

const router = express.Router()

router.get('/', checkAuthMiddleware.checkAuth, packageApiController.index)
router.get(
    '/get-by-parking-lot/:id',
    checkAuthMiddleware.checkAuth,
    packageApiController.indexByParkingLotId,
)
router.get('/:id', checkAuthMiddleware.checkAuth, packageApiController.showById)
router.post(
    '/',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkParkingLotOwner,
    packageApiController.create,
)
router.patch(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkPackageOwner,
    packageApiController.updateById,
)
router.delete(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkPackageOwner,
    packageApiController.deleteById,
)

module.exports = router
