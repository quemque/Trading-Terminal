import { useQuery } from '@tanstack/react-query'
import { bitcoinApi } from '../api/bitcoin.api'

export function useBitcoinPrice(symbol: string = 'bitcoin') {
   return useQuery({
      queryKey: ['bitcoin-price', symbol],
      queryFn: () => bitcoinApi.fetchPrice(symbol),
      retry: false,
      staleTime: 30000,
      refetchInterval: 60000,
   })
}
