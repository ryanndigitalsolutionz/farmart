import { NavLink } from 'react-router-dom'
import { Home, Package, ClipboardList, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'

const MobileNav = () => {
  const { currentUser, isAdmin, isFarmer } = useAuth()
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()

  if (!currentUser) return null

  return (
    <nav className="mobile-nav">
      <NavLink to={isAdmin ? '/admin' : isFarmer ? '/farmer' : '/buyer'} className="mobile-nav-item">
        <Home size={20} />
      </NavLink>
      <NavLink to={isFarmer ? '/farmer/listings' : '/marketplace'} className="mobile-nav-item">
        <Package size={20} />
      </NavLink>
      <NavLink to={isFarmer ? '/farmer/orders' : '/buyer/cart'} className="mobile-nav-item">
        {isFarmer ? <ClipboardList size={20} /> : (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && <span className="mobile-nav-badge">{cartCount}</span>}
          </>
        )}
      </NavLink>
      <NavLink to={isFarmer ? '/farmer/profile' : '/buyer/wishlist'} className="mobile-nav-item">
        {isFarmer ? <User size={20} /> : (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishlistCount > 0 && <span className="mobile-nav-badge">{wishlistCount}</span>}
          </>
        )}
      </NavLink>
    </nav>
  )
}

export default MobileNav
