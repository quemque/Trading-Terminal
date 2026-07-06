import { AVAILABLE_COINS } from '../../config/available-coins'
import { useTradingStore } from '../../store/tradingStore'

export function CoinSelector() {
   const { symbol, setSymbol } = useTradingStore()
   return (
      <div className="flex flex-wrap gap-2 mb-6">
         {AVAILABLE_COINS.map((coin) => (
            <button
               key={coin.id}
               onClick={() => setSymbol(coin.id)}
               className={`px-4 py-2 rounded-lg transition-colors ${
                  symbol === coin.id
                     ? 'bg-orange-500 text-white'
                     : 'bg-bg-tertiary hover:bg-bg-hover text-text-secondary'
               }`}
            >
               {coin.icon} {coin.name}
            </button>
         ))}
      </div>
   )
}
