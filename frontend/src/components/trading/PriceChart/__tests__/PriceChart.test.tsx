import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

const mockStore = {
   symbol: 'bitcoin',
   days: 30,
   setDays: vi.fn(),
   setSymbol: vi.fn(),
   setWsSymbol: vi.fn(),
   historyData: null as { prices: { price: number; time: number }[] } | null,
   isLoading: false,
}

vi.mock('../../../../store/tradingStore', () => ({
   useTradingStore: () => mockStore,
}))

vi.mock('../../../../store/ThemeStore', () => ({
   useThemeStore: () => ({
      theme: 'dark',
      toggleTheme: vi.fn(),
   }),
}))

vi.mock('../../../../hooks/useChart', () => ({
   useChart: () => ({
      chartRef: { current: null },
      seriesRef: { current: null },
   }),
}))

vi.mock('../../../../utils/chartDataTransformer', () => ({
   transformToChartData: () => [],
}))

vi.mock('../ChartHeader', () => ({
   ChartHeader: () => <div>ChartHeader</div>,
}))

vi.mock('../DaysSelector', () => ({
   DaysSelector: () => <div>DaysSelector</div>,
}))

vi.mock('../EmptyState', () => ({
   EmptyState: () => <div>EmptyState</div>,
}))

vi.mock('../../../common/Loading', () => ({
   default: ({ message }: { message: string }) => <div>{message}</div>,
}))

import { PriceChart } from '../PriceChart'

describe('PriceChart', () => {
   beforeEach(() => {
      mockStore.isLoading = false
      mockStore.historyData = null
   })

   it('shows loading when isLoading is true', () => {
      mockStore.isLoading = true
      render(<PriceChart />)
      expect(screen.getByText('Loading price...')).toBeInTheDocument()
   })

   it('shows EmptyState when no history data', () => {
      mockStore.historyData = null
      render(<PriceChart />)
      expect(screen.getByText('EmptyState')).toBeInTheDocument()
   })

   it('shows EmptyState when prices array is empty', () => {
      mockStore.historyData = { prices: [] }
      render(<PriceChart />)
      expect(screen.getByText('EmptyState')).toBeInTheDocument()
   })

   it('renders ChartHeader when data available', () => {
      mockStore.historyData = {
         prices: [{ price: 50000, time: 1700000000 }],
      }
      render(<PriceChart />)
      expect(screen.getByText('ChartHeader')).toBeInTheDocument()
   })

   it('renders DaysSelector when data available', () => {
      mockStore.historyData = {
         prices: [{ price: 50000, time: 1700000000 }],
      }
      render(<PriceChart />)
      expect(screen.getByText('DaysSelector')).toBeInTheDocument()
   })

   it('renders chart container div', () => {
      mockStore.historyData = {
         prices: [{ price: 50000, time: 1700000000 }],
      }
      const { container } = render(<PriceChart />)
      const chartDiv = container.querySelector('.h-\\[450px\\]')
      expect(chartDiv).toBeInTheDocument()
   })
})
