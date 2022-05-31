const express = require('express')
const checkAuthMiddleware = require('../middleware/check-auth')
const checkOwnerMiddleware = require('../middleware/check-owner')
const checkRoleMiddleware = require('../middleware/check-role')
const transactionTypeApiController = require('../controllers/api/transaction_type.controller')

const router = express.Router()

router.get(
    '/',
    checkAuthMiddleware.checkAuth,
    transactionTypeApiController.index,
)

router.get(
    '/:id',
    checkAuthMiddleware.checkAuth,
    transactionTypeApiController.showById,
)

router.post(
    '/',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkRoleAdmin,
    transactionTypeApiController.create,
)

router.patch(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkRoleAdmin,
    transactionTypeApiController.updateById,
)
router.delete(
    '/:id',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkRoleAdmin,
    transactionTypeApiController.deleteById,
)

module.exports = router
