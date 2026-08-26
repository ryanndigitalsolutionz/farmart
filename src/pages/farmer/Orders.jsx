import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Package, 
  ShoppingCart, 
  LayoutDashboard, 
  PlusCircle, 
  DollarSign, 
  LogOut, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Eye,
  Filter
} from 'lucide-react'

export default function FarmerOrders() {
  const [tab, setTab] = useState('All')

  // Mock data matching your Figma order management screen
  const [orders, setOrders] = useState([
    { 
      id: "FM-1024", 
      animal: "Angus Cow", 
      qty: 1, 
      price: "KSh 85,000", 
      total: "KSh 86,700", 
      buyer: "John Kamau", 
      phone: "0712 345 678", 
      location: "Nakuru, Kenya", 
      date: "10 May 2024", 
      status: "Pending", 
      payment: "Paid (M-Pesa)" 
    },
    { 
      id: "FM-1023", 
      animal: "Boer Goat", 
      qty: 2, 
      price: "KSh 44,000", 
      total: "KSh 89,700", 
      buyer: "Faith Wanjiku", 
      phone: "0722 987 654", 
      location: "Kajiado, Kenya", 
      date: "9 May 2024", 
      status: "Processing", 
      payment: "Paid (M-Pesa)" 
    },
    { 
      id: "FM-1021", 
      animal: "Dorper Sheep", 
      qty: 1, 
      price: "KSh 18,000", 
      total: "KSh 18,360", 
      buyer: "David Kiprono", 
      phone: "0733 112 233", 
      location: "Narok, Kenya", 
      date: "8 May 2024", 
      status: "Completed", 
      payment: "Paid (Card)" 
    },
    { 
      id: "FM-1018", 
      animal: "Sahiwal Cow", 
      qty: 1, 
      price: "KSh 95,000", 
      total: "KSh 96,900", 
      buyer: "Mercy Chebet", 
      phone: "0701 445 566", 
      location: "Meru, Kenya", 
      date: "4 May 2024", 
      status: "Cancelled", 
      payment: "Refunded" 
    }
  ])

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders.map(ord => ord.id === id ? { ...ord, status: newStatus } : ord))
  }

  const filteredOrders = tab === 'All' ? orders : orders.filter(o => o.status.toLowerCase() === tab.toLowerCase())

  return (
    <div className="min-h-screen bg-[var(--farm-background)] text-[var(--farm-text)] flex font-[Modern_Antiqua]">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-[var(--farm-green-border)] hidden lg:flex flex-col justify-between p-6">
        <div>
          <div className="flex items-center space-x-2 mb-10">
            <div className="p-2 rounded-xl bg-[var(--farm-green)] text-white">
              <Package className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold font-[IBM_Plex_Serif] text-[var(--farm-green-dark)]">Farmart</span>
          </div>

          <nav className="space-y-1.5">
            <Link to="/farmer/dashboard" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-[var(--farm-muted)] hover:bg-gray-50 hover:text-[var(--farm-green-dark)] transition-colors">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link to="/farmer/listings" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-[var(--farm-muted)] hover:bg-gray-50 hover:text-[var(--farm-green-dark)] transition-colors">
              <Package className="w-5 h-5" />
              <span>My Livestock</span>
            </Link>
            <Link to="/farmer/orders" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl bg-[var(--farm-green-soft)] text-[var(--farm-green-dark)] font-semibold justify-between">
              <div className="flex items-center space-x-3">
                <ShoppingCart className="w-5 h-5 text-[var(--farm-green)]" />
                <span>Orders</span>
              </div>
              <span className="px-2 py-0.5 text-xs font-bold bg-[var(--farm-green)] text-white rounded-full">
                {orders.filter(o => o.status === 'Pending').length}
              </span>
            </Link>
            <Link to="/farmer/create-listing" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-[var(--farm-muted)] hover:bg-gray-50 hover:text-[var(--farm-green-dark)] transition-colors">
              <PlusCircle className="w-5 h-5" />
              <span>Add Livestock</span>
            </Link>
            <Link to="/farmer/analytics" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-[var(--farm-muted)] hover:bg-gray-50 hover:text-[var(--farm-green-dark)] transition-colors">
              <DollarSign className="w-5 h-5" />
              <span>Earnings</span>
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-[var(--farm-green-border)]">
          <Link to="/login" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold font-[IBM_Plex_Serif] text-[var(--farm-green-dark)]">Manage Orders</h1>
            <p className="text-sm text-[var(--farm-muted)]">Review incoming buyer orders, process deliveries, and track transactions.</p>
          </div>
          
          {/* Tabs Filter */}
          <div className="flex bg-white p-1 rounded-xl border border-[var(--farm-green-border)] space-x-1">
            {['All', 'Pending', 'Processing', 'Completed', 'Cancelled'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  tab === t 
                    ? 'bg-[var(--farm-green)] text-white shadow-sm' 
                    : 'text-[var(--farm-muted)] hover:text-[var(--farm-green-dark)]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table Card */}
        <div className="bg-white rounded-2xl border border-[var(--farm-green-border)] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--farm-background)] border-b border-[var(--farm-green-border)] text-xs font-bold text-[var(--farm-muted)] uppercase tracking-wider">
                  <th className="py-4 px-6">Order ID & Animal</th>
                  <th className="py-4 px-6">Buyer Details</th>
                  <th className="py-4 px-6">Amount</th>
                  <th className="py-4 px-6">Payment</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--farm-green-border)] text-sm">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <p className="font-bold text-[var(--farm-green-dark)]">{ord.id}</p>
                        <p className="text-xs text-[var(--farm-muted)]">{ord.animal} (Qty: {ord.qty})</p>
                        <p className="text-xs text-[var(--farm-muted)]">{ord.date}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-semibold text-[var(--farm-green-dark)]">{ord.buyer}</p>
                        <p className="text-xs text-[var(--farm-muted)]">{ord.phone}</p>
                        <p className="text-xs text-[var(--farm-muted)]">{ord.location}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-bold text-[var(--farm-green-dark)]">{ord.total}</p>
                        <p className="text-xs text-[var(--farm-muted)]">Base: {ord.price}</p>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                          {ord.payment}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          ord.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                          ord.status === 'Processing' ? 'bg-blue-50 text-blue-700' :
                          ord.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                        }`}>
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        {ord.status === 'Pending' && (
                          <>
                            <button 
                              onClick={() => handleStatusChange(ord.id, 'Processing')}
                              className="px-3 py-1.5 bg-[var(--farm-green)] text-white text-xs font-bold rounded-lg hover:bg-[var(--farm-green-dark)] transition-colors"
                            >
                              Accept
                            </button>
                            <button 
                              onClick={() => handleStatusChange(ord.id, 'Cancelled')}
                              className="px-3 py-1.5 bg-red-100 text-red-700 text-xs font-bold rounded-lg hover:bg-red-200 transition-colors"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {ord.status === 'Processing' && (
                          <button 
                            onClick={() => handleStatusChange(ord.id, 'Completed')}
                            className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Mark Complete
                          </button>
                        )}
                        {ord.status !== 'Pending' && ord.status !== 'Processing' && (
                          <span className="text-xs text-[var(--farm-muted)] font-semibold italic">No actions needed</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-[var(--farm-muted)]">
                      No orders found under "{tab}" category.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  )
}