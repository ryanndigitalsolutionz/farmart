import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Package,
  ClipboardList,
  TrendingUp,
  DollarSign,
  Bell,
  CheckCircle,
} from 'lucide-react'
import { useLivestock } from '../../context/LivestockContext'
import { useOrders } from '../../context/OrderContext'
import { useNotifications } from '../../context/NotificationContext'
import { useAuth } from '../../context/AuthContext'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatRelativeDate } from '../../utils/formatDate'
import { ORDER_STATUS, NOTIFICATION_TYPES } from '../../constants/userRoles'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'

const Dashboard = () => {
  const { currentUser } = useAuth()
  const { getListingsByFarmer } = useLivestock()
  const { getOrdersByFarmer } = useOrders()
  const { notifications } = useNotifications()
  const navigate = useNavigate()

  const farmerListings = useMemo(() => getListingsByFarmer(currentUser?.id), [getListingsByFarmer, currentUser?.id])
  const farmerOrders = useMemo(() => getOrdersByFarmer(currentUser?.id), [getOrdersByFarmer, currentUser?.id])

  const stats = useMemo(() => {
    const totalLivestock = farmerListings.length
    const totalOrders = farmerOrders.length
    const animalsSold = farmerListings.filter((l) => l.status === 'sold').length
    const totalEarnings = farmerOrders
      .filter((o) => o.orderStatus === ORDER_STATUS.COMPLETED)
      .reduce((sum, o) => sum + (o.total || 0), 0)

    return { totalLivestock, totalOrders, animalsSold, totalEarnings }
  }, [farmerListings, farmerOrders])

  const recentOrders = useMemo(() => {
    return [...farmerOrders]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
  }, [farmerOrders])

  const listingStatusCounts = useMemo(() => {
    return farmerListings.reduce((acc, l) => {
      acc[l.status] = (acc[l.status] || 0) + 1
      return acc
    }, {})
  }, [farmerListings])

  const recentNotifications = useMemo(() => {
    return notifications.slice(0, 5)
  }, [notifications])

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'yellow',
      approved: 'green',
      rejected: 'red',
      sold: 'blue',
      draft: 'gray',
      reserved: 'purple',
      suspended: 'red',
    }
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>
  }

  const getOrderStatusBadge = (status) => {
    const variants = {
      pending: 'yellow',
      processing: 'blue',
      completed: 'green',
      cancelled: 'red',
    }
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case NOTIFICATION_TYPES.ORDER_PLACED:
        return <Package className="w-5 h-5 text-blue-600" />
      case NOTIFICATION_TYPES.LISTING_APPROVED:
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case NOTIFICATION_TYPES.PAYOUT_COMPLETED:
        return <DollarSign className="w-5 h-5 text-green-600" />
      default:
        return <Bell className="w-5 h-5 text-gray-600" />
    }
  }

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Farmer Dashboard</h1>
        <p className="text-gray-600">Welcome back, {currentUser?.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card">
          <div className="card-body flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Livestock</p>
              <p className="text-2xl font-bold">{stats.totalLivestock}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <ClipboardList className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold">{stats.totalOrders}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Animals Sold</p>
              <p className="text-2xl font-bold">{stats.animalsSold}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(stats.totalEarnings)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <div className="card-header flex justify-between items-center">
            <h3 className="text-lg font-semibold">Recent Orders</h3>
            <Button variant="secondary" size="sm" onClick={() => navigate('/farmer/orders')}>
              View All
            </Button>
          </div>
          <div className="card-body">
            {recentOrders.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No orders yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-auto w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-600">
                      <th className="pb-2">Order ID</th>
                      <th className="pb-2">Item</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-t border-gray-100">
                        <td className="py-3 text-sm">{order.id.slice(0, 8)}...</td>
                        <td className="py-3 text-sm">{order.livestockName}</td>
                        <td className="py-3">{getOrderStatusBadge(order.orderStatus)}</td>
                        <td className="py-3 text-sm text-gray-600">{formatRelativeDate(order.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header flex justify-between items-center">
            <h3 className="text-lg font-semibold">My Livestock</h3>
            <Button variant="secondary" size="sm" onClick={() => navigate('/farmer/listings')}>
              View All
            </Button>
          </div>
          <div className="card-body">
            {farmerListings.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No listings yet</p>
            ) : (
              <div className="space-y-3">
                {farmerListings.slice(0, 5).map((listing) => (
                  <div key={listing.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {listing.images?.[0] && (
                        <img
                          src={listing.images[0]}
                          alt={listing.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <div>
                        <p className="font-medium text-sm">{listing.name}</p>
                        <p className="text-xs text-gray-600">{formatCurrency(listing.price)}</p>
                      </div>
                    </div>
                    {getStatusBadge(listing.status)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Listing Status</h3>
          </div>
          <div className="card-body">
            {Object.keys(listingStatusCounts).length === 0 ? (
              <p className="text-gray-500 text-center py-4">No listings</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(listingStatusCounts).map(([status, count]) => (
                  <div key={status} className="flex items-center justify-between">
                    <span className="text-gray-700 capitalize">{status}</span>
                    <span className="font-semibold">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="card lg:col-span-2">
          <div className="card-header flex justify-between items-center">
            <h3 className="text-lg font-semibold">Notifications</h3>
            <Button variant="secondary" size="sm" onClick={() => navigate('/farmer/notifications')}>
              View All
            </Button>
          </div>
          <div className="card-body">
            {recentNotifications.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No notifications</p>
            ) : (
              <div className="space-y-3">
                {recentNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-3 p-3 rounded-lg ${
                      notification.read ? 'bg-gray-50' : 'bg-blue-50'
                    }`}
                  >
                    <span className="text-xl">{getNotificationIcon(notification.type)}</span>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{notification.title}</p>
                      <p className="text-xs text-gray-500">{formatRelativeDate(notification.createdAt)}</p>
                    </div>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    )}
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

export default Dashboard
