import { useTradingStore } from '../../store/tradingStore'

export function TerminalHeader() {
   const { symbol } = useTradingStore()
   return (
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
         <div className="flex items-center gap-3">
            <div
               className={'w-3 h-3 rounded-full animate-pulse bg-green-500 '}
            />
            <h1 className="text-2xl font-bold text-text-primary">
               Trading Terminal
            </h1>
         </div>
         <div className="flex items-center gap-4 text-sm text-text-secondary">
            <span className="hidden sm:inline">⚡ Live</span>
            <span className="px-3 py-1 rounded-full bg-bg-tertiary text-text-secondary">
               {symbol.toUpperCase()}
            </span>
         </div>
      </div>
   )
}
