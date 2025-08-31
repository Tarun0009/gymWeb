import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from "./context/CartContext";

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>    
        <CartProvider>
          <App />
        </CartProvider>
    </Router>
  </StrictMode>,
)
