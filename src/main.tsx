import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
    <Toaster
      position="bottom-left"
      reverseOrder={false}
    />
  </BrowserRouter>,
)
