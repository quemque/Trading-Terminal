import { FaSun, FaMoon } from 'react-icons/fa'

function ThemeToggle({
   theme,
   onToggle,
}: {
   theme: 'dark' | 'light'
   onToggle: () => void
}) {
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
