import axios from 'axios'
import { Tick } from '../types/trading'

export const bitcoinApi = async (): Promise<Tick> => {
   const response = await axios.get('http://localhost:3000/api/bitcoin-price')

   return {
      symbol: 'bitcoin',
      price: response.data.bitcoin?.usd || 0,
      volume: 0,
      time: Date.now(),
   }
}
