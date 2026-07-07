import axios from 'axios'
import { HistoryResponse, Coin } from '../types/trading'
import {
   DEFAULT_SYMBOL,
   DEFAULT_DAYS,
   DEFAULT_COINS,
} from '../config/default-const'

const port = import.meta.env.VITE_PORT || 3000

export const coinApi = {
   fetchHistory: async (
      symbol: string = DEFAULT_SYMBOL,
      days: number = DEFAULT_DAYS,
   ): Promise<HistoryResponse> => {
      const responce = await axios.get(
         `http://localhost:${port}/api/coin-history?symbol=${symbol}&days=${days}`,
      )
      return responce.data
   },
   fetchCoinList: async (limit: number = DEFAULT_COINS): Promise<Coin[]> => {
      const response = await axios.get(
         `http://localhost:${port}/api/coin-list?limit=${limit}`,
      )
      return response.data.coins
   },
}
