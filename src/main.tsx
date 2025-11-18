import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import './styles/globals.css'
import { ToastProvider } from './components/Toast'
import { StateProvider } from './lib/state'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastProvider>
      <StateProvider>
        <RouterProvider router={router} />
      </StateProvider>
    </ToastProvider>
  </React.StrictMode>
)
