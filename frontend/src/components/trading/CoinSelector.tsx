import { useTradingStore } from '../../store/tradingStore'
import { useCoinList } from '../../hooks/useCoinList'
import Loading from '../common/Loading'
import { DEFAULT_COINS } from '../../config/default-const'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Error } from '../common/Error'
export function CoinSelector() {
   const { symbol, setSymbol, setWsSymbol } = useTradingStore()
   const { data: coins, isLoading, error } = useCoinList(DEFAULT_COINS)

   if (isLoading) return <Loading message="Loading coin list..." />
   if (error) return <Error />
   if (!coins) return null

   return (
      <div className="flex flex-wrap gap-2 mb-6">
         {coins.slice(0, 10).map((coin) => (
            <Button
               key={coin.id}
               onClick={() => {
                  setSymbol(coin.id)
                  setWsSymbol(coin.symbol.toUpperCase())
               }}
               variant={symbol === coin.id ? 'default' : 'outline'}
               size="sm"
               className={cn(
                  'relative rounded-lg transition-all duration-300 ease-out',
                  'hover:-translate-y-0.5 hover:shadow-md',
                  'active:scale-95',
                  symbol === coin.id
                     ? 'shadow-sm border border-primary/50 bg-primary text-primary-foreground translate-y-0'
                     : 'border border-transparent hover:border-border hover:bg-secondary/60',
               )}
            >
               <span className="font-bold transition-all duration-300">
                  {coin.symbol.toUpperCase()}
               </span>
               <span
                  className={cn(
                     'ml-1.5 text-xs transition-all duration-300',
                     symbol === coin.id
                        ? 'text-primary-foreground/70'
                        : 'text-muted-foreground group-hover:text-foreground/70',
                  )}
               >
                  {coin.name}
               </span>
            </Button>
         ))}
      </div>
   )
}
