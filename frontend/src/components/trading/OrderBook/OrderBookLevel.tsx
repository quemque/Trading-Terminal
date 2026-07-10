import { cn } from '@/lib/utils'

export function OrderBookLevel({
   price,
   amount,
   type,
}: {
   price: number
   amount: number
   type: 'bid' | 'ask'
}) {
   return (
      <div className="flex justify-between text-sm py-1 px-2 rounded hover:bg-accent hover:text-accent-foreground transition-colors">
         <span
            className={cn(
               'font-medium',
               type === 'bid' ? 'text-green-500' : 'text-red-500',
            )}
         >
            ${price.toFixed(2)}
         </span>
         <span className="text-muted-foreground">{amount.toFixed(4)}</span>
      </div>
   )
}
