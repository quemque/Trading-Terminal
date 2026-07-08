import { PriceChart } from '../components/trading/PriceChart/PriceChart'
import { CoinSelector } from '../components/trading/СoinSelector'
import { TerminalHeader } from '../components/trading/TerminalHeader'
import { useTradingData } from '../hooks/useTradingData'
import { OrderBook } from '../components/trading/OrderBook/OrderBook'

function Main() {
   useTradingData()
   return (
      <div className="max-w-6xl mx-auto container px-4 py-8">
         <TerminalHeader />
         <CoinSelector />

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
               <PriceChart />
            </div>
            <div>
               <OrderBook />
            </div>
         </div>
      </div>
   )
}

export default Main
