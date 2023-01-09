import 'reflect-metadata'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { container } from 'tsyringe'
import CartManager from 'utils/cart-manager/CartManager'
import { cartManagerToken } from 'utils/cart-manager/token'
import App from './App'

const cartManager = new CartManager()
container.registerInstance(cartManagerToken, cartManager)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
