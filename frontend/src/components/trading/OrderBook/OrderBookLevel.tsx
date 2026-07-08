export function OrderBookLevel({
   price,
   amount,
   type,
}: {
   price: number
   amount: number
   type: 'bid' | 'ask'
}) {
   const priceColor = type === 'bid' ? 'text-green-500' : 'text-red-500'

   return (
      <div className="flex justify-between text-sm py-1 px-2 rounded hover:bg-bg-hover">
         <span className={priceColor}>${price.toFixed(2)}</span>
         <span className="text-text-muted">{amount.toFixed(4)}</span>
      </div>
   )
}
