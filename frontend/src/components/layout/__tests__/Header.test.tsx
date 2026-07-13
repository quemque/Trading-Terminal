import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from '../Header'

vi.mock('../../../store/ThemeStore', () => ({
   useThemeStore: () => ({
      theme: 'dark',
      toggleTheme: vi.fn(),
   }),
}))

vi.mock('../../../config/nav-items', () => ({
   default: [
      { to: '/trading', label: 'Trading' },
      { to: '/history', label: 'History' },
   ],
}))

vi.mock('../../common/NavItem', () => ({
   default: ({ label }: { label: string }) => <span>{label}</span>,
}))

vi.mock('../../common/ThemeToggle', () => ({
   default: () => <button>Toggle theme</button>,
}))

function renderWithRouter(ui: React.ReactElement) {
   return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('Header', () => {
   beforeEach(() => {
      vi.clearAllMocks()
   })

   it('renders logo text', () => {
      renderWithRouter(<Header />)

      expect(screen.getByText('TradeTerminal')).toBeInTheDocument()
   })

   it('renders logo icon', () => {
      const { container } = renderWithRouter(<Header />)

      const icon = container.querySelector('svg')
      expect(icon).toBeInTheDocument()
   })

   it('renders nav items', () => {
      renderWithRouter(<Header />)

      expect(screen.getByText('Trading')).toBeInTheDocument()
      expect(screen.getByText('History')).toBeInTheDocument()
   })

   it('renders theme toggle', () => {
      renderWithRouter(<Header />)

      expect(screen.getByText('Toggle theme')).toBeInTheDocument()
   })

   it('logo is a link to home', () => {
      renderWithRouter(<Header />)

      const logoLink = screen.getByText('TradeTerminal').closest('a')
      expect(logoLink).toHaveAttribute('href', '/')
   })

   it('renders correct number of nav items', () => {
      const { container } = renderWithRouter(<Header />)

      const nav = container.querySelector('nav')
      const navItems = nav?.children
      expect(navItems).toHaveLength(2)
   })

   it('has header element', () => {
      const { container } = renderWithRouter(<Header />)

      const header = container.querySelector('header')
      expect(header).toBeInTheDocument()
   })

   it('header has sticky class', () => {
      const { container } = renderWithRouter(<Header />)

      const header = container.querySelector('header')
      expect(header).toHaveClass('sticky')
      expect(header).toHaveClass('top-0')
      expect(header).toHaveClass('z-50')
   })
})
