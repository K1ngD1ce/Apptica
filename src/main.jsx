import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './shared/styles/base/globals.scss'
import './shared/styles/variables/fonts.scss'
import './shared/styles/variables/vars.scss'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
