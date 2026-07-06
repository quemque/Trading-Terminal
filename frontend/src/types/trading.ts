export interface PriceHistory {
   price: number
   timestamp: number
   date: string
}
export interface HistoryResponse {
   symbol: string
   prices: PriceHistory[]
   lastUpdated: number
}
export interface TradingState {
   symbol: string
   days: number
   historyData: HistoryResponse | null
   isLoading: boolean

   setSymbol: (symbol: string) => void
   setDays: (days: number) => void
   setHistoryData: (data: HistoryResponse) => void
   setIsLoading: (loading: boolean) => void
}
