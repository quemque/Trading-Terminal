import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle({
   theme,
   onToggle,
}: {
   theme: string
   onToggle: () => void
}) {
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
