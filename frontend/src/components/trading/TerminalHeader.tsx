import { useTradingStore } from '../../store/tradingStore'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Zap } from 'lucide-react'

export function TerminalHeader() {
   const { symbol } = useTradingStore()

   return (
      <div className="space-y-4 mb-8">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                     <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                     <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500 border-2 border-background" />
                  </div>
               </div>
               <div>
                  <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                     Trading Terminal
                  </h1>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                     <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
                     Live market data
                  </p>
               </div>
            </div>

            <Badge className="px-4 py-2 text-sm font-bold tracking-wider bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
               {symbol.toUpperCase()}
            </Badge>
         </div>
         <Separator className="bg-gradient-to-r from-border via-primary/20 to-border" />
      </div>
   )
}
