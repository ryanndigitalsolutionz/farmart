import { formatCurrency } from '../../utils/formatCurrency'

const PaymentSummary = ({ items, subtotal, platformFee, total, paymentMethod }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
      </div>
      <div className="card-body">
        <div className="space-y-3 mb-4">
          {items.map((item) => (
            <div key={item.cartItemId} className="flex justify-between text-sm">
              <span className="text-gray-600 flex-1">
                {item.name} <span className="text-gray-400">x{item.quantity}</span>
              </span>
              <span className="font-semibold text-gray-900 ml-2">
                {formatCurrency(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 pt-3 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold text-gray-900">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Platform Fee (2%)</span>
            <span className="font-semibold text-gray-900">{formatCurrency(platformFee)}</span>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-xl font-bold text-green-600">{formatCurrency(total)}</span>
          </div>
        </div>
        {paymentMethod && (
          <div className="mt-4 bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-600">
              Payment Method: <span className="font-semibold text-gray-900 capitalize">
                {paymentMethod.replace(/_/g, ' ')}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentSummary
