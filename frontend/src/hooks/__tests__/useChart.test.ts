import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useChart } from '../useChart'
import type { UTCTimestamp } from 'lightweight-charts'

vi.mock('lightweight-charts', () => ({
   createChart: vi.fn(),
   CandlestickSeries: {},
   ColorType: {
      Solid: 'solid',
   },
}))

import { createChart } from 'lightweight-charts'

const mockAddSeries = vi.fn()
const mockSetData = vi.fn()
const mockApplyOptions = vi.fn()
const mockRemove = vi.fn()

describe('useChart', () => {
   const mockChartData = [
      {
         time: 1234567890 as UTCTimestamp,
         open: 50000,
         high: 51000,
         low: 49000,
         close: 50500,
      },
      {
         time: 1234567891 as UTCTimestamp,
         open: 50500,
         high: 51500,
         low: 49500,
         close: 51000,
      },
   ]

   function createMockContainer() {
      const div = document.createElement('div')
      Object.defineProperty(div, 'clientWidth', { value: 800 })
      return { current: div }
   }

   beforeEach(() => {
      vi.clearAllMocks()
      mockAddSeries.mockReturnValue({ setData: mockSetData })
      vi.mocked(createChart).mockReturnValue({
         addSeries: mockAddSeries,
         applyOptions: mockApplyOptions,
         remove: mockRemove,
      } as never)
   })

   it('should return refs', () => {
      const containerRef = createMockContainer()

      const { result } = renderHook(() =>
         useChart(containerRef, mockChartData, false),
      )

      expect(result.current.chartRef).toBeDefined()
      expect(result.current.seriesRef).toBeDefined()
   })

   it('should not create chart when container is null', () => {
      const containerRef = { current: null }

      renderHook(() => useChart(containerRef, mockChartData, false))

      expect(createChart).not.toHaveBeenCalled()
   })

   it('should not create chart when data is empty', () => {
      const containerRef = createMockContainer()

      renderHook(() => useChart(containerRef, [], false))

      expect(createChart).not.toHaveBeenCalled()
   })

   it('should create chart with correct configuration', () => {
      const containerRef = createMockContainer()

      renderHook(() => useChart(containerRef, mockChartData, false))

      expect(createChart).toHaveBeenCalledWith(
         containerRef.current,
         expect.objectContaining({
            width: 800,
            height: expect.any(Number),
            layout: expect.objectContaining({
               background: expect.any(Object),
               textColor: expect.any(String),
            }),
         }),
      )
   })

   it('should add candlestick series and set data', () => {
      const containerRef = createMockContainer()

      renderHook(() => useChart(containerRef, mockChartData, false))

      expect(mockAddSeries).toHaveBeenCalled()
      expect(mockSetData).toHaveBeenCalledWith(mockChartData)
   })

   it('should clean up on unmount', () => {
      const containerRef = createMockContainer()

      const { unmount } = renderHook(() =>
         useChart(containerRef, mockChartData, false),
      )

      unmount()

      expect(mockRemove).toHaveBeenCalled()
   })
})
