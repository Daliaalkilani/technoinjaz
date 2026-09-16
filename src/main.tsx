import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeLanguageProvider } from './context/ThemeLanguageContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeLanguageProvider>
      <App />
    </ThemeLanguageProvider>
  </StrictMode>,
)
