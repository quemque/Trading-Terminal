import { useTradingStore } from '../../store/tradingStore'
import { useCoinList } from '../../hooks/useCoinList'
import Loading from '../common/Loading'
import { DEFAULT_COINS } from '../../config/default-const'

export function CoinSelector() {
   const { symbol, setSymbol } = useTradingStore()
   const { data: coins, isLoading, error } = useCoinList(DEFAULT_COINS)

   if (isLoading) return <Loading />
   if (error) {
      console.error('CoinSelector error:', error)
      return <div className="text-red-500">Failed to load coins</div>
   }
   if (!coins) return null

   return (
      <div className="flex flex-wrap gap-2 mb-6">
         {coins.slice(0, 10).map((coin) => (
            <button
               key={coin.id}
               onClick={() => setSymbol(coin.id)}
               className={`px-4 py-2 rounded-lg transition-colors ${
                  symbol === coin.id
                     ? 'bg-orange-500 text-white'
                     : 'bg-bg-tertiary hover:bg-bg-hover text-text-secondary'
               }`}
            >
               {coin.symbol.toUpperCase()} {coin.name}
            </button>
         ))}
      </div>
   )
}
