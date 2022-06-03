const express = require('express')
const roleController = require('../controllers/api/role.controller')

const router = express.Router()

router.get('/', roleController.index)

module.exports = router
