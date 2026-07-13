import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { OrderBookList } from '../OrderBookList'
import type { OrderBookLevel } from '../../../../types/Order'

vi.mock('@/components/ui/scroll-area', () => ({
   ScrollArea: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="scroll-area">{children}</div>
   ),
}))

const mockBids: OrderBookLevel[] = [
   { price: 50000, amount: 1.5 },
   { price: 49900, amount: 2.0 },
]

const mockAsks: OrderBookLevel[] = [
   { price: 50100, amount: 1.0 },
   { price: 50200, amount: 3.0 },
]

describe('OrderBookList', () => {
   it('renders Bids badge for bid type', () => {
      render(<OrderBookList items={mockBids} type="bid" />)
      expect(screen.getByText('Bids')).toBeInTheDocument()
   })

   it('renders Asks badge for ask type', () => {
      render(<OrderBookList items={mockAsks} type="ask" />)
      expect(screen.getByText('Asks')).toBeInTheDocument()
   })

   it('renders Buy label for bids', () => {
      render(<OrderBookList items={mockBids} type="bid" />)
      expect(screen.getByText('Buy')).toBeInTheDocument()
   })

   it('renders Sell label for asks', () => {
      render(<OrderBookList items={mockAsks} type="ask" />)
      expect(screen.getByText('Sell')).toBeInTheDocument()
   })

   it('renders empty message when no items', () => {
      render(<OrderBookList items={[]} type="bid" />)
      expect(screen.getByText('No bids available')).toBeInTheDocument()
   })

   it('renders empty message for empty asks', () => {
      render(<OrderBookList items={[]} type="ask" />)
      expect(screen.getByText('No asks available')).toBeInTheDocument()
   })

   it('renders correct number of items', () => {
      render(<OrderBookList items={mockBids} type="bid" />)
      const items = screen
         .getAllByText(/^\$/)
         .filter((el) => el.closest('.space-y-1 > div'))
      expect(items).toHaveLength(2)
   })

   it('limits items by limit prop', () => {
      const manyItems = Array.from({ length: 20 }, (_, i) => ({
         price: 50000 - i,
         amount: 1,
      }))
      render(<OrderBookList items={manyItems} type="bid" limit={5} />)
      const prices = screen
         .getAllByText(/^\$/)
         .filter((el) => el.closest('.space-y-1 > div'))
      expect(prices).toHaveLength(5)
   })

   it('renders ScrollArea wrapper', () => {
      render(<OrderBookList items={mockBids} type="bid" />)
      expect(screen.getByTestId('scroll-area')).toBeInTheDocument()
   })
})
