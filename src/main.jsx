import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./config/global.jsx"
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './context/Auth.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthContext>
      <App />
    </AuthContext>
    </BrowserRouter>
  </StrictMode>,
)
