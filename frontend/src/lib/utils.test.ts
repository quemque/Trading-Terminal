import { describe, it, expect, vi, beforeEach } from 'vitest'
import { cn } from './utils'

vi.mock('clsx', () => ({
   clsx: vi.fn(),
   default: vi.fn(),
}))

vi.mock('tailwind-merge', () => ({
   twMerge: vi.fn(),
}))

import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const mockClsx = clsx as unknown as ReturnType<typeof vi.fn>
const mockTwMerge = twMerge as unknown as ReturnType<typeof vi.fn>

describe('cn', () => {
   beforeEach(() => {
      vi.clearAllMocks()
   })

   it('should merge class names using clsx and twMerge', () => {
      mockClsx.mockReturnValue('class1 class2')
      mockTwMerge.mockReturnValue('class1 class2')

      const result = cn('class1', 'class2')

      expect(clsx).toHaveBeenCalledWith(['class1', 'class2'])
      expect(twMerge).toHaveBeenCalledWith('class1 class2')
      expect(result).toBe('class1 class2')
   })

   it('should handle single class name', () => {
      mockClsx.mockReturnValue('single-class')
      mockTwMerge.mockReturnValue('single-class')

      const result = cn('single-class')

      expect(clsx).toHaveBeenCalledWith(['single-class'])
      expect(result).toBe('single-class')
   })

   it('should handle conditional classes', () => {
      const isActive = false
      mockClsx.mockReturnValue('base active')
      mockTwMerge.mockReturnValue('base active')

      const result = cn('base', isActive && 'hidden', 'active')

      expect(clsx).toHaveBeenCalledWith(['base', false, 'active'])
      expect(result).toBe('base active')
   })

   it('should handle undefined values', () => {
      mockClsx.mockReturnValue('valid')
      mockTwMerge.mockReturnValue('valid')

      const result = cn('valid', undefined)

      expect(clsx).toHaveBeenCalledWith(['valid', undefined])
      expect(result).toBe('valid')
   })

   it('should handle empty input', () => {
      mockClsx.mockReturnValue('')
      mockTwMerge.mockReturnValue('')

      const result = cn()

      expect(clsx).toHaveBeenCalledWith([])
      expect(result).toBe('')
   })

   it('should resolve conflicting tailwind classes through twMerge', () => {
      mockClsx.mockReturnValue('p-4 p-6')
      mockTwMerge.mockReturnValue('p-6')

      const result = cn('p-4', 'p-6')

      expect(clsx).toHaveBeenCalledWith(['p-4', 'p-6'])
      expect(twMerge).toHaveBeenCalledWith('p-4 p-6')
      expect(result).toBe('p-6')
   })

   it('should handle object syntax for conditional classes', () => {
      mockClsx.mockReturnValue('base active')
      mockTwMerge.mockReturnValue('base active')

      const result = cn('base', { active: true, disabled: false })

      expect(clsx).toHaveBeenCalledWith([
         'base',
         { active: true, disabled: false },
      ])
      expect(result).toBe('base active')
   })

   it('should handle array of classes', () => {
      mockClsx.mockReturnValue('a b c')
      mockTwMerge.mockReturnValue('a b c')

      const result = cn(['a', 'b'], 'c')

      expect(clsx).toHaveBeenCalledWith([['a', 'b'], 'c'])
      expect(result).toBe('a b c')
   })

   it('should handle null values gracefully', () => {
      mockClsx.mockReturnValue('class')
      mockTwMerge.mockReturnValue('class')

      const result = cn('class', null)

      expect(clsx).toHaveBeenCalledWith(['class', null])
      expect(result).toBe('class')
   })
})
