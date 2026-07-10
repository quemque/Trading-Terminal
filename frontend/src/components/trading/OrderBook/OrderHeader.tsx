import { Badge } from '@/components/ui/badge'

export function OrderHeader() {
   return (
      <header className="flex justify-between items-center mb-4">
         <h1 className="text-lg font-semibold">Order Book</h1>
         <Badge variant="secondary" className="gap-1.5">
            <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
               <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Live
         </Badge>
      </header>
   )
}
