import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import './index.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  <CartProvider>

    <StrictMode>

      <BrowserRouter >

        <App />

      </BrowserRouter>

    </StrictMode>

  </CartProvider>
)
