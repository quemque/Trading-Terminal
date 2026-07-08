import { OrderBookLevel as OrderBookLevelComponent } from './OrderBookLevel'
import { OrderBookLevel } from '../../../types/Order'
import { WS_CONFIG } from '../../../config/websocket'

export function OrderBookList({
   items,
   type,
   limit = WS_CONFIG.ORDER_LIMIT,
}: {
   items: OrderBookLevel[]
   type: 'bid' | 'ask'
   limit?: number
}) {
   const label = type === 'bid' ? 'Bids (Buy)' : 'Asks (Sell)'

   if (!items || items.length === 0) {
      return (
         <div className="text-sm text-text-secondary">
            No {type === 'bid' ? 'bids' : 'asks'} available
         </div>
      )
   }

   return (
      <div>
         <div className="text-sm font-medium text-text-secondary mb-2">
            {label}
         </div>
         <div className="space-y-1 max-h-60 overflow-y-auto">
            {items.slice(0, limit).map((item, index) => (
               <OrderBookLevelComponent
                  key={index}
                  price={item.price}
                  amount={item.amount}
                  type={type}
               />
            ))}
         </div>
      </div>
   )
}
