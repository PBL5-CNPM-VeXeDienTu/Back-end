const express = require('express')
const checkAuthMiddleware = require('../middleware/check-auth')
const checkRoleMiddleware = require('../middleware/check-role')
const featureApiFeature = require('../controllers/api/feature.controller')

const router = express.Router()

router.get('/', checkAuthMiddleware.checkAuth, featureApiFeature.index)

router.get('/:id', checkAuthMiddleware.checkAuth, featureApiFeature.showById)

router.post(
    '/',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkRoleAdmin,
    featureApiFeature.create,
)

router.patch(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkRoleAdmin,
    featureApiFeature.updateById,
)
router.delete(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkRoleAdmin,
    featureApiFeature.deleteById,
)

module.exports = router
