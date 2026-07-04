import { BrowserRouter } from 'react-router-dom'

import Header from './components/Header'

function App() {
   return (
      <BrowserRouter>
         <div className="min-h-screen bg-bg-primary text-text-primary transition-colors duration-300">
            <Header />
            <main className="container mx-auto px-4 py-8"></main>
         </div>
      </BrowserRouter>
   )
}
export default App
