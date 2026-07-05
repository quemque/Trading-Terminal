import Error from './Error'
import Loading from './Loading'
import { useBitcoinPrice } from '../../hooks/useBitcoinPrice'
import { useBitcoinHistory } from '../../hooks/useBitcoinHistory'
import { PriceChart } from './PriceChart'
import { useState } from 'react'
import { AVAILABLE_COINS } from '../../data/available-coins'

//КАЖДЫЙ КОМПОНЕНТ МОЖНО ОТДЕЛЬНО ВЫНЕСТИ
function Main() {
   const [symbol, setSymbol] = useState('bitcoin')
   const [days, setDays] = useState(7)
   const {
      data: priceData,
      isLoading: priceLoading,
      error: priceError,
   } = useBitcoinPrice(symbol)

   const { data: historyData, isLoading: historyLoading } = useBitcoinHistory(
      symbol,
      days,
   )

   if (priceLoading) {
      return <Loading />
   }

   if (priceError) {
      return <Error message={priceError?.message || 'Something went wrong'} />
   }

   const currentPrice = priceData?.price

   return (
      <div className="max-w-4xl mx-auto p-6">
         <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
               ₿ Bitcoin Price
            </h1>
            <p className="text-gray-500">Live price from CoinGecko API</p>
         </div>

         {/* Селектор валют */}
         <div className="flex flex-wrap gap-2 mb-6">
            {AVAILABLE_COINS.map((coin) => (
               <button
                  key={coin.id}
                  onClick={() => setSymbol(coin.id)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                     symbol === coin.id
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
                  }`}
               >
                  {coin.icon} {coin.name}
               </button>
            ))}
         </div>

         <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-xl p-6 mb-8 text-white shadow-lg">
            <div className="flex items-center justify-between">
               <div>
                  <p className="text-sm opacity-80">Current Price</p>
                  <p className="text-4xl font-bold">
                     ${currentPrice?.toLocaleString() || 'N/A'}
                  </p>
               </div>
               <div className="text-right">
                  <div className="bg-white/20 rounded-lg px-4 py-2">
                     <span className="text-sm">USD</span>
                  </div>
               </div>
            </div>
         </div>

         <PriceChart
            symbol={symbol}
            days={days}
            onDaysChange={setDays}
            isLoading={historyLoading}
            data={historyData}
         />
      </div>
   )
}

export default Main
