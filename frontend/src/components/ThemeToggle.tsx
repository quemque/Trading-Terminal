import { FaSun, FaMoon } from 'react-icons/fa'

interface ThemeToggleProps {
   theme: 'dark' | 'light'
   onToggle: () => void
}

function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
   return (
      <button
         onClick={onToggle}
         className="p-2 rounded-lg bg-bg-tertiary text-text-secondary 
                 hover:bg-bg-hover hover:text-text-primary transition-colors"
      >
         {theme === 'dark' ? <FaSun /> : <FaMoon />}
      </button>
   )
}
export default ThemeToggle
