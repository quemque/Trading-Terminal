const coinGeckoService = require('../services/coinService.js')
const { DEFAULT_SYMBOL, DEFAULT_DAYS } = require('../constants/constants.js')

class HistoryController {
   async getHistory(req, res) {
      try {
         const { days = DEFAULT_DAYS, symbol = DEFAULT_SYMBOL } = req.query

         console.log(`📊 Fetching history for ${symbol}, ${days} days`)

         const rawPrices = await coinGeckoService.getMarketChart(symbol, days)
         const prices = coinGeckoService.transformPrices(rawPrices)

         console.log(`📊 Got ${prices.length} data points`)

         res.json({
            symbol: symbol,
            prices: prices,
            lastUpdated: Date.now(),
         })
      } catch (error) {
         console.error('❌ Error fetching history:', error.message)

         if (error.response?.status === 404) {
            return res.status(404).json({
               error: `Symbol "${symbol}" not found`,
            })
         }

         if (error.code === 'ECONNREFUSED') {
            return res.status(503).json({
               error: 'CoinGecko API is unavailable',
            })
         }

         res.status(500).json({
            error: 'Internal server error',
         })
      }
   }
}

module.exports = new HistoryController()
