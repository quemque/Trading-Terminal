import type { Tick, OrderBook, Trade } from '../types/trading'
import type { TradingState } from '../store/TradingStore'

let basePrice = 67890

export function generateTick(): Tick {
   const change = (Math.random() - 0.5) * 100
   basePrice += change

   return {
      symbol: 'BTC/USD',
      price: Math.round(basePrice * 100) / 100,
      volume: Math.random() * 2,
      time: Date.now(),
   }
}

export function generateOrderBook(): OrderBook {
   const asks = Array.from({ length: 20 }, (_, i) => {
      const price = basePrice + 10 + i * 5
      const amount = Math.random() * 3
      return { price, amount, total: 0 }
   })

   const bids = Array.from({ length: 20 }, (_, i) => {
      const price = basePrice - 10 - i * 5
      const amount = Math.random() * 3
      return { price, amount, total: 0 }
   })

   let askTotal = 0
   asks.forEach((a) => {
      askTotal += a.amount
      a.total = Math.round(askTotal * 100) / 100
   })

   let bidTotal = 0
   bids.forEach((b) => {
      bidTotal += b.amount
      b.total = Math.round(bidTotal * 100) / 100
   })

   return { asks, bids }
}

export function generateTrade(tick: Tick): Trade {
   return {
      id: Math.random().toString(36).slice(2, 10),
      price: tick.price,
      amount: tick.volume,
      time: tick.time,
      side: Math.random() > 0.5 ? 'buy' : 'sell',
   }
}

export function startMockStream(store: TradingState) {
   setInterval(() => {
      const tick = generateTick()
      store.updateTick(tick)
      store.updateOrderBook(generateOrderBook())
      store.addTrade(generateTrade(tick))
   }, 500)
}
