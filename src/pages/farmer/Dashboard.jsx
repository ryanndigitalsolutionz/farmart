import React, { useState } from 'react'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  PlusCircle, 
  Bell, 
  User, 
  LogOut, 
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function FarmerDashboard() {
  // Mock state for filter toggle (e.g., "This Month")
  const [timeFilter, setTimeFilter] = useState('This Month')
  
  // Mock data matching your Figma dashboard
  const stats = [
    { title: "Total Livestock", value: "42", icon: Package, change: "+3 this week" },
    { title: "Orders", value: "8", icon: ShoppingCart, change: "2 pending action" },
    { title: "Animals Sold", value: "24", icon: TrendingUp, change: "+12% vs last month" },
    { title: "Total Earnings", value: "KSh 1.2M", icon: DollarSign, change: "KSh 320K this month" }
  ]

  const recentOrders = [
    { id: "FM-1024", animal: "Angus Cow", price: "KSh 85,000", date: "10 May 2026", status: "Pending" },
    { id: "FM-1023", animal: "Boer Goat", price: "KSh 44,000", date: "9 May 2026", status: "Processing" },
    { id: "FM-1001", animal: "Dorper Sheep", price: "KSh 18,000", date: "8 May 2026", status: "Completed" }
  ]

  const myLivestock = [
    { name: "Angus Cow", details: "3 years • 420 kg", price: "KSh 85,000", status: "Available", statusColor: "bg-[var(--farm-green-soft)] text-[var(--farm-green-dark)]" },
    { name: "Boer Goat", details: "1.5 years • 45 kg", price: "KSh 22,000", status: "Available", statusColor: "bg-[var(--farm-green-soft)] text-[var(--farm-green-dark)]" },
    { name: "Dorper Sheep", details: "2 years • 56 kg", price: "KSh 18,000", status: "Reserved", statusColor: "bg-amber-50 text-amber-700" },
    { name: "Sahiwal Cow", details: "4 years • 500 kg", price: "KSh 95,000", status: "Sold", statusColor: "bg-red-50 text-red-700" }
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
            <Link to="/farmer/dashboard" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl bg-[var(--farm-green-soft)] text-[var(--farm-green-dark)] font-semibold">
              <LayoutDashboard className="w-5 h-5 text-[var(--farm-green)]" />
              <span>Dashboard</span>
            </Link>
            <Link to="/farmer/listings" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-[var(--farm-muted)] hover:bg-gray-50 hover:text-[var(--farm-green-dark)] transition-colors">
              <Package className="w-5 h-5" />
              <span>My Livestock</span>
            </Link>
            <Link to="/farmer/orders" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-[var(--farm-muted)] hover:bg-gray-50 hover:text-[var(--farm-green-dark)] transition-colors justify-between">
              <div className="flex items-center space-x-3">
                <ShoppingCart className="w-5 h-5" />
                <span>Orders</span>
              </div>
              <span className="px-2 py-0.5 text-xs font-bold bg-[var(--farm-green)] text-white rounded-full">8</span>
            </Link>
            <Link to="/farmer/create-listing" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-[var(--farm-muted)] hover:bg-gray-50 hover:text-[var(--farm-green-dark)] transition-colors">
              <PlusCircle className="w-5 h-5" />
              <span>Add Livestock</span>
            </Link>
            <Link to="/farmer/analytics" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-[var(--farm-muted)] hover:bg-gray-50 hover:text-[var(--farm-green-dark)] transition-colors">
              <DollarSign className="w-5 h-5" />
              <span>Earnings</span>
            </Link>
            <Link to="/farmer/reports" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-[var(--farm-muted)] hover:bg-gray-50 hover:text-[var(--farm-green-dark)] transition-colors">
              <FileText className="w-5 h-5" />
              <span>Reports</span>
            </Link>
            <Link to="/farmer/profile" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-[var(--farm-muted)] hover:bg-gray-50 hover:text-[var(--farm-green-dark)] transition-colors">
              <User className="w-5 h-5" />
              <span>Profile</span>
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
        
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <p className="text-sm text-[var(--farm-muted)]">Good morning, <span className="font-bold text-[var(--farm-green-dark)]">John Kamau 🌾</span></p>
            <h1 className="text-3xl font-bold font-[IBM_Plex_Serif] text-[var(--farm-green-dark)]">Green Valley Farm</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <select 
              value={timeFilter} 
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-4 py-2 bg-white border border-[var(--farm-green-border)] rounded-xl text-sm font-semibold text-[var(--farm-green-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--farm-green)]"
            >
              <option>This Month</option>
              <option>Last 3 Months</option>
              <option>This Year</option>
            </select>
          </div>
        </div>

        {/* Top Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="bg-white p-6 rounded-2xl border border-[var(--farm-green-border)] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-[var(--farm-muted)]">{item.title}</span>
                  <div className="p-2.5 rounded-xl bg-[var(--farm-green-soft)] text-[var(--farm-green)]">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-bold font-[IBM_Plex_Serif] text-[var(--farm-green-dark)] mb-1">
                  {item.value}
                </div>
                <p className="text-xs text-[var(--farm-muted)]">{item.change}</p>
              </div>
            )
          })}
        </div>

        {/* Middle Section: Revenue Chart & Recent Orders / Livestock */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Revenue Overview Chart Mock */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[var(--farm-green-border)] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold font-[IBM_Plex_Serif] text-[var(--farm-green-dark)]">Revenue Overview</h3>
              <span className="text-xs font-semibold px-3 py-1 bg-[var(--farm-green-soft)] text-[var(--farm-green-dark)] rounded-full">Active Growth</span>
            </div>
            
            {/* Visual chart representation matching figma */}
            <div className="h-64 w-full bg-[var(--farm-background)] rounded-xl border border-[var(--farm-green-border)] p-4 flex flex-col justify-end relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <TrendingUp className="w-32 h-32 text-[var(--farm-green)]" />
              </div>
              <div className="flex justify-between items-end h-48 px-2 relative z-10">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map((month, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div 
                      className="w-8 bg-gradient-to-t from-[var(--farm-green)] to-[#4ca366] rounded-t-lg transition-all duration-500 hover:opacity-90"
                      style={{ height: `${Math.max(30, (i + 2) * 22)}px` }}
                    ></div>
                    <span className="text-xs text-[var(--farm-muted)] font-medium">{month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders Widget */}
          <div className="bg-white p-6 rounded-2xl border border-[var(--farm-green-border)] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold font-[IBM_Plex_Serif] text-[var(--farm-green-dark)]">Recent Orders</h3>
                <Link to="/farmer/orders" className="text-xs font-semibold text-[var(--farm-green)] hover:underline">View all</Link>
              </div>

              <div className="space-y-3">
                {recentOrders.map((ord, i) => (
                  <div key={i} className="p-3 rounded-xl border border-[var(--farm-green-border)] bg-[var(--farm-background)] flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[var(--farm-green-dark)]">{ord.id} • {ord.animal}</p>
                      <p className="text-xs text-[var(--farm-muted)]">{ord.price} • {ord.date}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      ord.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                      ord.status === 'Processing' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      {ord.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Link 
              to="/farmer/orders"
              className="mt-4 w-full py-2.5 bg-[var(--farm-green)] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[var(--farm-green-dark)] transition-colors text-center block"
            >
              Manage All Orders
            </Link>
          </div>

        </div>

        {/* Bottom Livestock Table Preview */}
        <div className="mt-8 bg-white p-6 rounded-2xl border border-[var(--farm-green-border)] shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold font-[IBM_Plex_Serif] text-[var(--farm-green-dark)]">My Livestock Preview</h3>
            <Link to="/farmer/create-listing" className="inline-flex items-center px-4 py-2 rounded-xl bg-[var(--farm-green)] text-white text-xs font-semibold hover:bg-[var(--farm-green-dark)] transition-colors">
              <PlusCircle className="w-4 h-4 mr-1.5" /> Add New Livestock
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {myLivestock.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-[var(--farm-green-border)] bg-[var(--farm-background)] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-sm text-[var(--farm-green-dark)]">{item.name}</h4>
                    <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${item.statusColor}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--farm-muted)] mb-3">{item.details}</p>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-[var(--farm-green-border)]">
                  <span className="text-sm font-bold text-[var(--farm-green-dark)]">{item.price}</span>
                  <Link to="/farmer/listings" className="text-xs text-[var(--farm-green)] font-semibold hover:underline">Edit</Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  )
}