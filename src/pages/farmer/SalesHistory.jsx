import { useState, useMemo } from 'react'
import { useOrders } from '../../context/OrderContext'
import { useAuth } from '../../context/AuthContext'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDateOnly } from '../../utils/formatDate'
import { ORDER_STATUS } from '../../constants/userRoles'
import Button from '../../components/common/Button'

const SalesHistory = () => {
  const { currentUser } = useAuth()
  const { getOrdersByFarmer } = useOrders()
  const [dateRange, setDateRange] = useState({ start: '', end: '' })

  const farmerOrders = useMemo(
    () => getOrdersByFarmer(currentUser?.id),
    [getOrdersByFarmer, currentUser?.id]
  )

  const completedOrders = useMemo(() => {
    return farmerOrders
      .filter((o) => o.orderStatus === ORDER_STATUS.COMPLETED)
      .filter((o) => {
        if (!dateRange.start && !dateRange.end) return true
        const orderDate = new Date(o.createdAt)
        if (dateRange.start && orderDate < new Date(dateRange.start)) return false
        if (dateRange.end && orderDate > new Date(dateRange.end)) return false
        return true
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }, [farmerOrders, dateRange])

  const totalSales = useMemo(
    () => completedOrders.reduce((sum, o) => sum + (o.total || o.amount || 0), 0),
    [completedOrders]
  )

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Sales History</h1>
        <p className="text-gray-600">View all your completed sales</p>
      </div>

      <div className="card mb-6">
        <div className="card-body">
          <div className="flex items-center gap-4">
            <div>
              <label className="form-label">From</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange((prev) => ({ ...prev, start: e.target.value }))}
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">To</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange((prev) => ({ ...prev, end: e.target.value }))}
                className="form-input"
              />
            </div>
            <div className="flex items-end">
              <Button
                variant="secondary"
                onClick={() => setDateRange({ start: '', end: '' })}
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card">
          <div className="card-body">
            <p className="text-sm text-gray-600">Total Sales</p>
            <p className="text-2xl font-bold">{completedOrders.length}</p>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(totalSales)}</p>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <p className="text-sm text-gray-600">Avg Sale Price</p>
            <p className="text-2xl font-bold">
              {formatCurrency(completedOrders.length > 0 ? totalSales / completedOrders.length : 0)}
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          {completedOrders.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No completed sales yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-auto w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-600">
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Buyer</th>
                    <th className="pb-3">Livestock</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {completedOrders.map((order) => (
                    <tr key={order.id} className="border-t border-gray-100">
                      <td className="py-3 text-sm">{order.id.slice(0, 8)}...</td>
                      <td className="py-3 text-sm">{order.buyerName || order.buyerId}</td>
                      <td className="py-3 text-sm">{order.livestockName}</td>
                      <td className="py-3 font-semibold text-green-600">
                        {formatCurrency(order.total || order.amount || 0)}
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {formatDateOnly(order.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SalesHistory
