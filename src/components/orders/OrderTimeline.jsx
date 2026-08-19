import { formatDate } from '../../utils/formatDate'
import { ORDER_STATUS } from '../../constants/userRoles'
import OrderStatus from './OrderStatus'

const OrderTimeline = ({ order }) => {
  const events = [
    {
      label: 'Order Placed',
      date: order.createdAt,
      description: `Order was placed by ${order.buyerName || 'buyer'}`,
    },
  ]

  if (order.updatedAt && order.updatedAt !== order.createdAt) {
    events.push({
      label: 'Order Updated',
      date: order.updatedAt,
      description: `Status changed to ${order.orderStatus}`,
    })
  }

  if (order.orderStatus === ORDER_STATUS.COMPLETED || order.orderStatus === ORDER_STATUS.CANCELLED) {
    events.push({
      label: order.orderStatus === ORDER_STATUS.COMPLETED ? 'Order Completed' : 'Order Cancelled',
      date: order.updatedAt,
      description: `Final status: ${order.orderStatus}`,
    })
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-lg font-semibold text-gray-900">Order Timeline</h3>
      </div>
      <div className="card-body">
        <div className="relative">
          {events.map((event, index) => (
            <div key={index} className="flex gap-4 pb-4 last:pb-0">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                {index < events.length - 1 && (
                  <div className="w-0.5 h-full bg-gray-200 mt-1"></div>
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-gray-900 text-sm">{event.label}</p>
                  <OrderStatus status={order.orderStatus} />
                </div>
                <p className="text-sm text-gray-600">{event.description}</p>
                <p className="text-xs text-gray-400 mt-1">{formatDate(event.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrderTimeline
