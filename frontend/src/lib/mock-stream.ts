import { useTradingStore } from '../store/TradingStore'
import { startMockStream } from '../mocks/generateMockData'

export function initializeMockStream(): void {
   startMockStream(useTradingStore.getState())
}
