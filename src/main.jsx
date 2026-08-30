import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { OrderProvider } from './context/OrderContext'
import { WishlistProvider } from './context/WishlistContext'
import { LivestockProvider } from './context/LivestockContext'
import { NotificationProvider } from './context/NotificationContext'
import { AdminProvider } from './context/AdminContext'
import ErrorBoundary from './pages/ErrorBoundary'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <NotificationProvider>
            <CartProvider>
              <OrderProvider>
                <WishlistProvider>
                  <LivestockProvider>
                    <AdminProvider>
                      <ErrorBoundary>
                        <App />
                      </ErrorBoundary>
                    </AdminProvider>
                  </LivestockProvider>
                </WishlistProvider>
              </OrderProvider>
            </CartProvider>
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
