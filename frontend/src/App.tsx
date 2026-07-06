import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import Header from './components/layout/Header'
import { NotFound } from './pages/NotFound'

function App() {
   return (
      <BrowserRouter>
         <div className="min-h-screen bg-bg-primary text-text-primary transition-colors duration-300">
            <Header />
            <Routes>
               <Route path="/" element={<Main />} />
               <Route path="*" element={<NotFound />} />
            </Routes>
         </div>
      </BrowserRouter>
   )
}
export default App
