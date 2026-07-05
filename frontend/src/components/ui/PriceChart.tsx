import { useEffect, useRef, useMemo } from 'react'
import { HistoryResponse } from '../../types/trading'
import Loading from './Loading'
import {
   createChart,
   IChartApi,
   ISeriesApi,
   UTCTimestamp,
   ColorType,
   CandlestickSeries,
} from 'lightweight-charts'

interface PriceChartProps {
   symbol: string
   days: number
   onDaysChange: (days: number) => void
   isLoading: boolean
   data: HistoryResponse | undefined
}

const DAYS_OPTIONS = [7, 14, 30, 90, 365]

export function PriceChart({
   symbol,
   days,
   onDaysChange,
   isLoading,
   data,
}: PriceChartProps) {
   const containerRef = useRef<HTMLDivElement>(null)
   const chartRef = useRef<IChartApi | null>(null)
   const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)

   const chartData = useMemo(() => {
      if (!data?.prices?.length) return []

      return data.prices.map((p, i, arr) => {
         const prev = i > 0 ? arr[i - 1].price : p.price
         return {
            time: (p.timestamp / 1000) as UTCTimestamp,
            open: prev,
            high: Math.max(prev, p.price),
            low: Math.min(prev, p.price),
            close: p.price,
         }
      })
   }, [data])

   useEffect(() => {
      if (!containerRef.current || chartData.length === 0) return

      const chart: IChartApi = createChart(containerRef.current, {
         width: containerRef.current.clientWidth,
         height: 450,
         layout: {
            background: { type: ColorType.Solid, color: '#ffffff' },
            textColor: '#1f2937',
         },
         grid: {
            vertLines: { color: '#f3f4f6' },
            horzLines: { color: '#f3f4f6' },
         },
         timeScale: {
            timeVisible: true,
            secondsVisible: false,
         },
      })

      const series = chart.addSeries(CandlestickSeries, {
         upColor: '#26a69a',
         downColor: '#ef5350',
         borderVisible: false,
         wickUpColor: '#26a69a',
         wickDownColor: '#ef5350',
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
   }, [chartData])

   if (isLoading) return <Loading />
   if (!data?.prices?.length) {
      return (
         <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="h-[450px] flex items-center justify-center text-gray-500">
               No data for {symbol}
            </div>
         </div>
      )
   }

   const currentPrice = data.prices[data.prices.length - 1].price

   return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
         <div className="flex justify-between items-center mb-4">
            <div>
               <h3 className="font-semibold text-lg">{symbol.toUpperCase()}</h3>
               <p className="text-sm text-gray-500">Last {days} days</p>
            </div>
            <div className="text-right">
               <p className="text-2xl font-bold">
                  ${currentPrice.toLocaleString()}
               </p>
            </div>
         </div>

         <div className="flex gap-2 mb-4 flex-wrap">
            {DAYS_OPTIONS.map((d) => (
               <button
                  key={d}
                  onClick={() => onDaysChange(d)}
                  className={`px-3 py-1 text-sm rounded ${
                     days === d
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                  }`}
               >
                  {d}d
               </button>
            ))}
         </div>

         <div ref={containerRef} style={{ width: '100%', height: '450px' }} />
      </div>
   )
}
