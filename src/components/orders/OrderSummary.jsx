import { formatCurrency } from '../../utils/formatCurrency'

const OrderSummary = ({ subtotal, platformFee, total, paymentMethod, paymentStatus }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
      </div>
      <div className="card-body">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold text-gray-900">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Platform Fee (2%)</span>
            <span className="font-semibold text-gray-900">{formatCurrency(platformFee)}</span>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-2">
            <span className="font-bold text-gray-900">Total</span>
            <span className="font-bold text-green-600">{formatCurrency(total)}</span>
          </div>
        </div>
        <div className="mt-4 bg-gray-50 rounded-lg p-3 space-y-2">
          {paymentMethod && (
            <p className="text-sm text-gray-600">
              Payment Method: <span className="font-semibold text-gray-900 capitalize">
                {paymentMethod.replace(/_/g, ' ')}
              </span>
            </p>
          )}
          {paymentStatus && (
            <p className="text-sm text-gray-600">
              Payment Status: <span className="font-semibold text-gray-900 capitalize">{paymentStatus}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
