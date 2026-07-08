module.exports = {
   WS_PORT: parseInt(process.env.WS_PORT, 10) || 8080,
   BINANCE_API_URL:
      process.env.BINANCE_API_URL || 'https://api.binance.com/api/v3',
   ORDER_BOOK_LIMIT: parseInt(process.env.ORDER_BOOK_LIMIT, 10) || 10,
   BROADCAST_INTERVAL: parseInt(process.env.BROADCAST_INTERVAL, 10) || 3000,
   DEFAULT_SYMBOL: process.env.DEFAULT_SYMBOL || 'BTC',
   MAX_RECONNECT_ATTEMPTS: 5,
}
