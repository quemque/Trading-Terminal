import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ActiveNavLabel } from '../ActiveNavLabel'

describe('ActiveNavLabel', () => {
   it('renders label text', () => {
      render(<ActiveNavLabel label="Trading" />)

      expect(screen.getByText('Trading')).toBeInTheDocument()
   })

   it('renders different labels', () => {
      render(<ActiveNavLabel label="Dashboard" />)

      expect(screen.getByText('Dashboard')).toBeInTheDocument()
   })

   it('has correct default classes', () => {
      render(<ActiveNavLabel label="Home" />)

      const label = screen.getByText('Home')

      expect(label).toHaveClass('px-4')
      expect(label).toHaveClass('py-2')
      expect(label).toHaveClass('rounded-lg')
      expect(label).toHaveClass('text-sm')
      expect(label).toHaveClass('font-medium')
      expect(label).toHaveClass('bg-accent')
      expect(label).toHaveClass('text-accent-foreground')
      expect(label).toHaveClass('shadow-sm')
      expect(label).toHaveClass('cursor-default')
      expect(label).toHaveClass('select-none')
   })

   it('applies custom className', () => {
      render(
         <ActiveNavLabel label="Custom" className="extra-class my-custom" />,
      )

      const label = screen.getByText('Custom')

      expect(label).toHaveClass('extra-class')
      expect(label).toHaveClass('my-custom')
   })

   it('renders as span element', () => {
      render(<ActiveNavLabel label="Home" />)

      const label = screen.getByText('Home')

      expect(label.tagName).toBe('SPAN')
   })

   it('combines default and custom classes', () => {
      render(<ActiveNavLabel label="Both" className="custom-class" />)

      const label = screen.getByText('Both')
      expect(label).toHaveClass('bg-accent')
      expect(label).toHaveClass('custom-class')
   })
})
