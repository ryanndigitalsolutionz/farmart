import { useMemo } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { useLivestock } from '../../context/LivestockContext'
import { useOrders } from '../../context/OrderContext'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Users, Wheat, ShoppingCart, Package, DollarSign, TrendingUp } from 'lucide-react'

const AdminDashboard = () => {
  const { stats, getTransactions, getDisputes } = useAdmin()
  const { getPendingListings } = useLivestock()
  const { orders } = useOrders()

  const recentTransactions = useMemo(() => {
    return getTransactions().slice(0, 5)
  }, [getTransactions])

  const recentActivity = useMemo(() => {
    const activities = []
    orders.slice(0, 5).forEach((o) => {
      activities.push({
        id: `order-${o.id}`,
        message: `New order #${o.id.slice(0, 8)} placed by ${o.buyerName || 'a buyer'}`,
        time: o.createdAt,
      })
    })
    getPendingListings().slice(0, 3).forEach((l) => {
      activities.push({
        id: `listing-${l.id}`,
        message: `New listing "${l.name}" pending approval`,
        time: l.createdAt,
      })
    })
    getDisputes().slice(0, 3).forEach((d) => {
      activities.push({
        id: `dispute-${d.id}`,
        message: `Dispute #${d.id.slice(0, 8)} ${d.status}`,
        time: d.updatedAt || d.createdAt,
      })
    })
    return activities.sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 8)
  }, [orders, getPendingListings, getDisputes])

  const revenueData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    return months.map((m, i) => ({
      month: m,
      revenue: 100000 + i * 35000,
    }))
  }, [])

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'bg-blue-100 text-blue-600' },
    { label: 'Farmers', value: stats.totalFarmers, icon: Wheat, color: 'bg-green-100 text-green-600' },
    { label: 'Buyers', value: stats.totalBuyers, icon: ShoppingCart, color: 'bg-orange-100 text-orange-600' },
    { label: 'Active Listings', value: stats.activeListings, icon: Package, color: 'bg-purple-100 text-purple-600' },
    { label: 'Total Revenue', value: formatCurrency(stats.totalRevenue), icon: DollarSign, color: 'bg-emerald-100 text-emerald-600' },
    { label: 'Total Commission', value: formatCurrency(stats.totalCommission), icon: TrendingUp, color: 'bg-teal-100 text-teal-600' },
  ]

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Admin Dashboard</h1>
        <span className="text-sm text-gray-600">Welcome back, Admin</span>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <div className="card-header">
            <h3 className="font-semibold text-gray-900">Revenue Overview</h3>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(v) => `KSh ${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(value) => [formatCurrency(value), 'Revenue']} />
                <Bar dataKey="revenue" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="card-body">
            <div className="flex flex-col gap-3">
              {recentActivity.length === 0 ? (
                <p className="text-gray-600 text-center py-8">No recent activity</p>
              ) : (
                recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatDate(activity.time)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="font-semibold text-gray-900">Recent Transactions</h3>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <table className="table">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-4 text-sm font-semibold text-gray-600">ID</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Type</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Amount</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-8 text-gray-500">No transactions yet</td>
                </tr>
              ) : (
                recentTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 text-sm text-gray-900">{tx.id.slice(0, 12)}...</td>
                    <td className="p-4 text-sm text-gray-900">{tx.type}</td>
                    <td className="p-4 text-sm font-semibold text-gray-900">{formatCurrency(tx.amount)}</td>
                    <td className="p-4">
                      <span className={`badge badge-${tx.status === 'completed' || tx.status === 'paid' ? 'green' : tx.status === 'pending' ? 'yellow' : 'red'}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{formatDate(tx.date)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
