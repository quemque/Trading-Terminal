import { OrderBookLevel as OrderBookLevelComponent } from './OrderBookLevel'
import type { OrderBookLevel } from '../../../types/Order'
import { WS_CONFIG } from '../../../config/websocket'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'

export function OrderBookList({
   items,
   type,
   limit = WS_CONFIG.ORDER_LIMIT,
}: {
   items: OrderBookLevel[]
   type: 'bid' | 'ask'
   limit?: number
}) {
   if (!items || items.length === 0) {
      return (
         <div className="text-sm text-muted-foreground text-center py-4">
            No {type === 'bid' ? 'bids' : 'asks'} available
         </div>
      )
   }

   return (
      <div>
         <div className="flex items-center gap-2 mb-2 ml-4">
            <Badge variant={type === 'bid' ? 'default' : 'destructive'}>
               {type === 'bid' ? 'Bids' : 'Asks'}
            </Badge>
            <span className="text-xs text-muted-foreground ml-10">
               {type === 'bid' ? 'Buy' : 'Sell'}
            </span>
         </div>
         <ScrollArea className="h-60">
            <div className="space-y-1">
               {items.slice(0, limit).map((item, index) => (
                  <OrderBookLevelComponent
                     key={index}
                     price={item.price}
                     amount={item.amount}
                     type={type}
                  />
               ))}
            </div>
         </ScrollArea>
      </div>
   )
}
