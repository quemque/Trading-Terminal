import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SpreadInfo } from '../SpreadInfo'

describe('SpreadInfo', () => {
   it('renders best bid', () => {
      render(<SpreadInfo bestBid={50000} bestAsk={50100} />)
      expect(screen.getByText('$50000.00')).toBeInTheDocument()
   })

   it('renders best ask', () => {
      render(<SpreadInfo bestBid={50000} bestAsk={50100} />)
      expect(screen.getByText('$50100.00')).toBeInTheDocument()
   })

   it('renders spread value', () => {
      render(<SpreadInfo bestBid={50000} bestAsk={50100} />)
      expect(screen.getByText('$100.00')).toBeInTheDocument()
   })

   it('renders labels', () => {
      render(<SpreadInfo bestBid={50000} bestAsk={50100} />)
      expect(screen.getByText(/Best Bid:/)).toBeInTheDocument()
      expect(screen.getByText(/Spread:/)).toBeInTheDocument()
      expect(screen.getByText(/Best Ask:/)).toBeInTheDocument()
   })

   it('calculates spread correctly', () => {
      render(<SpreadInfo bestBid={100} bestAsk={150} />)
      expect(screen.getByText('$50.00')).toBeInTheDocument()
   })

   it('renders separator', () => {
      render(<SpreadInfo bestBid={50000} bestAsk={50100} />)
      const separator = document.querySelector('[role="separator"]')
      expect(separator).toBeInTheDocument()
   })

   it('has correct color classes', () => {
      render(<SpreadInfo bestBid={50000} bestAsk={50100} />)
      const bidPrice = screen.getByText('$50000.00')
      const askPrice = screen.getByText('$50100.00')

      expect(bidPrice).toHaveClass('text-green-500')
      expect(askPrice).toHaveClass('text-red-500')
   })
})
