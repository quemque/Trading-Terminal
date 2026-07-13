import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { OrderHeader } from '../OrderHeader'

describe('OrderHeader', () => {
   it('renders title', () => {
      render(<OrderHeader />)
      expect(screen.getByText('Order Book')).toBeInTheDocument()
   })

   it('renders Live badge', () => {
      render(<OrderHeader />)
      expect(screen.getByText('Live')).toBeInTheDocument()
   })

   it('renders as header element', () => {
      render(<OrderHeader />)
      const title = screen.getByText('Order Book')
      expect(title.closest('header')).toBeInTheDocument()
   })

   it('has ping animation element', () => {
      const { container } = render(<OrderHeader />)
      const ping = container.querySelector('.animate-ping')
      expect(ping).toBeInTheDocument()
   })

   it('has green dot indicator', () => {
      const { container } = render(<OrderHeader />)
      const dot = container.querySelector('.bg-green-500')
      expect(dot).toBeInTheDocument()
   })
})
