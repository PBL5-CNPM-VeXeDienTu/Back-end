const express = require('express')
const checkAuthMiddleware = require('../middleware/check-auth')
const userApiController = require('../controllers/api/user.controller')

const router = express.Router()

router.patch('/:id', checkAuthMiddleware.checkAuth, userApiController.update)

module.exports = router
