import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { initializeTheme } from './theme'

vi.mock('../store/ThemeStore', () => ({
   useThemeStore: {
      getState: vi.fn(),
   },
}))

import { useThemeStore } from '../store/ThemeStore'
import type { ThemeState } from '../types/theme'

const mockGetState = useThemeStore.getState as ReturnType<typeof vi.fn>

function createMockState(theme: ThemeState['theme']): ThemeState {
   return {
      theme,
      toggleTheme: vi.fn(),
   }
}

describe('initializeTheme', () => {
   beforeEach(() => {
      vi.clearAllMocks()
   })

   afterEach(() => {
      vi.restoreAllMocks()
   })

   it('should set data-theme attribute to dark when store has dark theme', () => {
      mockGetState.mockReturnValue(createMockState('dark'))
      const setAttributeSpy = vi.spyOn(document.documentElement, 'setAttribute')

      initializeTheme()

      expect(setAttributeSpy).toHaveBeenCalledWith('data-theme', 'dark')
   })

   it('should set data-theme attribute to light when store has light theme', () => {
      mockGetState.mockReturnValue(createMockState('light'))
      const setAttributeSpy = vi.spyOn(document.documentElement, 'setAttribute')

      initializeTheme()

      expect(setAttributeSpy).toHaveBeenCalledWith('data-theme', 'light')
   })

   it('should call getState to retrieve current theme', () => {
      mockGetState.mockReturnValue(createMockState('dark'))

      initializeTheme()

      expect(useThemeStore.getState).toHaveBeenCalledTimes(1)
   })

   it('should override existing data-theme attribute', () => {
      document.documentElement.setAttribute('data-theme', 'light')
      mockGetState.mockReturnValue(createMockState('dark'))
      const setAttributeSpy = vi.spyOn(document.documentElement, 'setAttribute')

      initializeTheme()

      expect(setAttributeSpy).toHaveBeenCalledWith('data-theme', 'dark')
   })
})
