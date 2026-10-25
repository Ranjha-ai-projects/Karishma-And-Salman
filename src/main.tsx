import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { IsolatedTestView } from './components/IsolatedTestView'

const isIsolatedMode = typeof window !== 'undefined' &&
  (new URLSearchParams(window.location.search).has('isolated') ||
   new URLSearchParams(window.location.search).has('debug') ||
   window.location.pathname === '/isolated');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isIsolatedMode ? <IsolatedTestView /> : <App />}
  </StrictMode>,
)

