import { useState, useEffect, useRef, useCallback } from 'react'
import { DEFAULT_SYMBOL } from '../config/default-const'
import { WebSocketService } from '../services/WebSocketService'
import { OrderBookData } from '../types/Order'
import {
   WS_CONFIG,
   WS_MESSAGE_TYPES,
   WebSocketMessage,
} from '../config/websocket'

export function useOrderBook(symbol: string = DEFAULT_SYMBOL) {
   const [orderBook, setOrderBook] = useState<OrderBookData>({
      bids: [],
      asks: [],
   })
   const [isConnected, setIsConnected] = useState(false)
   const wsServiceRef = useRef<WebSocketService | null>(null)

   const handleMessage = useCallback(
      (data: WebSocketMessage) => {
         if (
            data.type === WS_MESSAGE_TYPES.ORDER_BOOK &&
            data.symbol === symbol.toUpperCase()
         ) {
            setOrderBook({
               bids: data.data?.bids?.slice(0, WS_CONFIG.ORDER_LIMIT) || [],
               asks: data.data?.asks?.slice(0, WS_CONFIG.ORDER_LIMIT) || [],
            })
         }
      },
      [symbol],
   )

   useEffect(() => {
      const service = new WebSocketService(
         WS_CONFIG.URL,
         handleMessage,
         () => setIsConnected(true),
         () => setIsConnected(false),
      )

      wsServiceRef.current = service
      service.connect(symbol)

      return () => {
         service.disconnect()
      }
   }, [symbol, handleMessage])

   return { orderBook, isConnected }
}
