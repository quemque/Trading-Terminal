import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { NotFound } from '../NotFound'

function renderWithRouter(ui: React.ReactElement) {
   return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('NotFound', () => {
   it('renders 404 title', () => {
      renderWithRouter(<NotFound />)
      expect(screen.getByText('404')).toBeInTheDocument()
   })

   it('renders Oops message', () => {
      renderWithRouter(<NotFound />)
      expect(screen.getByText('Oops! Page not found')).toBeInTheDocument()
   })

   it('renders description', () => {
      renderWithRouter(<NotFound />)
      expect(
         screen.getByText('The page you are looking for does not exist.'),
      ).toBeInTheDocument()
   })

   it('renders Go Home link', () => {
      renderWithRouter(<NotFound />)
      const link = screen.getByText('Go Home')
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/')
   })

   it('has 70vh height', () => {
      const { container } = renderWithRouter(<NotFound />)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper).toHaveClass('h-[70vh]')
   })

   it('centers content', () => {
      const { container } = renderWithRouter(<NotFound />)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper).toHaveClass('flex')
      expect(wrapper).toHaveClass('items-center')
      expect(wrapper).toHaveClass('justify-center')
   })

   it('link has correct styles', () => {
      renderWithRouter(<NotFound />)
      const link = screen.getByText('Go Home')
      expect(link).toHaveClass('bg-orange-500')
      expect(link).toHaveClass('text-white')
      expect(link).toHaveClass('rounded-lg')
   })
})
