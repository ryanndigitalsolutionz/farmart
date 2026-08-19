import { Menu, Bell, Search } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useNotifications } from '../../context/NotificationContext'

const Header = ({ onMenuClick }) => {
  const { currentUser, logout } = useAuth()
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()
  const { unreadCount, notifications, markAsRead } = useNotifications()

  return (
    <header className="header">
      <div className="header-left">
        <button className="header-menu-btn" onClick={onMenuClick} aria-label="Open menu">
          <Menu size={24} />
        </button>
        <div className="header-search">
          <Search size={18} />
          <input type="text" placeholder="Search livestock..." />
        </div>
      </div>

      <div className="header-right">
        <NavLink to="/wishlist" className="header-icon-btn" aria-label="Wishlist">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {wishlistCount > 0 && <span className="header-badge">{wishlistCount}</span>}
        </NavLink>

        <NavLink to="/cart" className="header-icon-btn" aria-label="Cart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {cartCount > 0 && <span className="header-badge">{cartCount}</span>}
        </NavLink>

        <div className="header-notifications">
          <button className="header-icon-btn" aria-label="Notifications">
            <Bell size={20} />
            {unreadCount > 0 && <span className="header-badge">{unreadCount}</span>}
          </button>
          {unreadCount > 0 && (
            <div className="notification-dropdown">
              {notifications.slice(0, 5).map((n) => (
                <div
                  key={n.id}
                  className={`notification-item ${n.read ? 'notification-read' : ''}`}
                  onClick={() => markAsRead(n.id)}
                >
                  <p className="notification-text">{n.message}</p>
                  <span className="notification-time">{new Date(n.createdAt).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="header-user">
          <span className="header-user-name">{currentUser?.name}</span>
          <button className="header-logout" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
