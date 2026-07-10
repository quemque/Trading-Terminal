import type { UTCTimestamp } from 'lightweight-charts'

export function transformToChartData(
   prices: { price: number; timestamp: number }[],
) {
   if (!prices?.length) return []

   return prices.map((p, i, arr) => {
      const prev = i > 0 ? arr[i - 1].price : p.price
      return {
         time: (p.timestamp / 1000) as UTCTimestamp,
         open: prev,
         high: Math.max(prev, p.price),
         low: Math.min(prev, p.price),
         close: p.price,
      }
   })
}
