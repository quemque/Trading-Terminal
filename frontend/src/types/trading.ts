export interface PriceHistory {
   price: number
   timestamp: number
   date: string
}
export interface PriceChartProps {
   symbol: string
   days: number
   onDaysChange: (days: number) => void
   isLoading: boolean
   data: HistoryResponse | undefined
}
export interface HistoryResponse {
   symbol: string
   prices: PriceHistory[]
   lastUpdated: number
}
