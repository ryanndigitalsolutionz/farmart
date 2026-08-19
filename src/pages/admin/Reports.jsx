import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { useAuth } from '../../context/AuthContext'
import { useOrders } from '../../context/OrderContext'
import { useLivestock } from '../../context/LivestockContext'
import { formatCurrency } from '../../utils/formatCurrency'

const COLORS = ['#16a34a', '#f59e0b', '#dc2626', '#3b82f6', '#8b5cf6', '#ec4899']

const AdminReports = () => {
  const { usersList } = useAuth()
  const { orders } = useOrders()
  const { listings } = useLivestock()
  const [period, setPeriod] = useState('month')

  const userGrowthData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    return months.map((m, i) => ({
      month: m,
      users: 50 + i * 30,
      farmers: 20 + i * 15,
      buyers: 30 + i * 20,
    }))
  }, [])

  const orderVolumeData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    return months.map((m, i) => ({
      month: m,
      orders: 10 + i * 8,
      revenue: 100000 + i * 80000,
    }))
  }, [])

  const revenueBreakdown = useMemo(() => {
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0)
    const totalCommission = orders.reduce((sum, o) => sum + (o.platformFee || 0), 0)
    const farmerEarnings = totalRevenue - totalCommission
    return [
      { name: 'Farmer Earnings', value: farmerEarnings },
      { name: 'Platform Commission', value: totalCommission },
    ]
  }, [orders])

  const categoryDistribution = useMemo(() => {
    const categories = {}
    listings.forEach((l) => {
      categories[l.type] = (categories[l.type] || 0) + 1
    })
    return Object.entries(categories).map(([name, value]) => ({ name, value }))
  }, [listings])

  const totalRevenue = useMemo(() => orders.reduce((sum, o) => sum + (o.total || 0), 0), [orders])

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Reports & Analytics</h1>
        <select className="form-select" style={{ width: 'auto' }} value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      <div className="stats-grid mb-6">
        <div className="stat-card">
          <p className="stat-label">Total Revenue</p>
          <p className="stat-value">{formatCurrency(totalRevenue)}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Total Orders</p>
          <p className="stat-value">{orders.length}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Total Users</p>
          <p className="stat-value">{usersList.length}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Active Listings</p>
          <p className="stat-value">{listings.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <div className="card-header">
            <h3 className="font-semibold text-gray-900">User Growth</h3>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#16a34a" strokeWidth={2} />
                <Line type="monotone" dataKey="farmers" stroke="#f59e0b" strokeWidth={2} />
                <Line type="monotone" dataKey="buyers" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="font-semibold text-gray-900">Order Volume</h3>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={orderVolumeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="font-semibold text-gray-900">Revenue Breakdown</h3>
          </div>
          <div className="card-body">
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
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="font-semibold text-gray-900">Category Distribution</h3>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminReports
