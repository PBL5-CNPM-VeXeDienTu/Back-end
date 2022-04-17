const express = require('express')
const checkAuthMiddleware = require('../middleware/check-auth')
const userApiController = require('../controllers/api/user.controller')

const router = express.Router()

router.get('/', checkAuthMiddleware.checkAuth, userApiController.index)
router.get('/:id', checkAuthMiddleware.checkAuth, userApiController.showById)
router.patch('/:id', checkAuthMiddleware.checkAuth, userApiController.update)
router.delete(
    '/:id',
    checkAuthMiddleware.checkAuth,
    userApiController.deleteById,
)

module.exports = router
