import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { OrderBookLevel } from '../OrderBookLevel'

describe('OrderBookLevel', () => {
   it('renders bid price with dollar sign', () => {
      render(<OrderBookLevel price={50000} amount={1.5} type="bid" />)
      expect(screen.getByText('$50000.00')).toBeInTheDocument()
   })

   it('renders ask price with dollar sign', () => {
      render(<OrderBookLevel price={50100} amount={2.0} type="ask" />)
      expect(screen.getByText('$50100.00')).toBeInTheDocument()
   })

   it('renders amount', () => {
      render(<OrderBookLevel price={50000} amount={1.5} type="bid" />)
      expect(screen.getByText('1.5000')).toBeInTheDocument()
   })

   it('bid has green color', () => {
      render(<OrderBookLevel price={50000} amount={1} type="bid" />)
      const price = screen.getByText('$50000.00')
      expect(price).toHaveClass('text-green-500')
   })

   it('ask has red color', () => {
      render(<OrderBookLevel price={50000} amount={1} type="ask" />)
      const price = screen.getByText('$50000.00')
      expect(price).toHaveClass('text-red-500')
   })

   it('renders with correct decimals', () => {
      render(<OrderBookLevel price={99.99} amount={0.1234} type="bid" />)
      expect(screen.getByText('$99.99')).toBeInTheDocument()
      expect(screen.getByText('0.1234')).toBeInTheDocument()
   })
})
