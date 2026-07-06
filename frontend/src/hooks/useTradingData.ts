import { useEffect } from 'react'
import { useTradingStore } from '../store/tradingStore'
import { useBitcoinHistory } from './useCoinHistory'

export function useTradingData() {
   const { symbol, days, setHistoryData, setIsLoading } = useTradingStore()
   const { data: historyData, isLoading: isLoading } = useBitcoinHistory(
      symbol,
      days,
   )
   useEffect(() => {
      if (historyData) {
         setHistoryData(historyData)
         setIsLoading(isLoading)
      }
   }, [historyData, isLoading])
   return { historyData, isLoading }
}
