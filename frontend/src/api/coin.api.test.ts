import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { coinApi } from './coin.api'

vi.mock('axios', () => ({
   default: {
      get: vi.fn(),
   },
}))

vi.mock('../config/default-const', () => ({
   DEFAULT_SYMBOL: 'bitcoin',
   DEFAULT_DAYS: 7,
   DEFAULT_COINS: 7,
}))

describe('coinApi', () => {
   beforeEach(() => {
      vi.clearAllMocks()
   })

   describe('fetchHistory', () => {
      const mockHistoryResponse = {
         symbol: 'bitcoin',
         lastUpdated: Date.now(),
         prices: [
            { price: 50000, date: '2024-01-01', timestamp: 1704067200000 },
            { price: 51000, date: '2024-01-02', timestamp: 1704153600000 },
         ],
      }

      it('should fetch coin history with default parameters', async () => {
         vi.mocked(axios.get).mockResolvedValueOnce({
            data: mockHistoryResponse,
         })

         const result = await coinApi.fetchHistory()

         expect(axios.get).toHaveBeenCalledWith(
            'http://localhost:3000/api/coin-history?symbol=bitcoin&days=7',
         )
         expect(result).toEqual(mockHistoryResponse)
      })

      it('should fetch coin history with custom symbol', async () => {
         vi.mocked(axios.get).mockResolvedValueOnce({
            data: mockHistoryResponse,
         })

         const result = await coinApi.fetchHistory('ethereum')

         expect(axios.get).toHaveBeenCalledWith(
            'http://localhost:3000/api/coin-history?symbol=ethereum&days=7',
         )
         expect(result).toEqual(mockHistoryResponse)
      })

      it('should fetch coin history with custom days', async () => {
         vi.mocked(axios.get).mockResolvedValueOnce({
            data: mockHistoryResponse,
         })

         const result = await coinApi.fetchHistory('bitcoin', 30)

         expect(axios.get).toHaveBeenCalledWith(
            'http://localhost:3000/api/coin-history?symbol=bitcoin&days=30',
         )
         expect(result).toEqual(mockHistoryResponse)
      })

      it('should fetch coin history with both custom parameters', async () => {
         vi.mocked(axios.get).mockResolvedValueOnce({
            data: mockHistoryResponse,
         })

         const result = await coinApi.fetchHistory('ethereum', 90)

         expect(axios.get).toHaveBeenCalledWith(
            'http://localhost:3000/api/coin-history?symbol=ethereum&days=90',
         )
         expect(result).toEqual(mockHistoryResponse)
      })

      it('should handle network error', async () => {
         const networkError = new Error('Network Error')
         vi.mocked(axios.get).mockRejectedValueOnce(networkError)

         await expect(coinApi.fetchHistory()).rejects.toThrow('Network Error')
      })

      it('should handle API error response', async () => {
         const apiError = new Error('Request failed with status code 500')
         vi.mocked(axios.get).mockRejectedValueOnce(apiError)

         await expect(coinApi.fetchHistory()).rejects.toThrow(
            'Request failed with status code 500',
         )
      })

      it('should handle 404 error', async () => {
         const notFoundError = new Error('Request failed with status code 404')
         vi.mocked(axios.get).mockRejectedValueOnce(notFoundError)

         await expect(coinApi.fetchHistory('invalid-coin')).rejects.toThrow(
            'Request failed with status code 404',
         )
      })

      it('should handle empty response data', async () => {
         const emptyResponse = {
            symbol: 'bitcoin',
            lastUpdated: Date.now(),
            prices: [],
         }
         vi.mocked(axios.get).mockResolvedValueOnce({ data: emptyResponse })

         const result = await coinApi.fetchHistory()

         expect(result).toEqual(emptyResponse)
         expect(result.prices).toHaveLength(0)
      })

      it('should handle malformed response', async () => {
         vi.mocked(axios.get).mockResolvedValueOnce({ data: null })

         const result = await coinApi.fetchHistory()

         expect(result).toBeNull()
      })
   })

   describe('fetchCoinList', () => {
      const mockCoinListResponse = {
         coins: [
            { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin' },
            { id: 'ethereum', symbol: 'eth', name: 'Ethereum' },
            { id: 'ripple', symbol: 'xrp', name: 'Ripple' },
         ],
      }

      it('should fetch coin list with default limit', async () => {
         vi.mocked(axios.get).mockResolvedValueOnce({
            data: mockCoinListResponse,
         })

         const result = await coinApi.fetchCoinList()

         expect(axios.get).toHaveBeenCalledWith(
            'http://localhost:3000/api/coin-list?limit=7',
         )
         expect(result).toEqual(mockCoinListResponse.coins)
         expect(result).toHaveLength(3)
      })

      it('should fetch coin list with custom limit', async () => {
         vi.mocked(axios.get).mockResolvedValueOnce({
            data: mockCoinListResponse,
         })

         const result = await coinApi.fetchCoinList(10)

         expect(axios.get).toHaveBeenCalledWith(
            'http://localhost:3000/api/coin-list?limit=10',
         )
         expect(result).toEqual(mockCoinListResponse.coins)
      })

      it('should fetch coin list with large limit', async () => {
         vi.mocked(axios.get).mockResolvedValueOnce({
            data: mockCoinListResponse,
         })

         const result = await coinApi.fetchCoinList(100)

         expect(axios.get).toHaveBeenCalledWith(
            'http://localhost:3000/api/coin-list?limit=100',
         )
         expect(result).toEqual(mockCoinListResponse.coins)
      })

      it('should handle empty coin list', async () => {
         vi.mocked(axios.get).mockResolvedValueOnce({ data: { coins: [] } })

         const result = await coinApi.fetchCoinList()

         expect(result).toEqual([])
         expect(result).toHaveLength(0)
      })

      it('should handle network error', async () => {
         const networkError = new Error('Network Error')
         vi.mocked(axios.get).mockRejectedValueOnce(networkError)

         await expect(coinApi.fetchCoinList()).rejects.toThrow('Network Error')
      })

      it('should handle API error', async () => {
         const apiError = new Error('Request failed with status code 429')
         vi.mocked(axios.get).mockRejectedValueOnce(apiError)

         await expect(coinApi.fetchCoinList()).rejects.toThrow(
            'Request failed with status code 429',
         )
      })

      it('should handle timeout error', async () => {
         const timeoutError = new Error('timeout of 5000ms exceeded')
         vi.mocked(axios.get).mockRejectedValueOnce(timeoutError)

         await expect(coinApi.fetchCoinList()).rejects.toThrow(
            'timeout of 5000ms exceeded',
         )
      })

      it('should handle missing coins property in response', async () => {
         vi.mocked(axios.get).mockResolvedValueOnce({ data: {} })

         const result = await coinApi.fetchCoinList()

         expect(result).toBeUndefined()
      })

      it('should handle null response data', async () => {
         vi.mocked(axios.get).mockResolvedValueOnce({ data: null })

         await expect(coinApi.fetchCoinList()).rejects.toThrow()
      })
   })

   describe('URL construction', () => {
      it('should properly encode URL parameters with spaces', async () => {
         vi.mocked(axios.get).mockResolvedValueOnce({
            data: {
               symbol: 'bitcoin cash',
               lastUpdated: Date.now(),
               prices: [],
            },
         })

         await coinApi.fetchHistory('bitcoin cash')

         expect(axios.get).toHaveBeenCalledWith(
            'http://localhost:3000/api/coin-history?symbol=bitcoin cash&days=7',
         )
      })
   })
})
