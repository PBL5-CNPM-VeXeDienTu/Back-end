const express = require('express')
const checkAuthMiddleware = require('../middleware/check-auth')
const checkOwnerMiddleware = require('../middleware/check-owner')
const checkRoleMiddleware = require('../middleware/check-role')
const walletApiController = require('../controllers/api/wallet.controller')

const router = express.Router()

router.get(
    '/',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkRoleAdmin,
    walletApiController.index,
)
router.get(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkWalletOwner,
    walletApiController.showById,
)
router.get(
    '/get-by-owner/:id',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkAccountOwner,
    walletApiController.showByUserId,
)
router.post(
    '/:id/recharge',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkWalletOwner,
    walletApiController.rechargeById,
)
router.post(
    '/:id/with-draw',
    checkAuthMiddleware.checkAuth,
    checkOwnerMiddleware.checkWalletOwner,
    walletApiController.withDrawById,
)

module.exports = router
