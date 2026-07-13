import { describe, it, expect } from 'vitest'

describe('Vitest Setup', () => {
   it('should run basic test', () => {
      expect(1 + 1).toBe(2)
   })

   it('should handle strings', () => {
      const name = 'Trading Terminal'
      expect(name).toBe('Trading Terminal')
      expect(name).toContain('Trading')
   })

   it('should work with arrays', () => {
      const coins = ['BTC', 'ETH', 'SOL']
      expect(coins).toHaveLength(3)
      expect(coins).toContain('BTC')
   })
})
