import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'

interface ThemeToggleProps {
   theme: string
   onToggle: () => void
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
   return (
      <Button
         variant="ghost"
         size="icon"
         onClick={onToggle}
         className="w-9 h-9 rounded-lg"
      >
         {theme === 'dark' ? (
            <Sun className="h-4 w-4" />
         ) : (
            <Moon className="h-4 w-4" />
         )}
         <span className="sr-only">Toggle theme</span>
      </Button>
   )
}
