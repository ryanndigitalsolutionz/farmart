import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  DollarSign, 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  LayoutDashboard, 
  PlusCircle, 
  LogOut, 
  Download,
  Calendar,
  CheckCircle2
} from 'lucide-react'

export default function FarmerAnalytics() {
  const [timeFilter, setTimeFilter] = useState('This Month')

  // Mock data for payouts matching Figma
  const payouts = [
    { id: "PR-001", date: "13 May 2024", amount: "KSh 313,600", status: "Completed", method: "M-Pesa • 0712 345 678" },
    { id: "PR-002", date: "5 May 2024", amount: "KSh 307,200", status: "Completed", method: "M-Pesa • 0712 345 678" },
    { id: "PR-003", date: "25 Apr 2024", amount: "KSh 150,000", status: "Completed", method: "M-Pesa • 0712 345 678" }
  ]

  const salesHistory = [
    { id: "FM-1024", animal: "Angus Cow", price: "KSh 85,000", date: "2 May 2024", buyer: "John Kamau" },
    { id: "FM-1006", animal: "Sahiwal Cow", price: "KSh 95,000", date: "28 Apr 2024", buyer: "Faith Wanjiku" },
    { id: "FM-1003", animal: "Boer Goat", price: "KSh 22,000", date: "25 Apr 2024", buyer: "David Kiprono" }
  ]

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
            <Link to="/farmer/orders" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-[var(--farm-muted)] hover:bg-gray-50 hover:text-[var(--farm-green-dark)] transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span>Orders</span>
            </Link>
            <Link to="/farmer/create-listing" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-[var(--farm-muted)] hover:bg-gray-50 hover:text-[var(--farm-green-dark)] transition-colors">
              <PlusCircle className="w-5 h-5" />
              <span>Add Livestock</span>
            </Link>
            <Link to="/farmer/analytics" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl bg-[var(--farm-green-soft)] text-[var(--farm-green-dark)] font-semibold">
              <DollarSign className="w-5 h-5 text-[var(--farm-green)]" />
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
            <h1 className="text-3xl font-bold font-[IBM_Plex_Serif] text-[var(--farm-green-dark)]">Earnings & Payouts</h1>
            <p className="text-sm text-[var(--farm-muted)]">Track your total livestock revenue, platform fees, and M-Pesa payouts.</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <select 
              value={timeFilter} 
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-4 py-2 bg-white border border-[var(--farm-green-border)] rounded-xl text-sm font-semibold text-[var(--farm-green-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--farm-green)]"
            >
              <option>This Month</option>
              <option>Last 3 Months</option>
              <option>This Year</option>
            </select>
            <button 
              onClick={() => alert('Requesting manual payout settlement...')}
              className="px-4 py-2 bg-[var(--farm-green)] text-white text-xs font-bold rounded-xl hover:bg-[var(--farm-green-dark)] transition-colors shadow-sm"
            >
              Request Payout
            </button>
          </div>
        </div>

        {/* Top Earnings Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-[var(--farm-green-border)] shadow-sm">
            <p className="text-sm font-medium text-[var(--farm-muted)] mb-2">Total Earnings ({timeFilter})</p>
            <h3 className="text-3xl font-bold font-[IBM_Plex_Serif] text-[var(--farm-green-dark)] mb-2">KSh 320,000</h3>
            <p className="text-xs text-[var(--farm-green)] font-semibold flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" /> +15.4% from last month
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[var(--farm-green-border)] shadow-sm">
            <p className="text-sm font-medium text-[var(--farm-muted)] mb-2">Platform Fee (2%)</p>
            <h3 className="text-3xl font-bold font-[IBM_Plex_Serif] text-amber-700 mb-2">KSh 6,400</h3>
            <p className="text-xs text-[var(--farm-muted)]">Direct marketplace maintenance fee</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[var(--farm-green-border)] shadow-sm">
            <p className="text-sm font-medium text-[var(--farm-muted)] mb-2">Total Sold (All Time)</p>
            <h3 className="text-3xl font-bold font-[IBM_Plex_Serif] text-[var(--farm-green-dark)] mb-2">24 Animals</h3>
            <p className="text-xs text-[var(--farm-muted)]">Across Cattle, Goats & Sheep</p>
          </div>
        </div>

        {/* Two-Column Grid: Payout History & Recent Sales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Payout History */}
          <div className="bg-white p-6 rounded-2xl border border-[var(--farm-green-border)] shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold font-[IBM_Plex_Serif] text-[var(--farm-green-dark)]">Payout History</h3>
              <span className="text-xs font-semibold text-[var(--farm-muted)]">Automated M-Pesa</span>
            </div>

            <div className="space-y-4">
              {payouts.map((pay, i) => (
                <div key={i} className="p-4 rounded-xl border border-[var(--farm-green-border)] bg-[var(--farm-background)] flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-bold text-sm text-[var(--farm-green-dark)]">{pay.id}</span>
                      <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700">{pay.status}</span>
                    </div>
                    <p className="text-xs text-[var(--farm-muted)]">{pay.method} • {pay.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-[var(--farm-green-dark)]">{pay.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sales History */}
          <div className="bg-white p-6 rounded-2xl border border-[var(--farm-green-border)] shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold font-[IBM_Plex_Serif] text-[var(--farm-green-dark)]">Recent Sales History</h3>
              <span className="text-xs font-semibold text-[var(--farm-muted)]">Direct Sales</span>
            </div>

            <div className="space-y-4">
              {salesHistory.map((sale, i) => (
                <div key={i} className="p-4 rounded-xl border border-[var(--farm-green-border)] bg-[var(--farm-background)] flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm text-[var(--farm-green-dark)]">{sale.id} • {sale.animal}</p>
                    <p className="text-xs text-[var(--farm-muted)]">Buyer: {sale.buyer} • {sale.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-[var(--farm-green-dark)]">{sale.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>
    </div>
  )
}