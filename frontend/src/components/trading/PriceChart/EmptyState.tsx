import { Card, CardContent } from '@/components/ui/card'
import { BarChart3 } from 'lucide-react'

export function EmptyState({ symbol }: { symbol: string }) {
   return (
      <Card>
         <CardContent className="h-[450px] flex flex-col items-center justify-center text-muted-foreground">
            <BarChart3 className="h-16 w-16 mb-4 text-muted-foreground/50" />
            <p className="text-lg font-medium">No data available</p>
            <p className="text-sm">No price history found for {symbol}</p>
         </CardContent>
      </Card>
   )
}
