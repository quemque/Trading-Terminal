export interface Tick {
   symbol: string
   price: number
   volume: number
   time: number
}
export interface Candle {
   time: number
   open: number
   low: number
   high: number
   close: number
   volume: number
}
export interface OrderBookLevel {
   price: number
   amount: number
   total: number
}
export interface OrderBook {
   asks: OrderBookLevel[]
   bids: OrderBookLevel[]
}
export interface Trade {
   id: string
   price: number
   amount: number
   time: number
   side: 'buy' | 'sell'
}
