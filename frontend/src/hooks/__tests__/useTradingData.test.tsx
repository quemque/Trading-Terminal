import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTradingData } from '../useTradingData'
import React from 'react'

const mockSetHistoryData = vi.fn()
const mockSetIsLoading = vi.fn()

vi.mock('../../store/tradingStore', () => ({
   useTradingStore: vi.fn(() => ({
      symbol: 'bitcoin',
      days: 30,
      setHistoryData: mockSetHistoryData,
      setIsLoading: mockSetIsLoading,
   })),
}))

const mockHistoryData = {
   symbol: 'bitcoin',
   lastUpdated: Date.now(),
   prices: [{ price: 50000, timestamp: Date.now() }],
}

vi.mock('../useCoinHistory', () => ({
   useBitcoinHistory: vi.fn(() => ({
      data: mockHistoryData,
      isLoading: false,
   })),
}))

function createWrapper() {
   const queryClient = new QueryClient()
   return function Wrapper({ children }: { children: React.ReactNode }) {
      return React.createElement(
         QueryClientProvider,
         { client: queryClient },
         children,
      )
   }
}

describe('useTradingData', () => {
   beforeEach(() => {
      vi.clearAllMocks()
   })

   it('should set history data when available', () => {
      renderHook(() => useTradingData(), {
         wrapper: createWrapper(),
      })

      expect(mockSetHistoryData).toHaveBeenCalledWith(mockHistoryData)
      expect(mockSetIsLoading).toHaveBeenCalledWith(false)
   })

   it('should return history data and loading state', () => {
      const { result } = renderHook(() => useTradingData(), {
         wrapper: createWrapper(),
      })

      expect(result.current.historyData).toEqual(mockHistoryData)
      expect(result.current.isLoading).toBe(false)
   })
})
