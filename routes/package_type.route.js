const express = require('express')
const checkAuthMiddleware = require('../middleware/check-auth')
const checkRoleMiddleware = require('../middleware/check-role')
const packageTypeApiController = require('../controllers/api/package_type.controller')

const router = express.Router()

router.get('/', checkAuthMiddleware.checkAuth, packageTypeApiController.index)

router.get(
    '/:id',
    checkAuthMiddleware.checkAuth,
    packageTypeApiController.showById,
)

router.post(
    '/',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkRoleAdmin,
    packageTypeApiController.create,
)

router.patch(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkRoleAdmin,
    packageTypeApiController.updateById,
)
router.delete(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkRoleAdmin,
    packageTypeApiController.deleteById,
)

module.exports = router
