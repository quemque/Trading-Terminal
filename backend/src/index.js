const express = require('express')
const cors = require('cors')
const config = require('./config/config')
const historyRoutes = require('./routes/historyRoutes')
const coinRoutes = require('./routes/coinRoutes')
const errorHandler = require('./middleware/errorHandler')

const app = express()
const { port } = config

app.use(cors())
app.use(express.json())

app.use(historyRoutes)
app.use(coinRoutes)
app.use(errorHandler)

app.listen(port, () => {
   console.log(`🚀 Server running on http://localhost:${port}`)
})
