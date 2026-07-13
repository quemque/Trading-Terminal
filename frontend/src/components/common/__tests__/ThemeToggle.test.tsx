import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ThemeToggle from '../ThemeToggle'

describe('ThemeToggle', () => {
   it('renders Sun icon when theme is dark', () => {
      const { container } = render(
         <ThemeToggle theme="dark" onToggle={() => {}} />,
      )

      const sunIcon = container.querySelector('.lucide-sun')
      expect(sunIcon).toBeInTheDocument()
   })

   it('renders Moon icon when theme is light', () => {
      const { container } = render(
         <ThemeToggle theme="light" onToggle={() => {}} />,
      )

      const moonIcon = container.querySelector('.lucide-moon')
      expect(moonIcon).toBeInTheDocument()
   })

   it('calls onToggle when clicked', async () => {
      const onToggle = vi.fn()

      render(<ThemeToggle theme="dark" onToggle={onToggle} />)

      const button = screen.getByRole('button')
      await userEvent.click(button)

      expect(onToggle).toHaveBeenCalledTimes(1)
   })

   it('has sr-only text for accessibility', () => {
      render(<ThemeToggle theme="dark" onToggle={() => {}} />)

      expect(screen.getByText('Toggle theme')).toBeInTheDocument()
   })

   it('has correct size classes', () => {
      render(<ThemeToggle theme="dark" onToggle={() => {}} />)

      const button = screen.getByRole('button')

      expect(button).toHaveClass('w-9')
      expect(button).toHaveClass('h-9')
      expect(button).toHaveClass('rounded-lg')
   })

   it('switches icon based on theme', () => {
      const { container, rerender } = render(
         <ThemeToggle theme="dark" onToggle={() => {}} />,
      )

      expect(container.querySelector('.lucide-sun')).toBeInTheDocument()

      rerender(<ThemeToggle theme="light" onToggle={() => {}} />)

      expect(container.querySelector('.lucide-moon')).toBeInTheDocument()
   })
})
