import { useBitcoinHistory } from '../hooks/useCoinHistory'
import { PriceChart } from '../components/trading/PriceChart/PriceChart'
import { useState } from 'react'
import { CoinSelector } from '../components/trading/СoinSelector'
import { TerminalHeader } from '../components/trading/TerminalHeader'
import { DEFAULT_SYMBOL, DEFAULT_DAYS } from '../config/default-const'

function Main() {
   const [symbol, setSymbol] = useState(DEFAULT_SYMBOL)
   const [days, setDays] = useState(DEFAULT_DAYS)
   const { data: historyData, isLoading: isLoading } = useBitcoinHistory(
      symbol,
      days,
   )
   return (
      <div className="max-w-4xl mx-auto container px-4 py-8">
         <TerminalHeader symbol={symbol} />
         <CoinSelector symbol={symbol} setSymbol={setSymbol} />
         <PriceChart
            symbol={symbol}
            days={days}
            onDaysChange={setDays}
            isLoading={isLoading}
            data={historyData}
         />
      </div>
   )
}

export default Main
