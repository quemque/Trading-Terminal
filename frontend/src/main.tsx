/// <reference types="vite/client" />
import './styles/index.css'
import { StrictMode } from 'react'
import App from './App'
import { createRoot } from 'react-dom/client'

import { initializeTheme } from './lib/theme'
import { initializeMockStream } from './lib/mock-stream'

initializeTheme()
initializeMockStream()

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')

createRoot(rootElement).render(
   <StrictMode>
      <App />
   </StrictMode>,
)
