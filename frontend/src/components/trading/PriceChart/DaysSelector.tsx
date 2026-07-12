import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { DAYS_OPTIONS } from '../../../config/days-options'

export function DaysSelector({
   days,
   onDaysChange,
}: {
   days: number
   onDaysChange: (d: number) => void
}) {
   return (
      <div className="flex gap-1 mb-4 p-1 bg-muted rounded-lg">
         {DAYS_OPTIONS.map((d) => (
            <Button
               key={d}
               onClick={() => onDaysChange(d)}
               variant={days === d ? 'default' : 'ghost'}
               size="sm"
               className={cn(
                  'relative flex-1 transition-all duration-300 ease-out',
                  'hover:-translate-y-0.5 hover:shadow-md',
                  'active:scale-90 active:translate-y-0',
                  days === d
                     ? 'bg-background text-foreground shadow-md scale-105 font-semibold translate-y-0'
                     : 'text-muted-foreground hover:text-foreground hover:bg-background/50',
               )}
            >
               <span className="relative z-10">{d}d</span>
            </Button>
         ))}
      </div>
   )
}
