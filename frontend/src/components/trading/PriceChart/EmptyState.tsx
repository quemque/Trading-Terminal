export function EmptyState({ symbol }: { symbol: string }) {
   return (
      <div className="bg-bg-secondary rounded-xl p-6 shadow-lg">
         <div className="h-[450px] flex items-center justify-center text-text-secondary">
            No data for {symbol}
         </div>
      </div>
   )
}
