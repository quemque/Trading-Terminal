import { useRef, useMemo } from 'react'
import { PriceChartProps } from '../../../types/trading'
import Loading from '../../common/Loading'
import { useThemeStore } from '../../../store/ThemeStore'
import { useChart } from '../../../hooks/useChart'
import { transformToChartData } from '../../../utils/chartDataTransformer'
import { ChartHeader } from './ChartHeader'
import { DaysSelector } from './DaysSelector'
import { EmptyState } from './EmptyState'

export function PriceChart({
   symbol,
   days,
   onDaysChange,
   isLoading,
   data,
}: PriceChartProps) {
   const containerRef = useRef<HTMLDivElement>(null)
   const { theme } = useThemeStore()
   const isDark = theme === 'dark'

   const chartData = useMemo(
      () => transformToChartData(data?.prices ?? []),
      [data],
   )

   useChart(containerRef, chartData, isDark)

   if (isLoading) return <Loading />
   if (!data?.prices?.length) return <EmptyState symbol={symbol} />

   const currentPrice = data.prices[data.prices.length - 1].price

   return (
      <div className="bg-bg-secondary rounded-xl p-6 shadow-lg">
         <ChartHeader symbol={symbol} days={days} price={currentPrice} />
         <DaysSelector days={days} onDaysChange={onDaysChange} />
         <div ref={containerRef} style={{ width: '100%', height: '450px' }} />
      </div>
   )
}
