import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DaysSelector } from '../DaysSelector'

vi.mock('../../../../config/days-options', () => ({
   DAYS_OPTIONS: [1, 7, 30, 90],
}))

describe('DaysSelector', () => {
   it('renders all day options', () => {
      render(<DaysSelector days={7} onDaysChange={() => {}} />)
      expect(screen.getByText('1d')).toBeInTheDocument()
      expect(screen.getByText('7d')).toBeInTheDocument()
      expect(screen.getByText('30d')).toBeInTheDocument()
      expect(screen.getByText('90d')).toBeInTheDocument()
   })

   it('calls onDaysChange when clicked', async () => {
      const onDaysChange = vi.fn()
      render(<DaysSelector days={7} onDaysChange={onDaysChange} />)

      await userEvent.click(screen.getByText('30d'))
      expect(onDaysChange).toHaveBeenCalledWith(30)
   })

   it('active day has background class', () => {
      render(<DaysSelector days={30} onDaysChange={() => {}} />)

      const activeButton = screen.getByText('30d').closest('button')
      expect(activeButton).toHaveClass('bg-background')
      expect(activeButton).toHaveClass('font-semibold')
   })

   it('inactive day has ghost variant style', () => {
      render(<DaysSelector days={7} onDaysChange={() => {}} />)

      const inactiveButton = screen.getByText('90d').closest('button')
      expect(inactiveButton).toHaveClass('text-muted-foreground')
   })

   it('calls onDaysChange for each option', async () => {
      const onDaysChange = vi.fn()
      render(<DaysSelector days={7} onDaysChange={onDaysChange} />)

      await userEvent.click(screen.getByText('1d'))
      expect(onDaysChange).toHaveBeenCalledWith(1)
   })

   it('renders correct number of buttons', () => {
      render(<DaysSelector days={7} onDaysChange={() => {}} />)
      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(4)
   })
})
