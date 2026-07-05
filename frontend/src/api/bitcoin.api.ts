import axios from 'axios'
import { Tick } from '../types/trading'
import { HistoryResponse } from '../types/trading'

export const bitcoinApi = {
   fetchPrice: async (symbol: string = 'bitcoin'): Promise<Tick> => {
      const response = await axios.get(
         'http://localhost:3000/api/bitcoin-price',
      )

      return {
         symbol: symbol,
         price: response.data.bitcoin?.usd || 0,
         volume: 0,
         time: Date.now(),
      }
   },
   //port можно вынести в .env
   fetchHistory: async (
      symbol: string = 'bitcoin',
      days: number = 7,
   ): Promise<HistoryResponse> => {
      const responce = await axios.get(
         `http://localhost:3000/api/bitcoin-history?symbol=${symbol}&days=${days}`,
      )
      return responce.data
   },
}
