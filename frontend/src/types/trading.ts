export interface PriceHistory {
   price: number
   timestamp: number
   date: string
}

export interface HistoryResponse {
   symbol: string
   prices: PriceHistory[]
   lastUpdated: number
}
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
export type TimeFrame = '1h' | '1d' | '1m' | '1y'

export interface TerminalSettings {
   symbol: string
   timeframe: TimeFrame
   darkMode: boolean
}
export interface TradingState {
   currentPrice: number | null
   lastTick: Tick | null
   symbol: string
   candles: Candle[]
   orderBook: OrderBook | null
   trades: Trade[]
   isConnected: boolean

   setSymbol: (symbol: string) => void
   updateTick: (tick: Tick) => void
   addCandle: (candle: Candle) => void
   updateOrderBook: (book: OrderBook) => void
   addTrade: (trade: Trade) => void
   setConnected: (connected: boolean) => void
   reset: () => void
}
