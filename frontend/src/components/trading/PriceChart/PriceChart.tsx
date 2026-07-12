import { useRef, useMemo } from 'react'
import Loading from '../../common/Loading'
import { useThemeStore } from '../../../store/ThemeStore'
import { useChart } from '../../../hooks/useChart'
import { transformToChartData } from '../../../utils/chartDataTransformer'
import { ChartHeader } from './ChartHeader'
import { DaysSelector } from './DaysSelector'
import { EmptyState } from './EmptyState'
import { useTradingStore } from '../../../store/tradingStore'
import { Card, CardContent } from '@/components/ui/card'

export function PriceChart() {
   const containerRef = useRef<HTMLDivElement>(null)
   const { symbol, days, setDays, historyData, isLoading } = useTradingStore()
   const { theme } = useThemeStore()
   const isDark = theme === 'dark'

   const chartData = useMemo(
      () => transformToChartData(historyData?.prices ?? []),
      [historyData],
   )

   useChart(containerRef, chartData, isDark)

   if (isLoading) return <Loading message="Loading price..." />
   if (!historyData?.prices?.length) return <EmptyState symbol={symbol} />

   const currentPrice = historyData.prices[historyData.prices.length - 1].price

   return (
      <Card className="overflow-hidden">
         <CardContent className="p-6">
            <ChartHeader symbol={symbol} days={days} price={currentPrice} />
            <DaysSelector days={days} onDaysChange={setDays} />
            <div
               ref={containerRef}
               className="w-full h-[450px] rounded-lg border border-border bg-background/50"
            />
         </CardContent>
      </Card>
   )
}
