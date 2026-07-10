import type { OrderBookData } from '../types/Order'

export const WS_CONFIG = {
   URL: import.meta.env.VITE_WS_URL || 'ws://localhost:8080',
   RECONNECT_DELAY: 2000,
   MAX_RECONNECT_ATTEMPTS: 5,
   DEFAULT_SYMBOL: 'BTC',
   ORDER_LIMIT: 7,
} as const

export const WS_MESSAGE_TYPES = {
   SET_SYMBOL: 'SET_SYMBOL',
   ORDER_BOOK: 'ORDER_BOOK',
   CONNECTED: 'CONNECTED',
} as const

export interface WebSocketMessage {
   type: string
   symbol?: string
   data?: OrderBookData
   message?: string
   timestamp?: number
}

export type MessageHandler = (data: WebSocketMessage) => void
