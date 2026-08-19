import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'
import OrderStatus from './OrderStatus'

const OrderCard = ({ order, onClick, showActions = false, actionsRenderer }) => {
  return (
    <div className="card card-hover cursor-pointer" onClick={onClick}>
      <div className="card-body">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-sm font-semibold text-gray-900">Order #{order.id?.slice(-8).toUpperCase()}</p>
            <p className="text-xs text-gray-500 mt-1">{formatDate(order.createdAt)}</p>
          </div>
          <OrderStatus status={order.orderStatus} />
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Items</span>
            <span className="text-gray-900">{order.items?.length || 0} item(s)</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total</span>
            <span className="font-semibold text-gray-900">{formatCurrency(order.total)}</span>
          </div>
        </div>

        {showActions && actionsRenderer && (
          <div className="pt-3 border-t border-gray-100" onClick={(e) => e.stopPropagation()}>
            {actionsRenderer(order)}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderCard
