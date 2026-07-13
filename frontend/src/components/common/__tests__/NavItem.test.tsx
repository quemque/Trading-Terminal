import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NavItem from '../NavItem'

function renderWithRouter(ui: React.ReactElement) {
   return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('NavItem', () => {
   it('renders ActiveNavLabel when isActive is true', () => {
      renderWithRouter(
         <NavItem to="/trading" label="Trading" isActive={true} />,
      )

      const label = screen.getByText('Trading')

      expect(label.tagName).toBe('SPAN')
      expect(label).toHaveClass('bg-accent')
   })

   it('renders NavLink when isActive is false', () => {
      renderWithRouter(
         <NavItem to="/trading" label="Trading" isActive={false} />,
      )

      const label = screen.getByText('Trading')

      expect(label.tagName).toBe('A')
      expect(label).toHaveAttribute('href', '/trading')
   })

   it('shows different label text', () => {
      renderWithRouter(
         <NavItem to="/dashboard" label="Dashboard" isActive={false} />,
      )

      expect(screen.getByText('Dashboard')).toBeInTheDocument()
   })

   it('inactive link has correct classes', () => {
      renderWithRouter(
         <NavItem to="/trading" label="Trading" isActive={false} />,
      )

      const link = screen.getByText('Trading')

      expect(link).toHaveClass('text-muted-foreground')
      expect(link).toHaveClass('hover:bg-accent')
   })

   it('active item has cursor-default', () => {
      renderWithRouter(
         <NavItem to="/trading" label="Trading" isActive={true} />,
      )

      const label = screen.getByText('Trading')

      expect(label).toHaveClass('cursor-default')
      expect(label).toHaveClass('select-none')
   })
})
