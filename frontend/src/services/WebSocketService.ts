import { WS_CONFIG, WS_MESSAGE_TYPES } from '../config/websocket'
import { MessageHandler } from '../types/Order'
import { WebSocketMessage } from '../types/Order'

export class WebSocketService {
   private ws: WebSocket | null = null
   private reconnectTimer: ReturnType<typeof setTimeout> | null = null
   private reconnectAttempts = 0
   private isMounted = true

   constructor(
      private url: string = WS_CONFIG.URL,
      private onMessage: MessageHandler,
      private onConnect?: () => void,
      private onDisconnect?: () => void,
   ) {}

   connect(symbol: string): void {
      if (this.ws?.readyState === WebSocket.OPEN) {
         this.ws.close()
      }

      this.ws = new WebSocket(this.url)

      this.ws.onopen = () => {
         console.log(`✅ Connected for ${symbol}`)
         this.reconnectAttempts = 0
         this.onConnect?.()
         this.sendSymbol(symbol)
      }

      this.ws.onclose = () => {
         console.log(`❌ Disconnected for ${symbol}`)
         this.onDisconnect?.()
         this.reconnect(symbol)
      }

      this.ws.onerror = (error: Event) => {
         console.error('WebSocket error:', error)
         this.reconnect(symbol)
      }

      this.ws.onmessage = (event: MessageEvent) => {
         try {
            const data: WebSocketMessage = JSON.parse(event.data)
            if (data.type === WS_MESSAGE_TYPES.ORDER_BOOK) {
               this.onMessage(data)
            }
         } catch (error) {
            console.error('Error parsing WebSocket message:', error)
         }
      }
   }

   private sendSymbol(symbol: string): void {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return

      const message: WebSocketMessage = {
         type: WS_MESSAGE_TYPES.SET_SYMBOL,
         symbol: symbol.toUpperCase(),
      }

      this.ws.send(JSON.stringify(message))
   }

   private reconnect(symbol: string): void {
      if (!this.isMounted) return
      if (this.reconnectAttempts >= WS_CONFIG.MAX_RECONNECT_ATTEMPTS) {
         console.log(
            `❌ Max reconnect attempts (${WS_CONFIG.MAX_RECONNECT_ATTEMPTS}) reached`,
         )
         return
      }

      this.reconnectTimer = setTimeout(() => {
         this.reconnectAttempts++
         console.log(
            `🔄 Reconnect attempt ${this.reconnectAttempts}/${WS_CONFIG.MAX_RECONNECT_ATTEMPTS}`,
         )
         this.connect(symbol)
      }, WS_CONFIG.RECONNECT_DELAY)
   }

   disconnect(): void {
      this.isMounted = false
      if (this.reconnectTimer) {
         clearTimeout(this.reconnectTimer)
         this.reconnectTimer = null
      }
      if (this.ws) {
         this.ws.close()
         this.ws = null
      }
   }

   updateSymbol(symbol: string): void {
      if (this.ws?.readyState === WebSocket.OPEN) {
         this.sendSymbol(symbol)
      }
   }
}
