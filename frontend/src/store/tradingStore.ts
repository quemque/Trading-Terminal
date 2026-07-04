import { create } from 'zustand'
import { Tick, Candle, Trade, OrderBook } from '../types/trading'

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

export const useTradingStore = create<TradingState>((set) => ({
   currentPrice: null,
   lastTick: null,
   symbol: 'BTC/USD',
   candles: [],
   orderBook: null,
   trades: [],
   isConnected: false,

   setSymbol: (symbol) => set({ symbol }),

   updateTick: (tick) =>
      set({
         currentPrice: tick.price,
         lastTick: tick,
      }),

   addCandle: (candle) =>
      set((state) => ({
         candles: [...state.candles, candle].slice(-500),
      })),

   updateOrderBook: (book) => set({ orderBook: book }),

   addTrade: (trade) =>
      set((state) => ({
         trades: [trade, ...state.trades].slice(0, 200),
      })),

   setConnected: (connected) => set({ isConnected: connected }),

   reset: () =>
      set({
         currentPrice: null,
         lastTick: null,
         candles: [],
         orderBook: null,
         trades: [],
      }),
}))
