import { create } from 'zustand'

interface TradingState {
   currentPrice: number | null
}

interface TradingActions {
   setPrice: (price: number) => void
}

export const useTradingStore = create<TradingState & TradingActions>((set) => ({
   currentPrice: null,
   setPrice: (price) => set({ currentPrice: price }),
}))
