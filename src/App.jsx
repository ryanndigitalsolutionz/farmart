import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { LivestockProvider } from './context/LivestockContext'
import { OrderProvider } from './context/OrderContext'
import { NotificationProvider } from './context/NotificationContext'
import { AdminProvider } from './context/AdminContext'
import { ThemeProvider } from './context/ThemeContext'
import AppRoutes from './routes/AppRoutes'
import { useAuth } from './context/AuthContext'
import { Link } from 'react-router-dom'
import { Menu, X, ShoppingCart, Heart, Bell, Sun, Moon } from 'lucide-react'
import { useCart } from './context/CartContext'
import { useWishlist } from './context/WishlistContext'
import { useNotifications } from './context/NotificationContext'
import { useTheme } from './context/ThemeContext'
import './App.css'

const PublicLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { currentUser, logout } = useAuth()
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()
  const { unreadCount } = useNotifications()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="public-layout">
      <header className="public-header">
        <div className="public-header-inner">
          <Link to="/" className="public-logo">
            <span className="logo-icon">Farmart</span>
            <span className="logo-text">Farmart</span>
          </Link>

          <nav className="public-nav hidden md:flex">
            <Link to="/marketplace" className="public-nav-link">Marketplace</Link>
            <Link to="/wishlist" className="public-nav-link">Wishlist</Link>
            <Link to="/cart" className="public-nav-link">Cart</Link>
          </nav>

          <div className="public-header-actions">
            <Link to="/wishlist" className="public-icon-btn" aria-label="Wishlist">
              <Heart size={20} />
              {wishlistCount > 0 && <span className="header-badge">{wishlistCount}</span>}
            </Link>
            <Link to="/cart" className="public-icon-btn" aria-label="Cart">
              <ShoppingCart size={20} />
              {cartCount > 0 && <span className="header-badge">{cartCount}</span>}
            </Link>
            {currentUser && (
              <div className="public-notifications">
                <button className="public-icon-btn" aria-label="Notifications">
                  <Bell size={20} />
                  {unreadCount > 0 && <span className="header-badge">{unreadCount}</span>}
                </button>
              </div>
            )}
            <button
              className="public-icon-btn"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {currentUser ? (
              <div className="public-user-menu">
                <span className="public-user-name">{currentUser.name}</span>
                <button onClick={logout} className="public-logout-btn">Logout</button>
              </div>
            ) : (
              <div className="public-auth-btns">
                <Link to="/login" className="btn btn-secondary btn-sm">Login</Link>
                <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
              </div>
            )}
            <button className="mobile-menu-btn md:hidden" onClick={() => setMobileOpen(true)} aria-label="Menu">
              <Menu size={24} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="mobile-nav-overlay" onClick={() => setMobileOpen(false)}>
            <div className="mobile-nav-panel" onClick={(e) => e.stopPropagation()}>
               <div className="mobile-nav-header">
                 <span className="mobile-nav-logo">Farmart</span>
                 <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X size={24} />
                </button>
              </div>
              <nav className="mobile-nav-links">
                <Link to="/marketplace" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Marketplace</Link>
                <Link to="/wishlist" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Wishlist</Link>
                <Link to="/cart" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Cart</Link>
                {currentUser && (
                  <>
                    <Link to="/buyer" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                    <Link to="/buyer/orders" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Orders</Link>
                    <Link to="/buyer/profile" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Profile</Link>
                  </>
                )}
                {!currentUser && (
                  <>
                    <Link to="/login" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Login</Link>
                    <Link to="/register" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Register</Link>
                  </>
                )}
              </nav>
            </div>
          </div>
        )}
      </header>

      <main className="public-main">
        <AppRoutes />
      </main>

      <footer className="public-footer">
        <div className="public-footer-inner">
          <p>© {new Date().getFullYear()} Farmart. All rights reserved.</p>
          <p>Quality livestock. Fair prices. Trusted farmers.</p>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <LivestockProvider>
              <OrderProvider>
                <NotificationProvider>
                  <AdminProvider>
                    <ThemeProvider>
                      <PublicLayout />
                    </ThemeProvider>
                  </AdminProvider>
                </NotificationProvider>
              </OrderProvider>
            </LivestockProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
