function ConnectionStatus({ isConnected }: { isConnected: boolean }) {
   const statusColor = isConnected ? 'bg-green-500' : 'bg-red-500'
   const statusText = isConnected ? 'Live' : 'Offline'

   return (
      <div className="flex items-center gap-2 text-sm text-text-muted mr-4">
         <span className={`w-2 h-2 rounded-full ${statusColor}`} />
         {statusText}
      </div>
   )
}

export default ConnectionStatus
