import { describe, it, expect } from 'vitest'
import { transformToChartData } from './chartDataTransformer'

describe('transformToChartData', () => {
   describe('basic functionality', () => {
      it('should transform single price point correctly', () => {
         const prices = [{ price: 50000, timestamp: 1704067200000 }]

         const result = transformToChartData(prices)

         expect(result).toHaveLength(1)
         expect(result[0]).toEqual({
            time: 1704067200,
            open: 50000,
            high: 50000,
            low: 50000,
            close: 50000,
         })
      })

      it('should transform multiple price points correctly', () => {
         const prices = [
            { price: 50000, timestamp: 1704067200000 },
            { price: 51000, timestamp: 1704153600000 },
         ]

         const result = transformToChartData(prices)

         expect(result).toHaveLength(2)

         expect(result[0]).toEqual({
            time: 1704067200,
            open: 50000,
            high: 50000,
            low: 50000,
            close: 50000,
         })

         expect(result[1]).toEqual({
            time: 1704153600,
            open: 50000,
            high: 51000,
            low: 50000,
            close: 51000,
         })
      })

      it('should handle upward price movement', () => {
         const prices = [
            { price: 100, timestamp: 1000000 },
            { price: 150, timestamp: 2000000 },
            { price: 200, timestamp: 3000000 },
         ]

         const result = transformToChartData(prices)

         expect(result[1].open).toBe(100)
         expect(result[1].high).toBe(150)
         expect(result[1].low).toBe(100)
         expect(result[1].close).toBe(150)

         expect(result[2].open).toBe(150)
         expect(result[2].high).toBe(200)
         expect(result[2].low).toBe(150)
         expect(result[2].close).toBe(200)
      })

      it('should handle downward price movement', () => {
         const prices = [
            { price: 200, timestamp: 1000000 },
            { price: 150, timestamp: 2000000 },
            { price: 100, timestamp: 3000000 },
         ]

         const result = transformToChartData(prices)

         expect(result[1].open).toBe(200)
         expect(result[1].high).toBe(200)
         expect(result[1].low).toBe(150)
         expect(result[1].close).toBe(150)

         expect(result[2].open).toBe(150)
         expect(result[2].high).toBe(150)
         expect(result[2].low).toBe(100)
         expect(result[2].close).toBe(100)
      })

      it('should handle price staying the same', () => {
         const prices = [
            { price: 100, timestamp: 1000000 },
            { price: 100, timestamp: 2000000 },
         ]

         const result = transformToChartData(prices)

         expect(result[1]).toEqual({
            time: 2000,
            open: 100,
            high: 100,
            low: 100,
            close: 100,
         })
      })
   })

   describe('edge cases', () => {
      it('should return empty array for undefined input', () => {
         const result = transformToChartData(undefined as never)
         expect(result).toEqual([])
      })

      it('should return empty array for null input', () => {
         const result = transformToChartData(null as never)
         expect(result).toEqual([])
      })

      it('should return empty array for empty array input', () => {
         const result = transformToChartData([])
         expect(result).toEqual([])
      })

      it('should handle large timestamp values', () => {
         const prices = [{ price: 50000, timestamp: 9999999999999 }]

         const result = transformToChartData(prices)

         expect(result[0].time).toBe(9999999999.999)
      })

      it('should handle small timestamp values', () => {
         const prices = [{ price: 50000, timestamp: 1000 }]

         const result = transformToChartData(prices)

         expect(result[0].time).toBe(1)
      })

      it('should handle zero timestamp', () => {
         const prices = [{ price: 50000, timestamp: 0 }]

         const result = transformToChartData(prices)

         expect(result[0].time).toBe(0)
      })

      it('should handle negative prices', () => {
         const prices = [
            { price: -50, timestamp: 1000000 },
            { price: -100, timestamp: 2000000 },
         ]

         const result = transformToChartData(prices)

         expect(result[1].open).toBe(-50)
         expect(result[1].high).toBe(-50)
         expect(result[1].low).toBe(-100)
         expect(result[1].close).toBe(-100)
      })

      it('should handle zero prices', () => {
         const prices = [
            { price: 0, timestamp: 1000000 },
            { price: 0, timestamp: 2000000 },
         ]

         const result = transformToChartData(prices)

         expect(result[0].open).toBe(0)
         expect(result[0].high).toBe(0)
         expect(result[0].low).toBe(0)
         expect(result[0].close).toBe(0)
      })

      it('should handle very large prices', () => {
         const prices = [
            { price: 999999999, timestamp: 1000000 },
            { price: 1000000000, timestamp: 2000000 },
         ]

         const result = transformToChartData(prices)

         expect(result[1].high).toBe(1000000000)
         expect(result[1].low).toBe(999999999)
      })

      it('should handle decimal prices', () => {
         const prices = [
            { price: 100.5, timestamp: 1000000 },
            { price: 100.75, timestamp: 2000000 },
         ]

         const result = transformToChartData(prices)

         expect(result[1].open).toBe(100.5)
         expect(result[1].close).toBe(100.75)
         expect(result[1].high).toBe(100.75)
         expect(result[1].low).toBe(100.5)
      })
   })

   describe('data integrity', () => {
      it('should preserve array length', () => {
         const prices = Array.from({ length: 100 }, (_, i) => ({
            price: 50000 + i * 10,
            timestamp: (i + 1) * 1000000,
         }))

         const result = transformToChartData(prices)

         expect(result).toHaveLength(100)
      })

      it('should not mutate original array', () => {
         const prices = [
            { price: 50000, timestamp: 1000000 },
            { price: 51000, timestamp: 2000000 },
         ]

         const originalPrices = [...prices]

         transformToChartData(prices)

         expect(prices).toEqual(originalPrices)
      })

      it('should have correct timestamp division', () => {
         const prices = [{ price: 50000, timestamp: 1704067200000 }]

         const result = transformToChartData(prices)

         expect(result[0].time).toBe(1704067200)
         expect(typeof result[0].time).toBe('number')
      })

      it('should maintain correct order of data points', () => {
         const prices = [
            { price: 100, timestamp: 1000 },
            { price: 200, timestamp: 2000 },
            { price: 300, timestamp: 3000 },
            { price: 400, timestamp: 4000 },
            { price: 500, timestamp: 5000 },
         ]

         const result = transformToChartData(prices)

         result.forEach((point, index) => {
            expect(point.time).toBe(index + 1)
            expect(point.close).toBe((index + 1) * 100)
         })
      })

      it('should calculate high correctly for volatile price swings', () => {
         const prices = [
            { price: 100, timestamp: 1000 },
            { price: 500, timestamp: 2000 },
            { price: 50, timestamp: 3000 },
            { price: 300, timestamp: 4000 },
         ]

         const result = transformToChartData(prices)

         expect(result[1].open).toBe(100)
         expect(result[1].high).toBe(500)
         expect(result[1].low).toBe(100)
         expect(result[1].close).toBe(500)

         expect(result[2].open).toBe(500)
         expect(result[2].high).toBe(500)
         expect(result[2].low).toBe(50)
         expect(result[2].close).toBe(50)

         expect(result[3].open).toBe(50)
         expect(result[3].high).toBe(300)
         expect(result[3].low).toBe(50)
         expect(result[3].close).toBe(300)
      })
   })

   describe('real-world scenarios', () => {
      it('should handle typical Bitcoin price data', () => {
         const prices = [
            { price: 42000, timestamp: 1640995200000 },
            { price: 42500, timestamp: 1641081600000 },
            { price: 41800, timestamp: 1641168000000 },
            { price: 43000, timestamp: 1641254400000 },
            { price: 43500, timestamp: 1641340800000 },
         ]

         const result = transformToChartData(prices)

         expect(result).toHaveLength(5)
         expect(result[0].time).toBe(1640995200)
         expect(result[4].time).toBe(1641340800)
      })

      it('should handle data with missing intermediate timestamps', () => {
         const prices = [
            { price: 50000, timestamp: 1704067200000 },
            { price: 51000, timestamp: 1704672000000 },
         ]

         const result = transformToChartData(prices)

         expect(result).toHaveLength(2)
         expect(result[0].time).toBe(1704067200)
         expect(result[1].time).toBe(1704672000)
      })
   })
})
