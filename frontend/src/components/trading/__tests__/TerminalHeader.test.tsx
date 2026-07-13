import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

const mockSymbol = 'bitcoin'

vi.mock('../../../store/tradingStore', () => ({
   useTradingStore: () => ({
      symbol: mockSymbol,
   }),
}))

import { TerminalHeader } from '../TerminalHeader'

describe('TerminalHeader', () => {
   it('renders Trading Terminal title', () => {
      render(<TerminalHeader />)
      expect(screen.getByText('Trading Terminal')).toBeInTheDocument()
   })

   it('renders Live market data subtitle', () => {
      render(<TerminalHeader />)
      expect(screen.getByText('Live market data')).toBeInTheDocument()
   })

   it('renders symbol in uppercase', () => {
      render(<TerminalHeader />)
      expect(screen.getByText('BITCOIN')).toBeInTheDocument()
   })

   it('renders Zap icon', () => {
      const { container } = render(<TerminalHeader />)
      const icon = container.querySelector('svg')
      expect(icon).toBeInTheDocument()
   })

   it('renders live indicator dot', () => {
      const { container } = render(<TerminalHeader />)
      const dot = container.querySelector('.bg-green-500')
      expect(dot).toBeInTheDocument()
   })

   it('renders ping animation', () => {
      const { container } = render(<TerminalHeader />)
      const ping = container.querySelector('.animate-ping')
      expect(ping).toBeInTheDocument()
   })

   it('renders Separator', () => {
      render(<TerminalHeader />)
      const separator = document.querySelector('[role="separator"]')
      expect(separator).toBeInTheDocument()
   })

   it('renders Badge with symbol', () => {
      render(<TerminalHeader />)
      const badge = screen.getByText('BITCOIN')
      expect(badge).toBeInTheDocument()
   })

   it('title has gradient text class', () => {
      render(<TerminalHeader />)
      const title = screen.getByText('Trading Terminal')
      expect(title).toHaveClass('bg-clip-text')
   })
})
