const axios = require('axios')
const config = require('../config/websocket')

class WebsocketService {
   constructor() {
      this.baseUrl = config.BINANCE_API_URL
      this.limit = config.ORDER_BOOK_LIMIT
   }

   async fetchOrderBook(symbol) {
      try {
         const response = await axios.get(
            `${this.baseUrl}/depth?symbol=${symbol}USDT&limit=${this.limit}`,
         )

         return this.transformOrderBook(response.data)
      } catch (error) {
         console.error(`❌ Binance API error: ${error.message}`)
         throw new Error(`Failed to fetch order book for ${symbol}`)
      }
   }

   transformOrderBook(data) {
      return {
         bids: data.bids.map(([price, amount]) => ({
            price: parseFloat(price),
            amount: parseFloat(amount),
         })),
         asks: data.asks.map(([price, amount]) => ({
            price: parseFloat(price),
            amount: parseFloat(amount),
         })),
         lastUpdateId: data.lastUpdateId,
      }
   }
}

module.exports = new WebsocketService()
