const express = require('express')
const axios = require('axios')
const config = require('./config/config')
const cors = require('cors')

const app = express()
const { port } = config
const { url: API_URL, key: API_KEY } = config.api

app.use(cors())
app.use(express.json())

app.get('/api/bitcoin-price', async (req, res) => {
   try {
      const response = await axios.get(API_URL, {
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

app.get('/', (req, res) => {
   res.send('Server is running! Use /api/bitcoin-price')
})

app.listen(port, async () => {
   console.log(`🚀 Server running on http://localhost:${port}`)
   console.log(`📡 API endpoint: http://localhost:${port}/api/bitcoin-price`)
})
