const express = require('express')
const checkAuthMiddleware = require('../middleware/check-auth')
const checkRoleMiddleware = require('../middleware/check-role')
const checkinApiController = require('../controllers/api/checkin.controller')

const router = express.Router()

router.post(
    '/',
    checkAuthMiddleware.checkAuth,
    checkRoleMiddleware.checkRoleParkingLot,
    checkinApiController.checkin,
)

module.exports = router
