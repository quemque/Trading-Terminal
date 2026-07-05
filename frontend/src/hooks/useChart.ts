import { useEffect, useRef } from 'react'
import {
   createChart,
   IChartApi,
   ISeriesApi,
   CandlestickSeries,
   ColorType,
   UTCTimestamp,
} from 'lightweight-charts'
import { CHART_COLORS, CHART_DEFAULTS } from '../config/chart.config'

export function useChart(
   containerRef: React.RefObject<HTMLDivElement | null>,
   chartData: {
      time: UTCTimestamp
      open: number
      high: number
      low: number
      close: number
   }[],
   isDark: boolean,
) {
   const chartRef = useRef<IChartApi | null>(null)
   const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)

   useEffect(() => {
      if (!containerRef.current || chartData.length === 0) return

      const colors = CHART_COLORS[isDark ? 'dark' : 'light']

      const chart = createChart(containerRef.current, {
         width: containerRef.current.clientWidth,
         height: CHART_DEFAULTS.height,
         layout: {
            background: { type: ColorType.Solid, color: colors.background },
            textColor: colors.text,
         },
         grid: {
            vertLines: { color: colors.grid },
            horzLines: { color: colors.grid },
         },
         timeScale: {
            timeVisible: true,
            secondsVisible: false,
         },
      })

      const series = chart.addSeries(CandlestickSeries, {
         upColor: CHART_DEFAULTS.upColor,
         downColor: CHART_DEFAULTS.downColor,
         borderVisible: false,
         wickUpColor: CHART_DEFAULTS.upColor,
         wickDownColor: CHART_DEFAULTS.downColor,
      })

      series.setData(chartData)

      const handleResize = () => {
         if (containerRef.current) {
            chart.applyOptions({ width: containerRef.current.clientWidth })
         }
      }

      window.addEventListener('resize', handleResize)

      chartRef.current = chart
      seriesRef.current = series

      return () => {
         window.removeEventListener('resize', handleResize)
         chart.remove()
      }
   }, [chartData, isDark, containerRef])

   useEffect(() => {
      if (!chartRef.current) return

      const colors = CHART_COLORS[isDark ? 'dark' : 'light']

      chartRef.current.applyOptions({
         layout: {
            background: { type: ColorType.Solid, color: colors.background },
            textColor: colors.text,
         },
         grid: {
            vertLines: { color: colors.grid },
            horzLines: { color: colors.grid },
         },
      })
   }, [isDark])

   return { chartRef, seriesRef }
}
