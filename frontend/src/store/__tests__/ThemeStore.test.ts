import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { useThemeStore } from '../ThemeStore'
import { act } from '@testing-library/react'

describe('useThemeStore', () => {
   beforeEach(() => {
      useThemeStore.setState({ theme: 'dark' })

      localStorage.clear()
   })

   afterEach(() => {
      vi.restoreAllMocks()
   })

   it('should initialize with dark theme', () => {
      const { theme } = useThemeStore.getState()
      expect(theme).toBe('dark')
   })

   it('should toggle theme from dark to light', () => {
      const { toggleTheme } = useThemeStore.getState()

      act(() => {
         toggleTheme()
      })

      const { theme } = useThemeStore.getState()
      expect(theme).toBe('light')
   })

   it('should toggle theme from light to dark', () => {
      useThemeStore.setState({ theme: 'light' })

      const { toggleTheme } = useThemeStore.getState()

      act(() => {
         toggleTheme()
      })

      const { theme } = useThemeStore.getState()
      expect(theme).toBe('dark')
   })

   it('should update document data-theme attribute when toggling to light', () => {
      const setAttributeSpy = vi.spyOn(document.documentElement, 'setAttribute')
      const { toggleTheme } = useThemeStore.getState()

      act(() => {
         toggleTheme()
      })

      expect(setAttributeSpy).toHaveBeenCalledWith('data-theme', 'light')
   })

   it('should update document data-theme attribute when toggling to dark', () => {
      useThemeStore.setState({ theme: 'light' })

      const setAttributeSpy = vi.spyOn(document.documentElement, 'setAttribute')
      const { toggleTheme } = useThemeStore.getState()

      act(() => {
         toggleTheme()
      })

      expect(setAttributeSpy).toHaveBeenCalledWith('data-theme', 'dark')
   })

   it('should persist theme preference to localStorage', () => {
      const { toggleTheme } = useThemeStore.getState()

      act(() => {
         toggleTheme()
      })

      const persistedState = JSON.parse(
         localStorage.getItem('theme-storage') || '{}',
      )
      expect(persistedState.state.theme).toBe('light')
   })

   it('should handle multiple toggles correctly', () => {
      const { toggleTheme } = useThemeStore.getState()

      act(() => {
         toggleTheme()
      })

      expect(useThemeStore.getState().theme).toBe('light')

      act(() => {
         toggleTheme()
      })

      expect(useThemeStore.getState().theme).toBe('dark')

      act(() => {
         toggleTheme()
      })

      expect(useThemeStore.getState().theme).toBe('light')
   })

   it('should call setAttribute with correct value each toggle', () => {
      const setAttributeSpy = vi.spyOn(document.documentElement, 'setAttribute')
      const { toggleTheme } = useThemeStore.getState()

      act(() => {
         toggleTheme()
      })

      expect(setAttributeSpy).toHaveBeenCalledTimes(1)
      expect(setAttributeSpy).toHaveBeenCalledWith('data-theme', 'light')

      act(() => {
         toggleTheme()
      })

      expect(setAttributeSpy).toHaveBeenCalledTimes(2)
      expect(setAttributeSpy).toHaveBeenLastCalledWith('data-theme', 'dark')
   })
})
