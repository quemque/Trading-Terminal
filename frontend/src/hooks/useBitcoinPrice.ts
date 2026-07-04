import { useQuery } from '@tanstack/react-query'
import { bitcoinApi } from '../api/bitcoin.api'

export function useBitcoinPrice() {
   return useQuery({
      queryKey: ['bitcoin-price'],
      queryFn: bitcoinApi,
      retry: false,
      staleTime: 30000,
      refetchInterval: 60000,
   })
}
