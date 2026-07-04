import { useThemeStore } from '../store/ThemeStore'

export function initializeTheme(): void {
   const theme = useThemeStore.getState().theme
   document.documentElement.setAttribute('data-theme', theme)
}
