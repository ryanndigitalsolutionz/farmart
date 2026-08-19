import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import Button from '../common/Button'
import { routes } from '../../constants/routes'

const CartEmpty = () => {
  return (
    <div className="card">
      <div className="card-body text-center py-12">
        <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Looks like you haven't added any livestock to your cart yet.</p>
        <Link to={routes.MARKETPLACE}>
          <Button variant="primary" size="md">
            Browse Marketplace
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default CartEmpty
