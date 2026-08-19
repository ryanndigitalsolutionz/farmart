import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { DollarSign, TrendingUp, CreditCard, Wallet } from 'lucide-react'
import { useOrders } from '../../context/OrderContext'
import { useAuth } from '../../context/AuthContext'
import { formatCurrency } from '../../utils/formatCurrency'
import { ORDER_STATUS, PLATFORM_FEE_RATE } from '../../constants/userRoles'
import Button from '../../components/common/Button'

const Earnings = () => {
  const { currentUser } = useAuth()
  const { getOrdersByFarmer } = useOrders()
  const [showPayoutModal, setShowPayoutModal] = useState(false)

  const farmerOrders = useMemo(() => getOrdersByFarmer(currentUser?.id), [getOrdersByFarmer, currentUser?.id])

  const completedOrders = useMemo(
    () => farmerOrders.filter((o) => o.orderStatus === ORDER_STATUS.COMPLETED),
    [farmerOrders]
  )

  const earnings = useMemo(() => {
    const totalSales = completedOrders.reduce((sum, o) => sum + (o.total || o.amount || 0), 0)
    const platformFees = totalSales * PLATFORM_FEE_RATE
    const payouts = totalSales * 0.7
    const netEarnings = totalSales - platformFees

    return { totalSales, platformFees, payouts, netEarnings }
  }, [completedOrders])

  const earningsOverTime = useMemo(() => {
    const data = completedOrders.reduce((acc, order) => {
      const month = new Date(order.createdAt).toLocaleDateString('en-KE', {
        month: 'short',
        year: 'numeric',
      })
      acc[month] = (acc[month] || 0) + (order.total || order.amount || 0)
      return acc
    }, {})

    return Object.entries(data)
      .map(([month, amount]) => ({ month, amount }))
      .slice(-6)
  }, [completedOrders])

  const payoutHistory = useMemo(() => {
    return completedOrders.map((order) => ({
      id: order.id,
      amount: order.total || order.amount || 0,
      fee: (order.total || order.amount || 0) * PLATFORM_FEE_RATE,
      net: (order.total || order.amount || 0) * 0.7,
      date: order.createdAt,
      status: order.paymentStatus,
    }))
  }, [completedOrders])

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
          <p className="text-gray-600">Track your income and payouts</p>
        </div>
        <Button onClick={() => setShowPayoutModal(true)}>Request Payout</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card">
          <div className="card-body flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Sales</p>
              <p className="text-xl font-bold">{formatCurrency(earnings.totalSales)}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Platform Fees</p>
              <p className="text-xl font-bold text-red-600">{formatCurrency(earnings.platformFees)}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Wallet className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Net Earnings</p>
              <p className="text-xl font-bold text-blue-600">{formatCurrency(earnings.netEarnings)}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Payouts</p>
              <p className="text-xl font-bold text-purple-600">{formatCurrency(earnings.payouts)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-6">
        <div className="card-header">
          <h3 className="text-lg font-semibold">Earnings Over Time</h3>
        </div>
        <div className="card-body">
          {earningsOverTime.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No earnings data yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={earningsOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
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
          <h3 className="text-lg font-semibold">Payout History</h3>
        </div>
        <div className="card-body">
          {payoutHistory.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No payouts yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-auto w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-600">
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Fee</th>
                    <th className="pb-3">Net</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payoutHistory.map((payout) => (
                    <tr key={payout.id} className="border-t border-gray-100">
                      <td className="py-3 text-sm">{payout.id.slice(0, 8)}...</td>
                      <td className="py-3 font-semibold">{formatCurrency(payout.amount)}</td>
                      <td className="py-3 text-red-600">{formatCurrency(payout.fee)}</td>
                      <td className="py-3 font-semibold text-green-600">{formatCurrency(payout.net)}</td>
                      <td className="py-3 text-sm text-gray-600">
                        {new Date(payout.date).toLocaleDateString('en-KE')}
                      </td>
                      <td className="py-3">
                        <span className="badge badge-green">completed</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showPayoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Request Payout</h3>
            <p className="text-gray-600 mb-4">
              Request a payout of {formatCurrency(earnings.netEarnings)} to your M-Pesa account.
            </p>
            <div className="flex gap-3">
              <Button onClick={() => setShowPayoutModal(false)}>Confirm</Button>
              <Button variant="secondary" onClick={() => setShowPayoutModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Earnings
