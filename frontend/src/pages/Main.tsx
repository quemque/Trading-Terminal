import { PriceChart } from '../components/trading/PriceChart/PriceChart'
import { CoinSelector } from '../components/trading/СoinSelector'
import { TerminalHeader } from '../components/trading/TerminalHeader'
import { useTradingData } from '../hooks/useTradingData'

function Main() {
   useTradingData()
   return (
      <div className="max-w-4xl mx-auto container px-4 py-8">
         <TerminalHeader />
         <CoinSelector />
         <PriceChart />
      </div>
   )
}

export default Main
