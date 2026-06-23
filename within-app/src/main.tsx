import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './print-overrides.css'
import './storybook-polish.css'
import './front-cover.css'
import './front-cover-fixes.css'
import './front-cover-bold.css'
import './grammar-fixes.ts'
import './front-cover.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
