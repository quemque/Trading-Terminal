import { Separator } from '@/components/ui/separator'

export function SpreadInfo({
   bestBid,
   bestAsk,
}: {
   bestBid: number
   bestAsk: number
}) {
   const spread = bestAsk - bestBid

   return (
      <div className="mt-4">
         <Separator className="my-4" />
         <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
               Best Bid:{' '}
               <span className="text-green-500 font-medium">
                  ${bestBid.toFixed(2)}
               </span>
            </span>
            <span className="text-muted-foreground">
               Spread:{' '}
               <span className="text-foreground font-medium">
                  ${spread.toFixed(2)}
               </span>
            </span>
            <span className="text-muted-foreground">
               Best Ask:{' '}
               <span className="text-red-500 font-medium">
                  ${bestAsk.toFixed(2)}
               </span>
            </span>
         </div>
      </div>
   )
}
