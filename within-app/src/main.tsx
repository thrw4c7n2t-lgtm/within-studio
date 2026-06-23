import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './print-overrides.css'
import './storybook-polish.css'
import './workbook-enhancements.css'
import './grammar-fixes.ts'
import './workbook-enhancements.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
