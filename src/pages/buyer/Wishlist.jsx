import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Heart, Trash2 } from 'lucide-react'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/common/Button'
import { formatCurrency } from '../../utils/formatCurrency'
import { routes } from '../../constants/routes'

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleRemove = (livestockId) => {
    removeFromWishlist(livestockId)
  }

  const handleMoveToCart = (item) => {
    if (!isAuthenticated) {
      navigate(routes.LOGIN)
      return
    }
    addToCart(item)
    removeFromWishlist(item.livestockId)
  }

  const handleViewDetails = (id) => {
    navigate(routes.LIVESTOCK_DETAILS(id))
  }

  if (!wishlistItems.length) {
    return (
      <div className="max-w-4xl mx-auto w-full">
        <div className="card">
          <div className="card-body text-center py-12">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Save items you love by clicking the heart icon on any listing.</p>
            <Link to={routes.MARKETPLACE}>
              <Button variant="primary" size="md">
                Explore Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto w-full">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.livestockId} className="card">
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <button
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                onClick={() => handleRemove(item.livestockId)}
                aria-label="Remove from wishlist"
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
            </div>
            <div className="card-body">
              <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.breed || item.type}</p>
              <p className="text-green-600 font-bold text-lg mt-1">{formatCurrency(item.price)}</p>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleMoveToCart(item)}
                >
                  Move to Cart
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleViewDetails(item.livestockId)}
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WishlistPage
