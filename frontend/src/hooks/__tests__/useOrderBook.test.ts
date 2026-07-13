import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useOrderBook } from '../useOrderBook'

const mockConnect = vi.fn()
const mockDisconnect = vi.fn()
let capturedMessageHandler: ((data: unknown) => void) | null = null
let capturedOpenHandler: (() => void) | null = null
let capturedCloseHandler: (() => void) | null = null

vi.mock('../../services/WebSocketService', () => {
   return {
      WebSocketService: vi.fn(function MockService(
         this: {
            connect: typeof mockConnect
            disconnect: typeof mockDisconnect
         },
         _url: string,
         onMessage: (data: unknown) => void,
         onOpen?: () => void,
         onClose?: () => void,
      ) {
         this.connect = mockConnect
         this.disconnect = mockDisconnect
         capturedMessageHandler = onMessage
         capturedOpenHandler = onOpen || null
         capturedCloseHandler = onClose || null
      }),
   }
})

vi.mock('../../config/websocket', () => ({
   WS_CONFIG: {
      URL: 'ws://localhost:3000',
      ORDER_LIMIT: 20,
   },
   WS_MESSAGE_TYPES: {
      ORDER_BOOK: 'order_book',
   },
}))

describe('useOrderBook', () => {
   beforeEach(() => {
      vi.clearAllMocks()
      capturedMessageHandler = null
      capturedOpenHandler = null
      capturedCloseHandler = null
   })

   it('should initialize with empty order book', () => {
      const { result } = renderHook(() => useOrderBook('BTC'))

      expect(result.current.orderBook).toEqual({
         bids: [],
         asks: [],
      })
      expect(result.current.isConnected).toBe(false)
   })

   it('should create WebSocket connection on mount', () => {
      renderHook(() => useOrderBook('BTC'))

      expect(mockConnect).toHaveBeenCalledTimes(1)
   })

   it('should connect with correct symbol', () => {
      renderHook(() => useOrderBook('ETH'))

      expect(mockConnect).toHaveBeenCalledWith('ETH')
   })

   it('should disconnect on unmount', () => {
      const { unmount } = renderHook(() => useOrderBook('BTC'))
      unmount()

      expect(mockDisconnect).toHaveBeenCalled()
   })

   it('should update order book on valid message', () => {
      const { result } = renderHook(() => useOrderBook('BTC'))

      act(() => {
         capturedMessageHandler?.({
            type: 'order_book',
            symbol: 'BTC',
            data: {
               bids: [
                  { price: 50000, amount: 1 },
                  { price: 49000, amount: 2 },
               ],
               asks: [
                  { price: 51000, amount: 1.5 },
                  { price: 52000, amount: 0.5 },
               ],
            },
         })
      })

      expect(result.current.orderBook.bids).toHaveLength(2)
      expect(result.current.orderBook.asks).toHaveLength(2)
      expect(result.current.orderBook.bids[0]).toEqual({
         price: 50000,
         amount: 1,
      })
      expect(result.current.orderBook.asks[0]).toEqual({
         price: 51000,
         amount: 1.5,
      })
   })

   it('should limit order book size', () => {
      const { result } = renderHook(() => useOrderBook('BTC'))

      const manyOrders = Array.from({ length: 100 }, (_, i) => ({
         price: 50000 - i * 10,
         amount: Math.random() * 10,
      }))

      act(() => {
         capturedMessageHandler?.({
            type: 'order_book',
            symbol: 'BTC',
            data: {
               bids: manyOrders,
               asks: manyOrders,
            },
         })
      })

      expect(result.current.orderBook.bids.length).toBeLessThanOrEqual(20)
      expect(result.current.orderBook.asks.length).toBeLessThanOrEqual(20)
   })

   it('should ignore messages for different symbols', () => {
      const { result } = renderHook(() => useOrderBook('BTC'))

      act(() => {
         capturedMessageHandler?.({
            type: 'order_book',
            symbol: 'ETH',
            data: {
               bids: [{ price: 3000, amount: 10 }],
               asks: [{ price: 3100, amount: 5 }],
            },
         })
      })

      expect(result.current.orderBook.bids).toHaveLength(0)
      expect(result.current.orderBook.asks).toHaveLength(0)
   })

   it('should handle connection open', () => {
      const { result } = renderHook(() => useOrderBook('BTC'))

      act(() => {
         capturedOpenHandler?.()
      })

      expect(result.current.isConnected).toBe(true)
   })

   it('should handle connection close', () => {
      const { result } = renderHook(() => useOrderBook('BTC'))

      act(() => {
         capturedOpenHandler?.()
      })

      act(() => {
         capturedCloseHandler?.()
      })

      expect(result.current.isConnected).toBe(false)
   })

   it('should reconnect when symbol changes', () => {
      const { rerender } = renderHook(
         ({ symbol }: { symbol: string }) => useOrderBook(symbol),
         { initialProps: { symbol: 'BTC' } },
      )

      expect(mockConnect).toHaveBeenCalledWith('BTC')

      rerender({ symbol: 'ETH' })

      expect(mockDisconnect).toHaveBeenCalled()
      expect(mockConnect).toHaveBeenCalledWith('ETH')
   })
})
