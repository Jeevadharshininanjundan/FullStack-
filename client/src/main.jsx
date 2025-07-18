import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {AuthProvider } from './context/AuthContext.jsx';

import App from './App.jsx'
import './index.css';
import { DashboardProvider } from './context/DashboardContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <DashboardProvider>
    <App />
    </DashboardProvider>
    </AuthProvider>
  </StrictMode>,
)
