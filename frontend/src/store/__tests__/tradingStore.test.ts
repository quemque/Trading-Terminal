import { describe, it, expect, beforeEach } from 'vitest'
import { useTradingStore } from '../tradingStore'
import { act } from '@testing-library/react'

const createMockHistoryData = (symbol: string, price: number) => ({
   symbol,
   lastUpdated: Date.now(),
   prices: [
      {
         price,
         date: new Date().toISOString(),
         timestamp: Date.now(),
      },
   ],
})

describe('useTradingStore', () => {
   beforeEach(() => {
      useTradingStore.setState({
         symbol: 'bitcoin',
         wsSymbol: 'BTC',
         days: 30,
         historyData: null,
         isLoading: false,
      })
   })

   describe('initial state', () => {
      it('should have default symbol', () => {
         const { symbol } = useTradingStore.getState()
         expect(symbol).toBe('bitcoin')
      })

      it('should have default wsSymbol', () => {
         const { wsSymbol } = useTradingStore.getState()
         expect(wsSymbol).toBe('BTC')
      })

      it('should have default days', () => {
         const { days } = useTradingStore.getState()
         expect(days).toBe(30)
      })

      it('should have null historyData initially', () => {
         const { historyData } = useTradingStore.getState()
         expect(historyData).toBeNull()
      })

      it('should have isLoading false initially', () => {
         const { isLoading } = useTradingStore.getState()
         expect(isLoading).toBe(false)
      })
   })

   describe('setSymbol', () => {
      it('should update symbol', () => {
         const { setSymbol } = useTradingStore.getState()

         act(() => {
            setSymbol('ethereum')
         })

         expect(useTradingStore.getState().symbol).toBe('ethereum')
      })

      it('should update symbol multiple times', () => {
         const { setSymbol } = useTradingStore.getState()

         act(() => {
            setSymbol('ethereum')
         })

         expect(useTradingStore.getState().symbol).toBe('ethereum')

         act(() => {
            setSymbol('ripple')
         })

         expect(useTradingStore.getState().symbol).toBe('ripple')
      })
   })

   describe('setWsSymbol', () => {
      it('should update wsSymbol', () => {
         const { setWsSymbol } = useTradingStore.getState()

         act(() => {
            setWsSymbol('ETH')
         })

         expect(useTradingStore.getState().wsSymbol).toBe('ETH')
      })

      it('should update wsSymbol independently from symbol', () => {
         const { setSymbol, setWsSymbol } = useTradingStore.getState()

         act(() => {
            setSymbol('ethereum')
            setWsSymbol('ETH')
         })

         const state = useTradingStore.getState()
         expect(state.symbol).toBe('ethereum')
         expect(state.wsSymbol).toBe('ETH')
      })
   })

   describe('setDays', () => {
      it('should update days', () => {
         const { setDays } = useTradingStore.getState()

         act(() => {
            setDays(7)
         })

         expect(useTradingStore.getState().days).toBe(7)
      })

      it('should handle different day values', () => {
         const { setDays } = useTradingStore.getState()

         const testDays = [1, 7, 30, 90, 365]

         testDays.forEach((day) => {
            act(() => {
               setDays(day)
            })
            expect(useTradingStore.getState().days).toBe(day)
         })
      })
   })

   describe('setHistoryData', () => {
      it('should update historyData', () => {
         const mockData = createMockHistoryData('bitcoin', 50000)

         const { setHistoryData } = useTradingStore.getState()

         act(() => {
            setHistoryData(mockData)
         })

         expect(useTradingStore.getState().historyData).toEqual(mockData)
      })

      it('should set historyData to null', () => {
         const mockData = createMockHistoryData('bitcoin', 50000)

         const { setHistoryData } = useTradingStore.getState()

         act(() => {
            setHistoryData(mockData)
         })

         expect(useTradingStore.getState().historyData).not.toBeNull()

         act(() => {
            setHistoryData(null as never)
         })

         expect(useTradingStore.getState().historyData).toBeNull()
      })

      it('should handle empty prices array', () => {
         const mockData = {
            symbol: 'bitcoin',
            lastUpdated: Date.now(),
            prices: [],
         }

         const { setHistoryData } = useTradingStore.getState()

         act(() => {
            setHistoryData(mockData as never)
         })

         expect(useTradingStore.getState().historyData).toEqual(mockData)
      })
   })

   describe('setIsLoading', () => {
      it('should set isLoading to true', () => {
         const { setIsLoading } = useTradingStore.getState()

         act(() => {
            setIsLoading(true)
         })

         expect(useTradingStore.getState().isLoading).toBe(true)
      })

      it('should set isLoading to false', () => {
         const { setIsLoading } = useTradingStore.getState()

         act(() => {
            setIsLoading(true)
         })

         expect(useTradingStore.getState().isLoading).toBe(true)

         act(() => {
            setIsLoading(false)
         })

         expect(useTradingStore.getState().isLoading).toBe(false)
      })
   })

   describe('integration scenarios', () => {
      it('should handle full trading flow', () => {
         const store = useTradingStore.getState()

         act(() => {
            store.setIsLoading(true)
         })

         expect(useTradingStore.getState().isLoading).toBe(true)

         act(() => {
            store.setSymbol('ethereum')
            store.setWsSymbol('ETH')
         })

         const midState = useTradingStore.getState()
         expect(midState.symbol).toBe('ethereum')
         expect(midState.wsSymbol).toBe('ETH')
         expect(midState.isLoading).toBe(true)

         const mockData = createMockHistoryData('ethereum', 3000)

         act(() => {
            store.setDays(7)
            store.setHistoryData(mockData)
            store.setIsLoading(false)
         })

         const finalState = useTradingStore.getState()
         expect(finalState.days).toBe(7)
         expect(finalState.historyData).toEqual(mockData)
         expect(finalState.isLoading).toBe(false)
      })

      it('should maintain state independence between properties', () => {
         const { setSymbol } = useTradingStore.getState()

         act(() => {
            setSymbol('ethereum')
         })

         const state = useTradingStore.getState()
         expect(state.symbol).toBe('ethereum')
         expect(state.wsSymbol).toBe('BTC')
         expect(state.days).toBe(30)
      })

      it('should handle rapid state updates', () => {
         const { setSymbol, setWsSymbol, setDays } = useTradingStore.getState()

         act(() => {
            setSymbol('bitcoin')
            setWsSymbol('BTC')
            setDays(30)
         })

         act(() => {
            setSymbol('ethereum')
            setWsSymbol('ETH')
            setDays(7)
         })

         const state = useTradingStore.getState()
         expect(state.symbol).toBe('ethereum')
         expect(state.wsSymbol).toBe('ETH')
         expect(state.days).toBe(7)
      })
   })
})
