import { useMemo } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useOrders } from '../../context/OrderContext'
import { useLivestock } from '../../context/LivestockContext'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'
import { Package, Heart, DollarSign, CheckCircle } from 'lucide-react'

const BuyerDashboard = () => {
  const { currentUser } = useAuth()
  const { getOrdersByBuyer } = useOrders()
  const { getApprovedListings } = useLivestock()

  const buyerOrders = useMemo(() => {
    if (!currentUser) return []
    return getOrdersByBuyer(currentUser.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }, [currentUser, getOrdersByBuyer])

  const wishlistItems = useMemo(() => {
    return getApprovedListings().slice(0, 4)
  }, [getApprovedListings])

  const stats = useMemo(() => {
    const totalOrders = buyerOrders.length
    const completedOrders = buyerOrders.filter((o) => o.orderStatus === 'completed').length
    const totalSpent = buyerOrders.reduce((sum, o) => sum + (o.total || 0), 0)
    const wishlistCount = getApprovedListings().length
    return {
      totalOrders,
      completedOrders,
      totalSpent,
      wishlistCount,
    }
  }, [buyerOrders, getApprovedListings])

  const statCards = [
    { label: 'Total Orders', value: stats.totalOrders, icon: Package, color: 'bg-blue-100 text-blue-600' },
    { label: 'Wishlist Items', value: stats.wishlistCount, icon: Heart, color: 'bg-red-100 text-red-600' },
    { label: 'Total Spent', value: formatCurrency(stats.totalSpent), icon: DollarSign, color: 'bg-green-100 text-green-600' },
    { label: 'Completed', value: stats.completedOrders, icon: CheckCircle, color: 'bg-emerald-100 text-emerald-600' },
  ]

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Buyer Dashboard</h1>
        <span className="text-sm text-gray-600">Welcome back, {currentUser?.name}</span>
      </div>

      <div className="stats-grid mb-6">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className="stat-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="stat-label">{card.label}</p>
                  <p className="stat-value">{card.value}</p>
                </div>
                <div className={`stat-icon ${card.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="font-semibold text-gray-900">Recent Orders</h3>
          </div>
          <div className="card-body">
            {buyerOrders.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No orders yet. Start shopping!</p>
            ) : (
              <div className="flex flex-col gap-3">
                {buyerOrders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Order #{order.id.slice(0, 8)}</p>
                      <p className="text-xs text-gray-500">{order.livestockName || 'Livestock'}</p>
                      <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">{formatCurrency(order.total)}</p>
                      <span className={`badge badge-${order.orderStatus === 'completed' ? 'green' : order.orderStatus === 'pending' ? 'yellow' : 'red'}`}>
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="font-semibold text-gray-900">Wishlist Preview</h3>
          </div>
          <div className="card-body">
            {wishlistItems.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No wishlist items yet</p>
            ) : (
              <div className="flex flex-col gap-3">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <img src={item.images?.[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.breed}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{formatCurrency(item.price)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyerDashboard
