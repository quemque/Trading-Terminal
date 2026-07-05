import { create } from 'zustand'
import { TradingState } from '../types/trading'

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
