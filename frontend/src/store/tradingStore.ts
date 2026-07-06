import { create } from 'zustand'
import { TradingState } from '../types/trading'
import { DEFAULT_SYMBOL, DEFAULT_DAYS } from '../config/default-const'

export const useTradingStore = create<TradingState>((set) => ({
   symbol: DEFAULT_SYMBOL,
   days: DEFAULT_DAYS,
   historyData: null,
   isLoading: false,

   setSymbol: (symbol) => set({ symbol }),
   setDays: (days) => set({ days }),
   setHistoryData: (data) => set({ historyData: data }),
   setIsLoading: (loading) => set({ isLoading: loading }),
}))
