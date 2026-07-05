export function ChartHeader({
   symbol,
   days,
   price,
}: {
   symbol: string
   days: number
   price: number
}) {
   return (
      <div className="flex justify-between items-center mb-4">
         <div>
            <h3 className="font-semibold text-lg text-text-primary">
               {symbol.toUpperCase()}
            </h3>
            <p className="text-sm text-text-secondary">Last {days} days</p>
         </div>
         <div className="text-right">
            <p className="text-2xl font-bold text-text-primary">
               ${price.toLocaleString()}
            </p>
         </div>
      </div>
   )
}
