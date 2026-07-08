export function SpreadInfo({
   bestBid,
   bestAsk,
}: {
   bestBid: number
   bestAsk: number
}) {
   const spread = bestAsk - bestBid

   return (
      <div className="mt-4 pt-4 border-t border-border">
         <div className="flex justify-between text-sm">
            <span className="text-text-secondary">
               Best Bid:{' '}
               <span className="text-green-500 font-medium">
                  ${bestBid.toFixed(2)}
               </span>
            </span>
            <span className="text-text-secondary">
               Spread:{' '}
               <span className="text-text-primary font-medium">
                  ${spread.toFixed(2)}
               </span>
            </span>
            <span className="text-text-secondary">
               Best Ask:{' '}
               <span className="text-red-500 font-medium">
                  ${bestAsk.toFixed(2)}
               </span>
            </span>
         </div>
      </div>
   )
}
