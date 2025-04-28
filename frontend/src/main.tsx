import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast'
import {BrowserRouter} from "react-router";
import { AuthProvider } from './context/authContext.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <AuthProvider>
    <App />
    <Toaster />
  </AuthProvider>
  </BrowserRouter>,
)
