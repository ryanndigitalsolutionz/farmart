import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CartList from '../../components/cart/CartList'
import CartSummary from '../../components/cart/CartSummary'
import CartEmpty from '../../components/cart/CartEmpty'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { routes } from '../../constants/routes'

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, subtotal, platformFee, total } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  const handleUpdateQuantity = (cartItemId, quantity) => {
    updateQuantity(cartItemId, quantity)
  }

  const handleRemoveItem = (cartItemId) => {
    removeFromCart(cartItemId)
  }

  const handleClearCart = () => {
    clearCart()
    setShowClearConfirm(false)
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate(routes.LOGIN)
      return
    }
    navigate(routes.BUYER_CHECKOUT)
  }

  if (!cartItems.length) {
    return <CartEmpty />
  }

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setShowClearConfirm(true)}
        >
          Clear Cart
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CartList
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemoveItem}
          />
        </div>
        <div className="lg:col-span-1">
          <CartSummary
            subtotal={subtotal}
            platformFee={platformFee}
            total={total}
            onCheckout={handleCheckout}
            onClearCart={() => setShowClearConfirm(true)}
          />
        </div>
      </div>
      <ConfirmDialog
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={handleClearCart}
        title="Clear Cart"
        message="Are you sure you want to remove all items from your cart? This action cannot be undone."
        confirmText="Clear All"
      />
    </div>
  )
}

export default CartPage
