import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ThemeState } from '../types/theme'

export const useThemeStore = create<ThemeState>()(
   persist(
      (set) => ({
         theme: 'dark',

         toggleTheme: () =>
            set((state) => {
               const newTheme = state.theme === 'light' ? 'dark' : 'light'
               document.documentElement.setAttribute('data-theme', newTheme)
               return { theme: newTheme }
            }),
      }),
      {
         name: 'theme-storage',
      },
   ),
)
