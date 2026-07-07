const axios = require('axios')
const config = require('../config/config.js')
const { resolveProjectReferencePath } = require('typescript')

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
   async getTopCoins(limit = 10) {
      const response = await axios.get(`${API_URL}/coins/markets`, {
         params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: limit,
            page: 1,
            sparkline: false,
            price_change_percentage: '24h',
            x_cg_demo_api_key: API_KEY,
         },
      })

      if (!Array.isArray(response.data)) {
         throw new Error('Invalid response from CoinGecko')
      }

      return response.data.map((coin) => ({
         id: coin.id,
         symbol: coin.symbol,
         name: coin.name,
         price: coin.current_price,
         marketCap: coin.market_cap,
         priceChange24h: coin.price_change_percentage_24h,
      }))
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
