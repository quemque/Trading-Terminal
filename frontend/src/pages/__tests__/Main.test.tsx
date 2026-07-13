import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import Main from '../Main'

vi.mock('lucide-react', async () => {
   const actual = await vi.importActual('lucide-react')
   return actual
})

vi.mock('../../store/tradingStore', () => ({
   useTradingStore: vi.fn(() => ({
      symbol: 'bitcoin',
      setSymbol: vi.fn(),
      setWsSymbol: vi.fn(),
      wsSymbol: 'BTC',
      days: 30,
      setDays: vi.fn(),
      historyData: null,
      isLoading: false,
   })),
}))

vi.mock('../../../store/ThemeStore', () => ({
   useThemeStore: vi.fn(() => ({
      theme: 'dark',
   })),
}))

vi.mock('../../hooks/useTradingData', () => ({
   useTradingData: vi.fn(),
}))

vi.mock('../../hooks/useCoinHistory', () => ({
   useBitcoinHistory: vi.fn(() => ({
      data: null,
      isLoading: false,
   })),
}))

vi.mock('../../hooks/useCoinList', () => ({
   useCoinList: vi.fn(() => ({
      data: [],
      isLoading: true,
      error: null,
   })),
}))

vi.mock('../../hooks/useOrderBook', () => ({
   useOrderBook: vi.fn(() => ({
      orderBook: { bids: [], asks: [] },
      isConnected: false,
   })),
}))

vi.mock('../../hooks/useChart', () => ({
   useChart: vi.fn(() => ({
      chartRef: { current: null },
      seriesRef: { current: null },
   })),
}))

vi.mock('@/lib/utils', () => ({
   cn: (...inputs: unknown[]) => inputs.filter(Boolean).join(' '),
}))

vi.mock('@/components/ui/button', () => ({
   Button: React.forwardRef<
      HTMLButtonElement,
      React.ButtonHTMLAttributes<HTMLButtonElement>
   >(({ children, className, ...props }, ref) => (
      <button ref={ref} className={className} {...props}>
         {children}
      </button>
   )),
}))

vi.mock('@/components/ui/badge', () => ({
   Badge: React.forwardRef<
      HTMLSpanElement,
      React.HTMLAttributes<HTMLSpanElement>
   >(({ children, className, ...props }, ref) => (
      <span ref={ref} className={className} {...props}>
         {children}
      </span>
   )),
}))

vi.mock('@/components/ui/separator', () => ({
   Separator: React.forwardRef<
      HTMLDivElement,
      React.HTMLAttributes<HTMLDivElement>
   >((props, ref) => <div ref={ref} {...props} />),
}))

vi.mock('@/components/ui/card', () => ({
   Card: React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
      ({ children, ...props }, ref) => (
         <div ref={ref} {...props}>
            {children}
         </div>
      ),
   ),
   CardContent: React.forwardRef<
      HTMLDivElement,
      React.HTMLAttributes<HTMLDivElement>
   >(({ children, ...props }, ref) => (
      <div ref={ref} {...props}>
         {children}
      </div>
   )),
}))

vi.mock('../../common/Loading', () => ({
   default: ({ message }: { message: string }) => <div>{message}</div>,
}))

vi.mock('../../common/Error', () => ({
   Error: () => <div>Error</div>,
}))

vi.mock('../common/Loading', () => ({
   default: ({ message }: { message: string }) => <div>{message}</div>,
}))

vi.mock('../common/Error', () => ({
   Error: () => <div>Error</div>,
}))

vi.mock('../../../utils/chartDataTransformer', () => ({
   transformToChartData: vi.fn(() => []),
}))

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         retry: false,
      },
   },
})

function renderWithProviders(component: React.ReactElement) {
   return render(
      <QueryClientProvider client={queryClient}>
         {component}
      </QueryClientProvider>,
   )
}

describe('Main', () => {
   beforeEach(() => {
      queryClient.clear()
      vi.clearAllMocks()
   })

   it('renders TerminalHeader with Trading Terminal text', () => {
      renderWithProviders(<Main />)
      expect(screen.getByText('Trading Terminal')).toBeInTheDocument()
   })

   it('renders CoinSelector with loading state', () => {
      renderWithProviders(<Main />)
      expect(screen.getByText('Loading coin list...')).toBeInTheDocument()
   })

   it('renders PriceChart with empty state', () => {
      renderWithProviders(<Main />)
      expect(screen.getByText('No data available')).toBeInTheDocument()
   })

   it('renders OrderBook with connecting state', () => {
      renderWithProviders(<Main />)
      expect(
         screen.getByText('Connecting to order book...'),
      ).toBeInTheDocument()
   })

   it('renders grid layout', () => {
      const { container } = renderWithProviders(<Main />)
      const grid = container.querySelector('.grid')
      expect(grid).toBeInTheDocument()
   })

   it('renders main container with correct classes', () => {
      const { container } = renderWithProviders(<Main />)
      const mainContainer = container.querySelector('.max-w-6xl')
      expect(mainContainer).toBeInTheDocument()
   })
})
