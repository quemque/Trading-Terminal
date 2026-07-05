import { useQuery } from '@tanstack/react-query'
import { bitcoinApi } from '../api/bitcoin.api'

export function useBitcoinHistory(
   symbol: string = 'bitcoin',
   days: number = 7,
) {
   return useQuery({
      queryKey: ['bitcoin-history', symbol, days],
      queryFn: () => bitcoinApi.fetchHistory(symbol, days),
      staleTime: 60000,
      retry: false,
   })
}
