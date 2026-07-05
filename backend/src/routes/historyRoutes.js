const express = require('express')
const router = express.Router()
const historyController = require('../controllers/HistoryController')

router.get('/api/coin-history', historyController.getHistory)

module.exports = router
