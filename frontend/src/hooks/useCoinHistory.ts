import { useQuery } from '@tanstack/react-query'
import { bitcoinApi } from '../api/coin.api'
import { DEFAULT_SYMBOL, DEFAULT_DAYS } from '../config/default-const'

export function useBitcoinHistory(
   symbol: string = DEFAULT_SYMBOL,
   days: number = DEFAULT_DAYS,
) {
   return useQuery({
      queryKey: ['bitcoin-history', symbol, days],
      queryFn: () => bitcoinApi.fetchHistory(symbol, days),
      staleTime: 60000,
      retry: false,
   })
}
