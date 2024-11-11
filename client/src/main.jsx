import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast';
import App from './App.jsx'
import { AuthProvider } from '../store/auth.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
      <div>
        <Toaster/>
      </div>
      <App />
    </StrictMode>
  </AuthProvider>
)
