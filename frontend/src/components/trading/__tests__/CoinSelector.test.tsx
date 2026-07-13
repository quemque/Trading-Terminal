import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const mockSetSymbol = vi.fn()
const mockSetWsSymbol = vi.fn()

interface MockCoin {
   id: string
   symbol: string
   name: string
}

const mockCoins: MockCoin[] = [
   { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
   { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
   { id: 'solana', symbol: 'SOL', name: 'Solana' },
]

const mockStore = {
   symbol: 'bitcoin',
   setSymbol: mockSetSymbol,
   setWsSymbol: mockSetWsSymbol,
}

const mockCoinList: {
   data: MockCoin[] | null
   isLoading: boolean
   error: Error | null
} = {
   data: mockCoins,
   isLoading: false,
   error: null,
}

vi.mock('../../../store/tradingStore', () => ({
   useTradingStore: () => mockStore,
}))

vi.mock('../../../hooks/useCoinList', () => ({
   useCoinList: () => mockCoinList,
}))

vi.mock('../../../config/default-const', () => ({
   DEFAULT_COINS: ['bitcoin', 'ethereum', 'solana'],
}))

vi.mock('../../common/Loading', () => ({
   default: ({ message }: { message: string }) => <div>{message}</div>,
}))

vi.mock('../../common/Error', () => ({
   Error: () => <div>Error loading coins</div>,
}))

import { CoinSelector } from '../CoinSelector'

describe('CoinSelector', () => {
   beforeEach(() => {
      vi.clearAllMocks()
      mockCoinList.isLoading = false
      mockCoinList.error = null
      mockCoinList.data = mockCoins
   })

   it('renders coin symbols', () => {
      render(<CoinSelector />)
      expect(screen.getByText('BTC')).toBeInTheDocument()
      expect(screen.getByText('ETH')).toBeInTheDocument()
      expect(screen.getByText('SOL')).toBeInTheDocument()
   })

   it('renders coin names', () => {
      render(<CoinSelector />)
      expect(screen.getByText('Bitcoin')).toBeInTheDocument()
      expect(screen.getByText('Ethereum')).toBeInTheDocument()
   })

   it('calls setSymbol and setWsSymbol on click', async () => {
      render(<CoinSelector />)
      await userEvent.click(screen.getByText('ETH'))
      expect(mockSetSymbol).toHaveBeenCalledWith('ethereum')
      expect(mockSetWsSymbol).toHaveBeenCalledWith('ETH')
   })

   it('active coin has default variant', () => {
      render(<CoinSelector />)
      const activeButton = screen.getByText('BTC').closest('button')
      expect(activeButton).toHaveClass('bg-primary')
   })

   it('inactive coin has outline variant', () => {
      render(<CoinSelector />)
      const inactiveButton = screen.getByText('ETH').closest('button')
      expect(inactiveButton).toHaveClass('border')
   })

   it('shows loading state', () => {
      mockCoinList.isLoading = true
      render(<CoinSelector />)
      expect(screen.getByText('Loading coin list...')).toBeInTheDocument()
   })

   it('shows error state', () => {
      mockCoinList.error = new Error('Failed')
      render(<CoinSelector />)
      expect(screen.getByText('Error loading coins')).toBeInTheDocument()
   })

   it('returns empty when no coins', () => {
      mockCoinList.data = null
      const { container } = render(<CoinSelector />)
      expect(container.innerHTML).toBe('')
   })

   it('renders limited number of coins', () => {
      const manyCoins: MockCoin[] = Array.from({ length: 15 }, (_, i) => ({
         id: `coin-${i}`,
         symbol: `C${i}`,
         name: `Coin ${i}`,
      }))
      mockCoinList.data = manyCoins
      render(<CoinSelector />)
      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(10)
   })
})
