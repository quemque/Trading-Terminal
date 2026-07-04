import Error from './Error'
import Loading from './Loading'
import { useBitcoinPrice } from '../../hooks/useBitcoinPrice'

function Main() {
   const { data: priceData, isLoading, error, isError } = useBitcoinPrice()

   if (isLoading) {
      return <Loading />
   }

   if (isError) {
      return <Error message={error?.message || 'Something went wrong'} />
   }

   const currentPrice = priceData?.price

   return (
      <div className="max-w-4xl mx-auto p-6">
         <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
               ₿ Bitcoin Price
            </h1>
            <p className="text-gray-500">Live price from CoinGecko API</p>
         </div>

         <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-xl p-6 mb-8 text-white shadow-lg">
            <div className="flex items-center justify-between">
               <div>
                  <p className="text-sm opacity-80">Current Price</p>
                  <p className="text-4xl font-bold">
                     ${currentPrice?.toLocaleString() || 'N/A'}
                  </p>
               </div>
               <div className="text-right">
                  <div className="bg-white/20 rounded-lg px-4 py-2">
                     <span className="text-sm">USD</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Main
