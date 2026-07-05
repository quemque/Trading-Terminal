import { DAYS_OPTIONS } from '../../../config/days-options'
export function DaysSelector({
   days,
   onDaysChange,
}: {
   days: number
   onDaysChange: (d: number) => void
}) {
   return (
      <div className="flex gap-2 mb-4 flex-wrap">
         {DAYS_OPTIONS.map((d) => (
            <button
               key={d}
               onClick={() => onDaysChange(d)}
               className={`px-3 py-1 text-sm rounded transition-colors ${
                  days === d
                     ? 'bg-orange-500 text-white'
                     : 'bg-bg-tertiary hover:bg-bg-hover text-text-secondary'
               }`}
            >
               {d}d
            </button>
         ))}
      </div>
   )
}
