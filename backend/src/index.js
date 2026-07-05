const express = require('express')
const axios = require('axios')
const config = require('./config/config')
const cors = require('cors')

const app = express()
const { port } = config
const { url: API_URL, key: API_KEY } = config.api

app.use(cors())
app.use(express.json())

// ✅ Текущая цена (работает)
app.get('/api/bitcoin-price', async (req, res) => {
   try {
      const response = await axios.get(`${API_URL}/simple/price`, {
         params: {
            vs_currencies: 'usd',
            ids: 'bitcoin',
            x_cg_demo_api_key: API_KEY,
         },
      })

      console.log('📊 Sending price to frontend:', response.data)
      res.json(response.data)
   } catch (error) {
      console.error('❌ Error fetching Bitcoin price:', error.message)
      if (error.response) {
         console.error('Status:', error.response.status)
         console.error('Data:', error.response.data)
      }
      res.status(500).json({
         error: 'Failed to fetch Bitcoin price',
         details: error.message,
      })
   }
})

// ✅ ИСТОРИЧЕСКИЕ ДАННЫЕ (ИСПРАВЛЕНО!)
app.get('/api/bitcoin-history', async (req, res) => {
   try {
      const { days = 7, symbol = 'bitcoin' } = req.query

      console.log(`📊 Fetching history for ${symbol}, ${days} days`)

      // ✅ ПРАВИЛЬНЫЙ эндпоинт для истории
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

      // Проверяем наличие данных
      if (!response.data || !response.data.prices) {
         throw new Error('No price data received from API')
      }

      const prices = response.data.prices.map(([timestamp, price]) => ({
         price: Math.round(price * 100) / 100,
         timestamp: timestamp,
         date: new Date(timestamp).toLocaleDateString(),
      }))

      console.log(`📊 Got ${prices.length} data points`)

      res.json({
         symbol: symbol,
         prices: prices,
         lastUpdated: Date.now(),
      })
   } catch (error) {
      console.error('❌ Error fetching history:', error.message)

      if (error.response) {
         console.error('Status:', error.response.status)
         console.error('Data:', error.response.data)
      }

      res.status(500).json({
         error: 'Failed to fetch Bitcoin history',
         details: error.message,
      })
   }
})

app.get('/', (req, res) => {
   res.send('Server is running! Use /api/bitcoin-price')
})

app.listen(port, async () => {
   console.log(`🚀 Server running on http://localhost:${port}`)
   console.log(`📡 API endpoint: http://localhost:${port}/api/bitcoin-price`)
   console.log(
      `📊 History: http://localhost:${port}/api/bitcoin-history?symbol=bitcoin&days=7`,
   )
})
