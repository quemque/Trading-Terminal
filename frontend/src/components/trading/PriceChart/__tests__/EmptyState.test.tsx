import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EmptyState } from '../EmptyState'

describe('EmptyState', () => {
   it('renders no data message', () => {
      render(<EmptyState symbol="BTC" />)
      expect(screen.getByText('No data available')).toBeInTheDocument()
   })

   it('renders symbol in message', () => {
      render(<EmptyState symbol="ETH" />)
      expect(
         screen.getByText('No price history found for ETH'),
      ).toBeInTheDocument()
   })

   it('renders different symbol', () => {
      render(<EmptyState symbol="SOL" />)
      expect(
         screen.getByText('No price history found for SOL'),
      ).toBeInTheDocument()
   })

   it('renders BarChart3 icon', () => {
      const { container } = render(<EmptyState symbol="BTC" />)
      const icon = container.querySelector('svg')
      expect(icon).toBeInTheDocument()
   })

   it('has correct height', () => {
      const { container } = render(<EmptyState symbol="BTC" />)
      const cardContent = container.firstChild?.firstChild as HTMLElement
      expect(cardContent).toHaveClass('h-[450px]')
   })

   it('centers content vertically', () => {
      const { container } = render(<EmptyState symbol="BTC" />)
      const cardContent = container.firstChild?.firstChild as HTMLElement
      expect(cardContent).toHaveClass('flex')
      expect(cardContent).toHaveClass('items-center')
      expect(cardContent).toHaveClass('justify-center')
   })
})
