const express = require('express')
const checkAuthMiddleware = require('../middleware/check-auth')
const checkOwnerMiddleware = require('../middleware/check-owner')
const checkRoleMiddleware = require('../middleware/check-role')
const userPackageApiController = require('../controllers/api/user_package.controller')

const router = express.Router()

router.get('/', checkAuthMiddleware.checkAuth, userPackageApiController.index)
router.get(
    '/get-by-owner/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkAccountOwner,
    userPackageApiController.indexByOwnerId,
)
router.post(
    '/',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkRoleBasicUser,
    userPackageApiController.create,
)
router.patch(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkUserPackageOwner,
    userPackageApiController.updateById,
)
router.delete(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkUserPackageOwner,
    userPackageApiController.deleteById,
)
module.exports = router
