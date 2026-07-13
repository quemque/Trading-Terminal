import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { WebSocketService } from './WebSocketService'
import type { WebSocketMessage } from '../types/Order'

vi.mock('../config/websocket', () => ({
   WS_CONFIG: {
      URL: 'ws://localhost:3000',
      RECONNECT_DELAY: 1000,
      MAX_RECONNECT_ATTEMPTS: 5,
   },
   WS_MESSAGE_TYPES: {
      ORDER_BOOK: 'order_book',
      SET_SYMBOL: 'set_symbol',
   },
}))

const mockSend = vi.fn()
let mockOnOpen: ((ev: Event) => void) | null = null
let mockOnClose: ((ev: CloseEvent) => void) | null = null
let mockOnError: ((ev: Event) => void) | null = null
let mockOnMessage: ((ev: MessageEvent) => void) | null = null
let mockReadyState = 0

const mockClose = vi.fn(() => {
   mockReadyState = 3
   mockOnClose?.(new CloseEvent('close'))
})

function MockWebSocketConstructor(this: Record<string, unknown>, url: string) {
   this.url = url
   this.send = mockSend
   this.close = mockClose

   Object.defineProperty(this, 'readyState', {
      get: () => mockReadyState,
      set: (val: number) => {
         mockReadyState = val
      },
   })
   Object.defineProperty(this, 'onopen', {
      get: () => mockOnOpen,
      set: (fn: ((ev: Event) => void) | null) => {
         mockOnOpen = fn
      },
   })
   Object.defineProperty(this, 'onclose', {
      get: () => mockOnClose,
      set: (fn: ((ev: CloseEvent) => void) | null) => {
         mockOnClose = fn
      },
   })
   Object.defineProperty(this, 'onerror', {
      get: () => mockOnError,
      set: (fn: ((ev: Event) => void) | null) => {
         mockOnError = fn
      },
   })
   Object.defineProperty(this, 'onmessage', {
      get: () => mockOnMessage,
      set: (fn: ((ev: MessageEvent) => void) | null) => {
         mockOnMessage = fn
      },
   })
}

MockWebSocketConstructor.prototype = {}

Object.defineProperty(MockWebSocketConstructor, 'OPEN', {
   value: 1,
   writable: false,
})
Object.defineProperty(MockWebSocketConstructor, 'CLOSED', {
   value: 3,
   writable: false,
})
Object.defineProperty(MockWebSocketConstructor, 'CONNECTING', {
   value: 0,
   writable: false,
})

vi.stubGlobal('WebSocket', MockWebSocketConstructor)

describe('WebSocketService', () => {
   let service: WebSocketService
   let onMessage: ReturnType<typeof vi.fn<(data: WebSocketMessage) => void>>
   let onConnect: ReturnType<typeof vi.fn<() => void>>
   let onDisconnect: ReturnType<typeof vi.fn<() => void>>

   beforeEach(() => {
      vi.clearAllMocks()
      vi.useFakeTimers()

      onMessage = vi.fn<(data: WebSocketMessage) => void>()
      onConnect = vi.fn<() => void>()
      onDisconnect = vi.fn<() => void>()

      mockReadyState = 0
      mockOnOpen = null
      mockOnClose = null
      mockOnError = null
      mockOnMessage = null
      mockSend.mockClear()
      mockClose.mockImplementation(() => {
         mockReadyState = 3
         mockOnClose?.(new CloseEvent('close'))
      })

      vi.spyOn(console, 'log').mockImplementation(() => {})
      vi.spyOn(console, 'error').mockImplementation(() => {})
   })

   afterEach(() => {
      vi.restoreAllMocks()
      vi.useRealTimers()
   })

   describe('constructor', () => {
      it('should create a WebSocketService instance', () => {
         service = new WebSocketService(
            'ws://test.com',
            onMessage,
            onConnect,
            onDisconnect,
         )
         expect(service).toBeInstanceOf(WebSocketService)
      })
   })

   describe('connect', () => {
      it('should create a WebSocket connection', () => {
         service = new WebSocketService('ws://test.com', onMessage)
         service.connect('BTC')
         expect(mockReadyState).toBe(0)
      })

      it('should send symbol message on connection open', () => {
         service = new WebSocketService('ws://test.com', onMessage)
         service.connect('BTC')

         mockReadyState = 1
         mockOnOpen?.(new Event('open'))

         expect(mockSend).toHaveBeenCalledWith(
            JSON.stringify({
               type: 'set_symbol',
               symbol: 'BTC',
            }),
         )
      })

      it('should call onConnect callback when connected', () => {
         service = new WebSocketService('ws://test.com', onMessage, onConnect)
         service.connect('BTC')

         mockReadyState = 1
         mockOnOpen?.(new Event('open'))

         expect(onConnect).toHaveBeenCalled()
      })

      it('should convert symbol to uppercase when sending', () => {
         service = new WebSocketService('ws://test.com', onMessage)
         service.connect('btc')

         mockReadyState = 1
         mockOnOpen?.(new Event('open'))

         expect(mockSend).toHaveBeenCalledWith(
            JSON.stringify({
               type: 'set_symbol',
               symbol: 'BTC',
            }),
         )
      })
   })

   describe('message handling', () => {
      it('should call onMessage for order_book messages', () => {
         service = new WebSocketService('ws://test.com', onMessage)
         service.connect('BTC')

         const testData: WebSocketMessage = {
            type: 'order_book',
            symbol: 'BTC',
            data: {
               bids: [{ price: 50000, amount: 1 }],
               asks: [{ price: 51000, amount: 1.5 }],
            },
         }

         mockOnMessage?.({
            data: JSON.stringify(testData),
         } as MessageEvent)

         expect(onMessage).toHaveBeenCalledWith(testData)
      })

      it('should not call onMessage for non-order_book messages', () => {
         service = new WebSocketService('ws://test.com', onMessage)
         service.connect('BTC')

         mockOnMessage?.({
            data: JSON.stringify({ type: 'other', data: {} }),
         } as MessageEvent)

         expect(onMessage).not.toHaveBeenCalled()
      })

      it('should handle invalid JSON gracefully', () => {
         service = new WebSocketService('ws://test.com', onMessage)
         service.connect('BTC')

         expect(() => {
            mockOnMessage?.({
               data: 'invalid json',
            } as MessageEvent)
         }).not.toThrow()

         expect(onMessage).not.toHaveBeenCalled()
      })
   })

   describe('disconnect', () => {
      it('should close WebSocket connection', () => {
         service = new WebSocketService('ws://test.com', onMessage)
         service.connect('BTC')

         service.disconnect()

         expect(mockClose).toHaveBeenCalled()
      })
   })

   describe('onDisconnect callback', () => {
      it('should call onDisconnect when connection closes', () => {
         service = new WebSocketService(
            'ws://test.com',
            onMessage,
            undefined,
            onDisconnect,
         )

         service.connect('BTC')
         mockOnClose?.(new CloseEvent('close'))

         expect(onDisconnect).toHaveBeenCalled()
      })
   })
})
