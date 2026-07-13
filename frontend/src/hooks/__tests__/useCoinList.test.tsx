import { describe, it, expect, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useCoinList } from '../useCoinList'
import { coinApi } from '../../api/coin.api'
import React from 'react'

vi.mock('../../api/coin.api', () => ({
   coinApi: {
      fetchCoinList: vi.fn(),
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

describe('useCoinList', () => {
   it('should fetch coin list successfully', async () => {
      const mockCoins = [
         { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin' },
         { id: 'ethereum', symbol: 'eth', name: 'Ethereum' },
      ]

      vi.mocked(coinApi.fetchCoinList).mockResolvedValueOnce(mockCoins as never)

      const { result } = renderHook(() => useCoinList(10), {
         wrapper: createWrapper(),
      })

      expect(result.current.isLoading).toBe(true)

      await waitFor(() => {
         expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.data).toEqual(mockCoins)
      expect(coinApi.fetchCoinList).toHaveBeenCalledWith(10)
   })

   it('should use default limit when not provided', async () => {
      vi.mocked(coinApi.fetchCoinList).mockResolvedValueOnce([] as never)

      renderHook(() => useCoinList(), {
         wrapper: createWrapper(),
      })

      expect(coinApi.fetchCoinList).toHaveBeenCalledWith(expect.any(Number))
   })

   it('should handle API error', async () => {
      const error = new Error('API Error')
      vi.mocked(coinApi.fetchCoinList).mockRejectedValueOnce(error)

      const { result } = renderHook(() => useCoinList(), {
         wrapper: createWrapper(),
      })

      await waitFor(() => {
         expect(result.current.isError).toBe(true)
      })

      expect(result.current.error).toBeDefined()
   })
})
