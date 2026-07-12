import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export function ChartHeader({
   symbol,
   days,
   price,
   priceChange,
}: {
   symbol: string
   days: number
   price: number
   priceChange?: number
}) {
   const isPositive = priceChange && priceChange > 0
   const isNegative = priceChange && priceChange < 0

   return (
      <div className="space-y-3 mb-4">
         <div className="flex justify-between items-start">
            <div className="space-y-1">
               <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold tracking-tight">
                     {symbol.toUpperCase()}
                  </h3>
                  <Badge variant="outline" className="text-xs">
                     {days}d
                  </Badge>
               </div>
               <p className="text-sm text-muted-foreground">
                  Last {days} days price history
               </p>
            </div>
            <div className="text-right space-y-1">
               <p className="text-3xl font-bold tabular-nums tracking-tight">
                  ${price.toLocaleString()}
               </p>
               {priceChange && (
                  <div
                     className={`
              flex items-center justify-end gap-1 text-sm font-medium
              ${isPositive ? 'text-green-500' : isNegative ? 'text-red-500' : 'text-muted-foreground'}
            `}
                  >
                     {isPositive ? (
                        <TrendingUp className="h-4 w-4" />
                     ) : isNegative ? (
                        <TrendingDown className="h-4 w-4" />
                     ) : (
                        <Minus className="h-4 w-4" />
                     )}
                     <span>
                        {priceChange > 0 ? '+' : ''}
                        {priceChange.toFixed(2)}%
                     </span>
                  </div>
               )}
            </div>
         </div>
         <Separator />
      </div>
   )
}
