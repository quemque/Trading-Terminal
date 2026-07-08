const { WebSocketServer } = require('ws')
const config = require('../config/websocket')
const WebsocketService = require('../services/WebsocketService')
const ClientHandler = require('../handlers/ClientHandler')

class OrderBookServer {
   constructor() {
      this.port = config.WS_PORT
      this.wss = null
      this.clients = new Map()
      this.broadcastInterval = null
      this.binanceService = WebsocketService
   }

   start() {
      this.wss = new WebSocketServer({ port: this.port })
      console.log(`🔌 WebSocket server running on ws://localhost:${this.port}`)

      this.wss.on('connection', this.handleConnection.bind(this))
      this.startBroadcasting()

      return this
   }

   stop() {
      if (this.broadcastInterval) {
         clearInterval(this.broadcastInterval)
      }
      if (this.wss) {
         this.wss.close()
      }
   }

   handleConnection(ws) {
      console.log('✅ Client connected')

      const client = new ClientHandler(ws, () => {
         this.clients.delete(client)
      })

      this.clients.set(client, client)

      client.send({
         type: 'CONNECTED',
         message: 'Connected to OrderBook WebSocket',
         timestamp: Date.now(),
      })
   }

   async broadcastOrderBook() {
      if (this.clients.size === 0) return

      for (const [, client] of this.clients) {
         if (client.isConnected()) {
            try {
               const orderBook = await this.binanceService.fetchOrderBook(
                  client.getSymbol(),
               )

               client.send({
                  type: 'ORDER_BOOK',
                  symbol: client.getSymbol(),
                  data: orderBook,
                  timestamp: Date.now(),
               })
            } catch (error) {
               console.error(`Failed to fetch order book: ${error.message}`)
            }
         }
      }
   }

   startBroadcasting() {
      this.broadcastInterval = setInterval(
         () => this.broadcastOrderBook(),
         config.BROADCAST_INTERVAL,
      )
      console.log(
         `📡 Broadcasting Order Book every ${config.BROADCAST_INTERVAL}ms`,
      )
   }
}

module.exports = OrderBookServer
