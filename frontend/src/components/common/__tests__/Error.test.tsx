import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Error } from '../Error'

describe('Error', () => {
   it('renders error title', () => {
      render(<Error />)

      expect(screen.getByText('Failed to load coins')).toBeInTheDocument()
   })

   it('renders error description', () => {
      render(<Error />)

      expect(screen.getByText('Please try again later')).toBeInTheDocument()
   })

   it('renders error icon', () => {
      const { container } = render(<Error />)

      const icon = container.querySelector('svg')
      expect(icon).toBeInTheDocument()
   })

   it('icon has destructive color class', () => {
      const { container } = render(<Error />)

      const icon = container.querySelector('svg')
      expect(icon).toHaveClass('text-destructive')
   })

   it('has destructive styling', () => {
      const { container } = render(<Error />)

      const card = container.firstChild as HTMLElement

      expect(card).toHaveClass('border-destructive/50')
      expect(card).toHaveClass('bg-destructive/5')
   })

   it('renders two paragraphs', () => {
      const { container } = render(<Error />)

      const paragraphs = container.querySelectorAll('p')
      expect(paragraphs).toHaveLength(2)
   })
})
