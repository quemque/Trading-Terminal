const axios = require('axios')
const config = require('../config/config.js')

const { url: API_URL, key: API_KEY } = config.api

class CoinGeckoService {
   async getMarketChart(symbol, days) {
      const response = await axios.get(
         `${API_URL}/coins/${symbol}/market_chart`,
         {
            params: {
               vs_currency: 'usd',
               days: parseInt(days, 10),
               x_cg_demo_api_key: API_KEY,
            },
         },
      )

      if (!response.data?.prices) {
         throw new Error('No price data received from API')
      }

      return response.data.prices
   }

   transformPrices(prices) {
      return prices.map(([timestamp, price]) => ({
         price: Math.round(price * 100) / 100,
         timestamp: timestamp,
         date: new Date(timestamp).toLocaleDateString(),
      }))
   }
}

module.exports = new CoinGeckoService()
