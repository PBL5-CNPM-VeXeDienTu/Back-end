const express = require('express')
const checkAuthMiddleware = require('../middleware/check-auth')
const checkRoleMiddleware = require('../middleware/check-role')
const checkoutApiController = require('../controllers/api/checkout.controller')

const router = express.Router()

router.post(
    '/',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkRoleParkingLot,
    checkoutApiController.checkout,
)

module.exports = router
