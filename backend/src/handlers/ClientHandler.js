class ClientHandler {
   constructor(ws, onDisconnect) {
      this.ws = ws
      this.symbol = 'BTC'
      this.onDisconnect = onDisconnect
      this.setupListeners()
   }

   setupListeners() {
      this.ws.on('message', this.handleMessage.bind(this))
      this.ws.on('close', this.handleClose.bind(this))
      this.ws.on('error', this.handleError.bind(this))
   }

   handleMessage(data) {
      try {
         const message = JSON.parse(data.toString())
         if (message.type === 'SET_SYMBOL' && message.symbol) {
            this.updateSymbol(message.symbol)
         }
      } catch (error) {
         console.error('Error parsing message:', error)
      }
   }

   updateSymbol(symbol) {
      if (this.symbol !== symbol) {
         console.log(`📊 Symbol changed: ${this.symbol} → ${symbol}`)
         this.symbol = symbol
      }
   }

   handleClose() {
      console.log('❌ Client disconnected')
      this.onDisconnect?.()
   }

   handleError(error) {
      console.error('WebSocket error:', error)
   }

   send(data) {
      if (this.ws.readyState === 1) {
         this.ws.send(JSON.stringify(data))
      }
   }

   getSymbol() {
      return this.symbol
   }

   isConnected() {
      return this.ws.readyState === 1
   }
}

module.exports = ClientHandler
