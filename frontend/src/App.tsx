import { BrowserRouter } from 'react-router-dom'
import Main from './pages/Main'
import Header from './components/layout/Header'

function App() {
   return (
      <BrowserRouter>
         <div className="min-h-screen bg-bg-primary text-text-primary transition-colors duration-300">
            <Header />
            <Main />
         </div>
      </BrowserRouter>
   )
}
export default App
