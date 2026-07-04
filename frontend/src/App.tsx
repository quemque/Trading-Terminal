import { BrowserRouter } from 'react-router-dom'
import Main from './components/ui/Main'
import Header from './components/Header'

function App() {
   return (
      <BrowserRouter>
         <div className="min-h-screen bg-bg-primary text-text-primary transition-colors duration-300">
            <Header />
            <main className="container mx-auto px-4 py-8">
               <Main />
            </main>
         </div>
      </BrowserRouter>
   )
}
export default App
