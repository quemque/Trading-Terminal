const coinGeckoService = require('../services/coinService')
const DEFAULT_COINS = require('../constants/constants')

class CoinController {
   async getTopCoins(req, res) {
      try {
         const { limit = DEFAULT_COINS } = req.query

         const coins = await coinGeckoService.getTopCoins(
            parseInt(limit, DEFAULT_COINS),
         )

         res.json({
            coins,
            count: coins.length,
            lastUpdated: Date.now(),
         })
      } catch (error) {
         console.error('❌ Error fetching top coins:', error.message)
         res.status(500).json({ error: 'Failed to fetch top coins' })
      }
   }
}

module.exports = new CoinController()
