const express = require('express')
const checkAuthMiddleware = require('../middleware/check-auth')
const checkOwnerMiddleware = require('../middleware/check-owner')
const checkRoleMiddleware = require('../middleware/check-role')
const userApiController = require('../controllers/api/user.controller')

const router = express.Router()

router.get(
    '/',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkAccountOwner,
    checkRoleMiddleware.checkRoleAdmin,
    userApiController.index,
)
router.get(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkAccountOwner,
    userApiController.showById,
)
router.post(
    '/',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkRoleAdmin,
    userApiController.create,
)
router.patch(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkAccountOwner,
    userApiController.updateById,
)
router.delete(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkAccountOwner,
    userApiController.softDeleteById,
)

module.exports = router
