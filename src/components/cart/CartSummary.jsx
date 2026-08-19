import { formatCurrency } from '../../utils/formatCurrency'
import { PLATFORM_FEE_RATE } from '../../constants/userRoles'

const CartSummary = ({ subtotal, platformFee, total, onCheckout, onClearCart }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
      </div>
      <div className="card-body">
        <div className="flex justify-between mb-3">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold text-gray-900">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between mb-3">
          <span className="text-gray-600">Platform Fee ({(PLATFORM_FEE_RATE * 100).toFixed(0)}%)</span>
          <span className="font-semibold text-gray-900">{formatCurrency(platformFee)}</span>
        </div>
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-green-600">{formatCurrency(total)}</span>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-3">
          <button className="btn btn-primary btn-md w-full" onClick={onCheckout}>
            Proceed to Checkout
          </button>
          <button className="btn btn-secondary btn-md w-full" onClick={onClearCart}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartSummary
