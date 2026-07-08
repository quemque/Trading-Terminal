import { useOrderBook } from '../../../hooks/useOrderBook'
import { useTradingStore } from '../../../store/tradingStore'
import { OrderBookList } from './OrderBookList'
import { SpreadInfo } from './SpreadInfo'
import { OrderHeader } from './OrderHeader'
import Loading from '../../common/Loading'
import { WS_CONFIG } from '../../../config/websocket'

export function OrderBook() {
   const { wsSymbol } = useTradingStore()
   const { orderBook, isConnected } = useOrderBook(wsSymbol)

   if (!isConnected) return <Loading message="Connecting to order book..." />

   const { bids, asks } = orderBook

   if (!bids?.length && !asks?.length)
      return <Loading message="Waiting for data..." />

   return (
      <div className="bg-bg-secondary rounded-xl p-6 shadow-lg">
         <OrderHeader />

         <div className="grid grid-cols-2 gap-4">
            <OrderBookList
               items={bids}
               type="bid"
               limit={WS_CONFIG.ORDER_LIMIT}
            />
            <OrderBookList
               items={asks}
               type="ask"
               limit={WS_CONFIG.ORDER_LIMIT}
            />
         </div>

         {bids.length > 0 && asks.length > 0 && (
            <SpreadInfo bestBid={bids[0].price} bestAsk={asks[0].price} />
         )}
      </div>
   )
}
