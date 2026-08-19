import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts'
import { TrendingUp, Package, Star } from 'lucide-react'
import { useOrders } from '../../context/OrderContext'
import { useLivestock } from '../../context/LivestockContext'
import { useAuth } from '../../context/AuthContext'
import { formatCurrency } from '../../utils/formatCurrency'
import { ORDER_STATUS } from '../../constants/userRoles'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

const Analytics = () => {
  const { currentUser } = useAuth()
  const { getOrdersByFarmer } = useOrders()
  const { getListingsByFarmer } = useLivestock()

  const farmerOrders = useMemo(() => getOrdersByFarmer(currentUser?.id), [getOrdersByFarmer, currentUser?.id])
  const farmerListings = useMemo(() => getListingsByFarmer(currentUser?.id), [getListingsByFarmer, currentUser?.id])

  const salesOverTime = useMemo(() => {
    const sales = farmerOrders
      .filter((o) => o.orderStatus === ORDER_STATUS.COMPLETED)
      .reduce((acc, order) => {
        const date = new Date(order.createdAt).toLocaleDateString('en-KE', {
          month: 'short',
          day: 'numeric',
        })
        acc[date] = (acc[date] || 0) + (order.total || order.amount || 0)
        return acc
      }, {})

    return Object.entries(sales)
      .map(([date, amount]) => ({ date, amount }))
      .slice(-7)
  }, [farmerOrders])

  const revenueBreakdown = useMemo(() => {
    const breakdown = farmerOrders
      .filter((o) => o.orderStatus === ORDER_STATUS.COMPLETED)
      .reduce((acc, order) => {
        const type = order.livestockType || 'other'
        acc[type] = (acc[type] || 0) + (order.total || order.amount || 0)
        return acc
      }, {})

    return Object.entries(breakdown).map(([type, value]) => ({
      name: type.charAt(0).toUpperCase() + type.slice(1),
      value,
    }))
  }, [farmerOrders])

  const popularTypes = useMemo(() => {
    const typeCounts = farmerListings.reduce((acc, l) => {
      acc[l.type] = (acc[l.type] || 0) + (l.views || 0)
      return acc
    }, {})

    return Object.entries(typeCounts)
      .map(([type, views]) => ({
        name: type.charAt(0).toUpperCase() + type.slice(1),
        views,
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5)
  }, [farmerListings])

  const topListings = useMemo(() => {
    return [...farmerListings]
      .filter((l) => l.status === 'sold' || l.views > 0)
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 5)
  }, [farmerListings])

  const totalRevenue = useMemo(() => {
    return farmerOrders
      .filter((o) => o.orderStatus === ORDER_STATUS.COMPLETED)
      .reduce((sum, o) => sum + (o.total || o.amount || 0), 0)
  }, [farmerOrders])

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Track your farm's performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card">
          <div className="card-body flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totalRevenue)}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Listings</p>
              <p className="text-2xl font-bold">{farmerListings.length}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold">
                {(farmerListings.reduce((sum, l) => sum + (l.rating || 0), 0) / (farmerListings.length || 1)).toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Sales Over Time</h3>
          </div>
          <div className="card-body">
            {salesOverTime.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No sales data yet</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Line type="monotone" dataKey="amount" stroke="#22c55e" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Revenue Breakdown</h3>
          </div>
          <div className="card-body">
            {revenueBreakdown.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No revenue data yet</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={revenueBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {revenueBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Popular Livestock Types</h3>
          </div>
          <div className="card-body">
            {popularTypes.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No data yet</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={popularTypes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="views" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Top Performing Listings</h3>
          </div>
          <div className="card-body">
            {topListings.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No data yet</p>
            ) : (
              <div className="space-y-3">
                {topListings.map((listing) => (
                  <div key={listing.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {listing.images?.[0] && (
                        <img
                          src={listing.images[0]}
                          alt={listing.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                      )}
                      <div>
                        <p className="font-medium text-sm">{listing.name}</p>
                        <p className="text-xs text-gray-600">{listing.views || 0} views</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-green-600">
                      {formatCurrency(listing.price)}
                    </span>
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

export default Analytics
