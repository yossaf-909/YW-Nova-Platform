import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './providers/AuthProvider'
import { AppSettingsProvider } from './providers/AppSettingsProvider'
import { PortfolioProvider } from './providers/PortfolioProvider'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppSettingsProvider>
        <AuthProvider>
          <PortfolioProvider>
            <App />
          </PortfolioProvider>
        </AuthProvider>
      </AppSettingsProvider>
    </BrowserRouter>
  </StrictMode>,
)
