import { useState, useMemo } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useOrders } from '../../context/OrderContext'
import { ORDER_STATUS } from '../../constants/userRoles'
import OrderCard from '../../components/orders/OrderCard'

const statusFilters = [
  { value: 'all', label: 'All' },
  { value: ORDER_STATUS.PENDING, label: 'Pending' },
  { value: ORDER_STATUS.PROCESSING, label: 'Processing' },
  { value: ORDER_STATUS.COMPLETED, label: 'Completed' },
  { value: ORDER_STATUS.CANCELLED, label: 'Cancelled' },
]

const BuyerOrders = () => {
  const { currentUser } = useAuth()
  const { getOrdersByBuyer } = useOrders()
  const [filter, setFilter] = useState('all')

  const orders = useMemo(() => {
    if (!currentUser) return []
    return getOrdersByBuyer(currentUser.id)
  }, [currentUser, getOrdersByBuyer])

  const filteredOrders = useMemo(() => {
    if (filter === 'all') return orders
    return orders.filter((o) => o.orderStatus === filter)
  }, [orders, filter])

  if (!currentUser) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Please log in to view your orders.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        <p className="text-gray-600 mt-1">Track and manage your orders</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {statusFilters.map((statusFilter) => (
          <button
            key={statusFilter.value}
            className={`btn ${filter === statusFilter.value ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            onClick={() => setFilter(statusFilter.value)}
          >
            {statusFilter.label}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-12">
            <p className="text-gray-500">No orders found.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onClick={() => window.location.hash = `#/buyer/orders/${order.id}`}
              showActions={false}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default BuyerOrders
