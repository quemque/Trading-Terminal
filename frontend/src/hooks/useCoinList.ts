import { useQuery } from '@tanstack/react-query'
import { coinApi } from '../api/coin.api'
import { DEFAULT_COINS } from '../config/default-const'

export function useCoinList(limit: number = DEFAULT_COINS) {
   return useQuery({
      queryKey: ['coin-list', limit],
      queryFn: () => coinApi.fetchCoinList(limit),
      staleTime: 3600000,
   })
}
