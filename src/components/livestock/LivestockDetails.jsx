import { useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart, Phone, Mail, MapPin, Calendar, Weight, Ruler, User, Home, Share2, ChevronRight, Eye } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useNotifications } from '../../context/NotificationContext'
import { LIVESTOCK_TYPE_LABELS } from '../../constants/userRoles'
import { formatRelativeDate } from '../../utils/formatDate'
import { LISTING_STATUSES } from '../../constants/listings'
import LivestockPrice from './LivestockPrice'
import LivestockHealth from './LivestockHealth'
import LivestockGallery from './LivestockGallery'

const LivestockDetails = ({ listing, relatedListings = [], onAddToCart, onWishlistToggle, onContactFarmer }) => {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const { addNotification } = useNotifications()

  const wishlisted = isInWishlist(listing.id)

  const handleWishlistToggle = () => {
    if (onWishlistToggle) {
      onWishlistToggle()
    } else {
      toggleWishlist(listing)
      const inWishlist = isInWishlist(listing.id)
      addNotification({
        type: inWishlist ? 'review_received' : 'listing_approved',
        title: inWishlist ? 'Removed from Wishlist' : 'Added to Wishlist',
        message: `${listing.name} has been ${inWishlist ? 'removed from' : 'added to'} your wishlist.`,
        link: '/buyer/wishlist',
      })
    }
  }

  const handleAddToCart = () => {
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

  const handleContactFarmer = () => {
    if (onContactFarmer) {
      onContactFarmer()
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: listing.name,
        text: listing.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      addNotification({
        type: 'listing_approved',
        title: 'Link Copied',
        message: 'Listing link copied to clipboard.',
      })
    }
  }

  const statusConfig = LISTING_STATUSES.find((s) => s.value === listing.status)

  return (
    <div className="livestock-details">
      <div className="livestock-details-breadcrumb">
        <button className="breadcrumb-link" onClick={() => navigate('/marketplace')}>
          Marketplace
        </button>
        <ChevronRight size={16} />
        <span className="breadcrumb-current">{listing.name}</span>
      </div>

      <div className="livestock-details-content">
        <div className="livestock-details-left">
          <LivestockGallery images={listing.images} alt={listing.name} />
        </div>

        <div className="livestock-details-right">
          <div className="livestock-details-header">
            <div className="livestock-details-title-section">
              <h1 className="livestock-details-title">{listing.name}</h1>
              <div className="livestock-details-meta">
                <span className="livestock-details-type">{LIVESTOCK_TYPE_LABELS[listing.type] || listing.type}</span>
                {statusConfig && (
                  <span className={`livestock-details-status livestock-details-status-${statusConfig.color}`}>
                    {statusConfig.label}
                  </span>
                )}
              </div>
            </div>
            <div className="livestock-details-actions">
              <button className="btn btn-secondary btn-md" onClick={handleShare}>
                <Share2 size={18} />
              </button>
              <button className={`btn btn-md ${wishlisted ? 'btn-primary' : 'btn-secondary'} wishlist-btn`} onClick={handleWishlistToggle}>
                <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
                {wishlisted ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>

          <LivestockPrice price={listing.price} size="xl" />

          <div className="livestock-details-description">
            <p>{listing.description}</p>
          </div>

          <div className="livestock-details-info-grid">
            <div className="livestock-detail-item">
              <span className="livestock-detail-icon"><Ruler size={18} /></span>
              <div className="livestock-detail-content">
                <span className="livestock-detail-label">Breed</span>
                <span className="livestock-detail-value">{listing.breed}</span>
              </div>
            </div>
            <div className="livestock-detail-item">
              <span className="livestock-detail-icon"><Calendar size={18} /></span>
              <div className="livestock-detail-content">
                <span className="livestock-detail-label">Age</span>
                <span className="livestock-detail-value">{listing.age} {listing.age === 1 ? 'year' : 'years'}</span>
              </div>
            </div>
            <div className="livestock-detail-item">
              <span className="livestock-detail-icon"><Weight size={18} /></span>
              <div className="livestock-detail-content">
                <span className="livestock-detail-label">Weight</span>
                <span className="livestock-detail-value">{listing.weight} kg</span>
              </div>
            </div>
            <div className="livestock-detail-item">
              <span className="livestock-detail-icon"><MapPin size={18} /></span>
              <div className="livestock-detail-content">
                <span className="livestock-detail-label">Location</span>
                <span className="livestock-detail-value">{listing.location}</span>
              </div>
            </div>
          </div>

          <div className="livestock-details-health-section">
            <h3 className="livestock-section-title">Health & Vaccination</h3>
            <LivestockHealth healthStatus={listing.healthStatus} vaccinationStatus={listing.vaccinationStatus} showDetails />
          </div>

          <div className="livestock-details-farmer-card card">
            <div className="card-header">
              <h3 className="card-title">Farmer Information</h3>
            </div>
            <div className="card-body">
              <div className="farmer-info">
                <div className="farmer-avatar">
                  <User size={32} />
                </div>
                <div className="farmer-details">
                  <h4 className="farmer-name">{listing.farmerName}</h4>
                  <p className="farmer-farm">
                    <Home size={14} />
                    {listing.farmName}
                  </p>
                </div>
              </div>
              <div className="farmer-actions">
                <button className="btn btn-secondary btn-md" onClick={handleContactFarmer}>
                  <Phone size={18} />
                  Contact
                </button>
                <button className="btn btn-secondary btn-md" onClick={handleContactFarmer}>
                  <Mail size={18} />
                  Message
                </button>
              </div>
            </div>
          </div>

          <div className="livestock-details-cta">
            <button className="btn btn-primary btn-lg cart-cta" onClick={handleAddToCart}>
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </div>

          <div className="livestock-details-footer">
            <p className="livestock-details-views">
              <Eye size={16} />
              {listing.views || 0} views
            </p>
            <p className="livestock-details-date">
              Listed {formatRelativeDate(listing.createdAt)}
            </p>
          </div>
        </div>
      </div>

      {relatedListings.length > 0 && (
        <div className="livestock-details-related">
          <h2 className="related-listings-title">Related Listings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 gap-6">
            {relatedListings.map((item) => (
              <div key={item.id} className="card related-card" onClick={() => navigate(`/livestock/${item.id}`)}>
                <div className="related-card-image-wrapper">
                  <img src={item.images?.[0]} alt={item.name} className="related-card-image" />
                </div>
                <div className="card-body">
                  <h4 className="related-card-title">{item.name}</h4>
                  <LivestockPrice price={item.price} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default LivestockDetails
