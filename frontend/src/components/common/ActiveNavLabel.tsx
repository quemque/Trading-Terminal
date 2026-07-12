import { cn } from '@/lib/utils'

export function ActiveNavLabel({
   label,
   className,
}: {
   label: string
   className?: string
}) {
   return (
      <span
         className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium',
            'bg-accent text-accent-foreground shadow-sm',
            'cursor-default select-none',
            className,
         )}
      >
         {label}
      </span>
   )
}
