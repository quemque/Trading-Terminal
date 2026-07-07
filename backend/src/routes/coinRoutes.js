const express = require('express')
const router = express.Router()
const coinController = require('../controllers/coinController')

router.get('/api/coin-list', coinController.getTopCoins)

module.exports = router
