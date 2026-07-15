import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ChartHeader } from '../ChartHeader'

describe('ChartHeader', () => {
   it('renders symbol in uppercase', () => {
      render(<ChartHeader symbol="btc" days={30} price={50000} />)
      expect(screen.getByText('BTC')).toBeInTheDocument()
   })

   it('renders price with locale formatting', () => {
      render(<ChartHeader symbol="ETH" days={7} price={3000} />)

      const priceElement = document.querySelector('.tabular-nums')
      expect(priceElement).toBeInTheDocument()
      expect(priceElement?.textContent).toContain('$')

      const cleanPrice = priceElement?.textContent?.replace(/[\s,]/g, '')
      expect(cleanPrice).toBe('$3000')
   })

   it('renders days badge', () => {
      render(<ChartHeader symbol="SOL" days={90} price={100} />)
      expect(screen.getByText('90d')).toBeInTheDocument()
   })

   it('renders days description', () => {
      render(<ChartHeader symbol="BTC" days={30} price={50000} />)
      expect(screen.getByText(/Last 30 days price history/)).toBeInTheDocument()
   })

   it('does not render price change when undefined', () => {
      render(<ChartHeader symbol="BTC" days={30} price={50000} />)
      expect(screen.queryByText(/%/)).not.toBeInTheDocument()
   })

   it('renders positive price change', () => {
      render(
         <ChartHeader
            symbol="BTC"
            days={30}
            price={50000}
            priceChange={5.25}
         />,
      )
      expect(screen.getByText('+5.25%')).toBeInTheDocument()
   })

   it('renders negative price change', () => {
      render(
         <ChartHeader
            symbol="BTC"
            days={30}
            price={50000}
            priceChange={-3.5}
         />,
      )
      expect(screen.getByText('-3.50%')).toBeInTheDocument()
   })

   it('renders zero price change', () => {
      render(
         <ChartHeader
            symbol="BTC"
            days={30}
            price={50000}
            priceChange={0.01}
         />,
      )
      expect(screen.getByText('+0.01%')).toBeInTheDocument()
   })

   it('renders Separator', () => {
      render(<ChartHeader symbol="BTC" days={30} price={50000} />)
      const separator = document.querySelector('[role="separator"]')
      expect(separator).toBeInTheDocument()
   })

   it('positive change has green color', () => {
      render(
         <ChartHeader symbol="BTC" days={30} price={50000} priceChange={2} />,
      )
      const changeText = screen.getByText('+2.00%')
      expect(changeText.parentElement).toHaveClass('text-green-500')
   })

   it('negative change has red color', () => {
      render(
         <ChartHeader symbol="BTC" days={30} price={50000} priceChange={-2} />,
      )
      const changeText = screen.getByText('-2.00%')
      expect(changeText.parentElement).toHaveClass('text-red-500')
   })

   it('renders badge with outline variant', () => {
      render(<ChartHeader symbol="BTC" days={30} price={50000} />)
      expect(screen.getByText('30d')).toBeInTheDocument()
   })
})
