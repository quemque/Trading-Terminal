import { Link } from 'react-router-dom'

export function NotFound() {
   return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
         <h1 className="text-6xl font-bold text-text-primary">404</h1>
         <p className="text-xl text-text-secondary mt-4">
            Oops! Page not found
         </p>
         <p className="text-text-muted mt-2">
            The page you are looking for does not exist.
         </p>
         <Link
            to="/"
            className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
         >
            Go Home
         </Link>
      </div>
   )
}
