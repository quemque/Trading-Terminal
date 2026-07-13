import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Loading from '../Loading'

describe('Loading', () => {
   it('renders loading message', () => {
      render(<Loading message="Loading coin list..." />)

      expect(screen.getByText('Loading coin list...')).toBeInTheDocument()
   })

   it('renders different messages', () => {
      render(<Loading message="Connecting to order book..." />)

      expect(
         screen.getByText('Connecting to order book...'),
      ).toBeInTheDocument()
   })

   it('renders spinner', () => {
      const { container } = render(<Loading message="Loading..." />)

      const spinner = container.querySelector('.animate-spin')
      expect(spinner).toBeInTheDocument()
   })

   it('has correct container styles', () => {
      const { container } = render(<Loading message="Loading..." />)

      const wrapper = container.firstChild as HTMLElement
      expect(wrapper).toHaveClass('h-64')
      expect(wrapper).toHaveClass('flex')
      expect(wrapper).toHaveClass('items-center')
      expect(wrapper).toHaveClass('justify-center')
   })
})
