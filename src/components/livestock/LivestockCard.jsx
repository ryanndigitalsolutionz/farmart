import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart, MapPin, Eye, User } from 'lucide-react'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'
import { useNotifications } from '../../context/NotificationContext'
import { LIVESTOCK_TYPE_LABELS } from '../../constants/userRoles'
import LivestockPrice from './LivestockPrice'
import LivestockHealth from './LivestockHealth'

const LivestockCard = ({ listing, viewMode = 'grid', onClick, onWishlistToggle, onAddToCart, isWishlisted = false }) => {
  const navigate = useNavigate()
  const { isInWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { addNotification } = useNotifications()
  const [imageError, setImageError] = useState(false)

  const wishlisted = isInWishlist(listing.id) || isWishlisted

  const handleWishlistClick = (e) => {
    e.stopPropagation()
    if (onWishlistToggle) {
      onWishlistToggle()
    } else {
      const inWishlist = isInWishlist(listing.id)
      addNotification({
        type: inWishlist ? 'review_received' : 'listing_approved',
        title: inWishlist ? 'Removed from Wishlist' : 'Added to Wishlist',
        message: `${listing.name} has been ${inWishlist ? 'removed from' : 'added to'} your wishlist.`,
        link: '/buyer/wishlist',
      })
    }
  }

  const handleAddToCartClick = (e) => {
    e.stopPropagation()
    if (onAddToCart) {
      onAddToCart()
    } else {
      addToCart({
        livestockId: listing.id,
        name: listing.name,
        price: listing.price,
        image: listing.images?.[0],
        farmerId: listing.farmerId,
        farmerName: listing.farmerName,
      })
      addNotification({
        type: 'order_placed',
        title: 'Added to Cart',
        message: `${listing.name} has been added to your cart.`,
        link: '/buyer/cart',
      })
    }
  }

  const handleCardClick = () => {
    if (onClick) {
      onClick()
    } else {
      navigate(`/livestock/${listing.id}`)
    }
  }

  const primaryImage = listing.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image'

  if (viewMode === 'list') {
    return (
      <div className="card livestock-card-list" onClick={handleCardClick}>
        <div className="livestock-card-image-wrapper">
          {!imageError ? (
            <img
              src={primaryImage}
              alt={listing.name}
              className="livestock-card-image"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="livestock-card-image-placeholder">
              <Eye size={32} />
            </div>
          )}
          <div className="livestock-card-overlay">
            <span className="livestock-card-type">{LIVESTOCK_TYPE_LABELS[listing.type] || listing.type}</span>
          </div>
        </div>
        <div className="card-body livestock-card-body">
          <div className="livestock-card-main">
            <div className="livestock-card-info">
              <h3 className="livestock-card-title">{listing.name}</h3>
              <div className="livestock-card-meta">
                <span className="livestock-card-location">
                  <MapPin size={14} />
                  {listing.location}
                </span>
                <span className="livestock-card-farmer">
                  <User size={14} />
                  {listing.farmerName}
                </span>
              </div>
            </div>
            <div className="livestock-card-price-section">
              <LivestockPrice price={listing.price} size="lg" />
              <LivestockHealth healthStatus={listing.healthStatus} vaccinationStatus={listing.vaccinationStatus} />
            </div>
          </div>
          <div className="livestock-card-actions">
            <button className={`btn btn-sm ${wishlisted ? 'btn-primary' : 'btn-secondary'} wishlist-btn`} onClick={handleWishlistClick}>
              <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
            </button>
            <button className="btn btn-primary btn-sm cart-btn" onClick={handleAddToCartClick}>
              <ShoppingCart size={16} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card livestock-card" onClick={handleCardClick}>
      <div className="livestock-card-image-wrapper">
        {!imageError ? (
          <img
            src={primaryImage}
            alt={listing.name}
              className="livestock-card-image"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="livestock-card-image-placeholder">
              <Eye size={32} />
            </div>
          )}
        <div className="livestock-card-overlay">
          <span className="livestock-card-type">{LIVESTOCK_TYPE_LABELS[listing.type] || listing.type}</span>
        </div>
        <div className="livestock-card-actions-top">
          <button className={`btn btn-sm btn-icon ${wishlisted ? 'btn-primary' : 'btn-secondary'} wishlist-btn`} onClick={handleWishlistClick}>
            <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
      <div className="card-body livestock-card-body">
        <h3 className="livestock-card-title">{listing.name}</h3>
        <div className="livestock-card-meta">
          <span className="livestock-card-location">
            <MapPin size={14} />
            {listing.location}
          </span>
          <span className="livestock-card-farmer">
            <User size={14} />
            {listing.farmerName}
          </span>
        </div>
        <div className="livestock-card-footer">
          <LivestockPrice price={listing.price} size="md" />
          <LivestockHealth healthStatus={listing.healthStatus} vaccinationStatus={listing.vaccinationStatus} />
        </div>
        <button className="btn btn-primary btn-sm cart-btn w-full" onClick={handleAddToCartClick}>
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default LivestockCard
