import { useState, useMemo } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'

const AdminTransactions = () => {
  const { getTransactions } = useAdmin()
  const [dateFilter, setDateFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const transactions = useMemo(() => getTransactions(), [getTransactions])

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      if (dateFilter !== 'all') {
        const txDate = new Date(tx.date)
        const now = new Date()
        if (dateFilter === 'today') {
          if (txDate.toDateString() !== now.toDateString()) return false
        } else if (dateFilter === 'week') {
          const weekAgo = new Date(now.setDate(now.getDate() - 7))
          if (txDate < weekAgo) return false
        } else if (dateFilter === 'month') {
          const monthAgo = new Date(now.setMonth(now.getMonth() - 1))
          if (txDate < monthAgo) return false
        }
      }
      if (typeFilter !== 'all' && tx.type !== typeFilter) return false
      if (statusFilter !== 'all' && tx.status !== statusFilter) return false
      return true
    })
  }, [transactions, dateFilter, typeFilter, statusFilter])

  const summary = useMemo(() => {
    const total = filteredTransactions.reduce((sum, tx) => sum + (tx.amount || 0), 0)
    const completed = filteredTransactions.filter((tx) => tx.status === 'completed' || tx.status === 'paid').length
    const pending = filteredTransactions.filter((tx) => tx.status === 'pending').length
    const failed = filteredTransactions.filter((tx) => tx.status === 'failed').length
    return { total, completed, pending, failed }
  }, [filteredTransactions])

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Transactions</h1>
      </div>

      <div className="stats-grid mb-6">
        <div className="stat-card">
          <p className="stat-label">Total Amount</p>
          <p className="stat-value">{formatCurrency(summary.total)}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Completed</p>
          <p className="stat-value text-green-600">{summary.completed}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Pending</p>
          <p className="stat-value text-yellow-600">{summary.pending}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Failed</p>
          <p className="stat-value text-red-600">{summary.failed}</p>
        </div>
      </div>

      <div className="card mb-6">
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-group">
              <label className="form-label">Date</label>
              <select className="form-select" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Type</label>
              <select className="form-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                <option value="all">All Types</option>
                <option value="Order Payment">Order Payment</option>
                <option value="Refund">Refund</option>
                <option value="Payout">Payout</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body" style={{ padding: 0 }}>
          <div className="overflow-x-auto">
            <table className="table table-auto w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">ID</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Type</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">User</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Amount</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center p-8 text-gray-500">No transactions found</td>
                  </tr>
                ) : (
                  filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4 text-sm text-gray-900">{tx.id.slice(0, 12)}...</td>
                      <td className="p-4 text-sm text-gray-900">{tx.type}</td>
                      <td className="p-4 text-sm text-gray-900">{tx.buyerName || tx.farmerName || 'N/A'}</td>
                      <td className="p-4 text-sm font-semibold text-gray-900">{formatCurrency(tx.amount)}</td>
                      <td className="p-4">
                        <span className={`badge ${tx.status === 'completed' || tx.status === 'paid' ? 'badge-green' : tx.status === 'pending' ? 'badge-yellow' : 'badge-red'}`}>
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
    </div>
  )
}

export default AdminTransactions
