import { useState, useMemo, useCallback } from 'react'
import { Eye, Check, X, Package } from 'lucide-react'
import { useOrders } from '../../context/OrderContext'
import { useAuth } from '../../context/AuthContext'
import { ORDER_STATUS } from '../../constants/userRoles'
import { formatCurrency } from '../../utils/formatCurrency'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'

const Orders = () => {
  const { currentUser } = useAuth()
  const { getOrdersByFarmer, updateOrderStatus } = useOrders()
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [actionOrder, setActionOrder] = useState(null)

  const farmerOrders = useMemo(
    () => getOrdersByFarmer(currentUser?.id),
    [getOrdersByFarmer, currentUser?.id]
  )

  const sortedOrders = useMemo(
    () =>
      [...farmerOrders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [farmerOrders]
  )

  const handleStatusUpdate = useCallback(
    (orderId, status) => {
      updateOrderStatus(orderId, status)
      setActionOrder(null)
    },
    [updateOrderStatus]
  )

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'yellow',
      processing: 'blue',
      completed: 'green',
      cancelled: 'red',
    }
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>
  }

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600">Manage orders for your livestock</p>
      </div>

      <div className="card">
        <div className="card-body">
          {sortedOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No orders yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-auto w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-600">
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Buyer</th>
                    <th className="pb-3">Livestock</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedOrders.map((order) => (
                    <tr key={order.id} className="border-t border-gray-100">
                      <td className="py-3 text-sm">{order.id.slice(0, 8)}...</td>
                      <td className="py-3 text-sm">{order.buyerName || order.buyerId}</td>
                      <td className="py-3 text-sm">{order.livestockName}</td>
                      <td className="py-3 font-semibold text-green-600">
                        {formatCurrency(order.total || order.amount || 0)}
                      </td>
                      <td className="py-3">{getStatusBadge(order.orderStatus)}</td>
                      <td className="py-3 text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString('en-KE')}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {order.orderStatus === ORDER_STATUS.PENDING && (
                            <>
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => setActionOrder({ id: order.id, status: ORDER_STATUS.PROCESSING })}
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => setActionOrder({ id: order.id, status: ORDER_STATUS.CANCELLED })}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          {order.orderStatus === ORDER_STATUS.PROCESSING && (
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => setActionOrder({ id: order.id, status: ORDER_STATUS.COMPLETED })}
                            >
                              Complete
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} title="Order Details" size="md">
        {selectedOrder && (
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="font-medium">{selectedOrder.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Buyer</p>
                <p className="font-medium">{selectedOrder.buyerName || selectedOrder.buyerId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Livestock</p>
                <p className="font-medium">{selectedOrder.livestockName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Amount</p>
                <p className="font-medium text-green-600">{formatCurrency(selectedOrder.total || selectedOrder.amount || 0)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                {getStatusBadge(selectedOrder.orderStatus)}
              </div>
              <div>
                <p className="text-sm text-gray-600">Created</p>
                <p className="font-medium">{new Date(selectedOrder.createdAt).toLocaleString('en-KE')}</p>
              </div>
            </div>
            {selectedOrder.shippingAddress && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">Shipping Address</p>
                <p className="font-medium">{selectedOrder.shippingAddress}</p>
              </div>
            )}
          </div>
        )}
      </Modal>

      <Modal
        isOpen={!!actionOrder}
        onClose={() => setActionOrder(null)}
        title="Confirm Action"
        size="sm"
      >
        <p className="mb-4">
          Are you sure you want to mark this order as{' '}
          <span className="font-semibold">{actionOrder?.status}</span>?
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setActionOrder(null)}>
            Cancel
          </Button>
          <Button
            onClick={() => handleStatusUpdate(actionOrder.id, actionOrder.status)}
          >
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default Orders
