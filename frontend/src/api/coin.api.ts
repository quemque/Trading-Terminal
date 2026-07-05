import axios from 'axios'
import { HistoryResponse } from '../types/trading'
import { DEFAULT_SYMBOL, DEFAULT_DAYS } from '../config/default-const'

const port = import.meta.env.VITE_PORT

export const bitcoinApi = {
   fetchHistory: async (
      symbol: string = DEFAULT_SYMBOL,
      days: number = DEFAULT_DAYS,
   ): Promise<HistoryResponse> => {
      const responce = await axios.get(
         `http://localhost:${port}/api/coin-history?symbol=${symbol}&days=${days}`,
      )
      return responce.data
   },
}
