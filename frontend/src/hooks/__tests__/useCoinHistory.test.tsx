import { describe, it, expect, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useBitcoinHistory } from '../useCoinHistory'
import { coinApi } from '../../api/coin.api'
import React from 'react'

vi.mock('../../api/coin.api', () => ({
   coinApi: {
      fetchHistory: vi.fn(),
   },
}))

function createWrapper() {
   const queryClient = new QueryClient({
      defaultOptions: {
         queries: {
            retry: false,
         },
      },
   })
   return function Wrapper({ children }: { children: React.ReactNode }) {
      return React.createElement(
         QueryClientProvider,
         { client: queryClient },
         children,
      )
   }
}

describe('useBitcoinHistory', () => {
   it('should fetch Bitcoin history successfully', async () => {
      const mockHistoryData = {
         symbol: 'bitcoin',
         lastUpdated: Date.now(),
         prices: [
            { price: 50000, timestamp: 1234567890 },
            { price: 51000, timestamp: 1234567891 },
         ],
      }

      vi.mocked(coinApi.fetchHistory).mockResolvedValueOnce(
         mockHistoryData as never,
      )

      const { result } = renderHook(() => useBitcoinHistory('bitcoin', 30), {
         wrapper: createWrapper(),
      })

      expect(result.current.isLoading).toBe(true)

      await waitFor(() => {
         expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.data).toEqual(mockHistoryData)
      expect(coinApi.fetchHistory).toHaveBeenCalledWith('bitcoin', 30)
   })

   it('should handle fetch error gracefully', async () => {
      const error = new Error('Failed to fetch history')
      vi.mocked(coinApi.fetchHistory).mockRejectedValueOnce(error)

      const { result } = renderHook(
         () => useBitcoinHistory('invalid-coin', 30),
         { wrapper: createWrapper() },
      )

      await waitFor(() => {
         expect(result.current.isError).toBe(true)
      })

      expect(result.current.error).toBeDefined()
   })
})
