import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('../../../../hooks/useOrderBook', () => ({
   useOrderBook: vi.fn(),
}))

vi.mock('../../../../store/tradingStore', () => ({
   useTradingStore: () => ({
      wsSymbol: 'BTC',
   }),
}))

vi.mock('../../../../config/websocket', () => ({
   WS_CONFIG: {
      ORDER_LIMIT: 10,
   },
}))

vi.mock('../OrderHeader', () => ({
   OrderHeader: () => <div>Order Book Header</div>,
}))

vi.mock('../OrderBookList', () => ({
   OrderBookList: () => <div>OrderBookList</div>,
}))

vi.mock('../SpreadInfo', () => ({
   SpreadInfo: () => <div>SpreadInfo</div>,
}))

vi.mock('../../../common/Loading', () => ({
   default: ({ message }: { message: string }) => <div>{message}</div>,
}))

import { OrderBook } from '../OrderBook'
import { useOrderBook } from '../../../../hooks/useOrderBook'

describe('OrderBook', () => {
   it('shows loading when not connected', () => {
      vi.mocked(useOrderBook).mockReturnValue({
         orderBook: { bids: [], asks: [] },
         isConnected: false,
      } as ReturnType<typeof useOrderBook>)

      render(<OrderBook />)

      expect(
         screen.getByText('Connecting to order book...'),
      ).toBeInTheDocument()
   })

   it('shows waiting message when no data', () => {
      vi.mocked(useOrderBook).mockReturnValue({
         orderBook: { bids: [], asks: [] },
         isConnected: true,
      } as ReturnType<typeof useOrderBook>)

      render(<OrderBook />)

      expect(screen.getByText('Waiting for data...')).toBeInTheDocument()
   })

   it('renders OrderHeader when data available', () => {
      vi.mocked(useOrderBook).mockReturnValue({
         orderBook: {
            bids: [{ price: 50000, amount: 1 }],
            asks: [{ price: 50100, amount: 2 }],
         },
         isConnected: true,
      } as ReturnType<typeof useOrderBook>)

      render(<OrderBook />)

      expect(screen.getByText('Order Book Header')).toBeInTheDocument()
   })

   it('renders SpreadInfo when bids and asks exist', () => {
      vi.mocked(useOrderBook).mockReturnValue({
         orderBook: {
            bids: [{ price: 50000, amount: 1 }],
            asks: [{ price: 50100, amount: 2 }],
         },
         isConnected: true,
      } as ReturnType<typeof useOrderBook>)

      render(<OrderBook />)

      expect(screen.getByText('SpreadInfo')).toBeInTheDocument()
   })

   it('does not render SpreadInfo when no bids', () => {
      vi.mocked(useOrderBook).mockReturnValue({
         orderBook: {
            bids: [],
            asks: [{ price: 50100, amount: 2 }],
         },
         isConnected: true,
      } as ReturnType<typeof useOrderBook>)

      render(<OrderBook />)

      expect(screen.queryByText('SpreadInfo')).not.toBeInTheDocument()
   })

   it('renders two OrderBookList components', () => {
      vi.mocked(useOrderBook).mockReturnValue({
         orderBook: {
            bids: [{ price: 50000, amount: 1 }],
            asks: [{ price: 50100, amount: 2 }],
         },
         isConnected: true,
      } as ReturnType<typeof useOrderBook>)

      render(<OrderBook />)

      const lists = screen.getAllByText('OrderBookList')
      expect(lists).toHaveLength(2)
   })
})
