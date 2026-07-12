import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

export function Error() {
   return (
      <Card className="border-destructive/50 bg-destructive/5 mb-6">
         <CardContent className="flex items-center gap-3 py-4">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <div>
               <p className="font-medium text-destructive">
                  Failed to load coins
               </p>
               <p className="text-sm text-muted-foreground">
                  Please try again later
               </p>
            </div>
         </CardContent>
      </Card>
   )
}
