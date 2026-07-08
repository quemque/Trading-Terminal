import { WS_MESSAGE_TYPES } from '../config/websocket'
export interface OrderBookLevel {
   price: number
   amount: number
}

export interface OrderBookData {
   bids: OrderBookLevel[]
   asks: OrderBookLevel[]
}
export type WsMessageType =
   (typeof WS_MESSAGE_TYPES)[keyof typeof WS_MESSAGE_TYPES]

export interface WebSocketMessage {
   type: string
   symbol?: string
   data?: OrderBookData
   message?: string
   timestamp?: number
}

export type MessageHandler = (data: WebSocketMessage) => void
