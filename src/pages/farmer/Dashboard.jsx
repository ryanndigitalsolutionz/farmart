import { useState } from 'react'
import { farmerDashboardData } from '../../data/farmerMockData'

function Dashboard() {
  const [data, setData] = useState(farmerDashboardData)

  return (
    <div className="dashboard">
      <h1>Farmer Dashboard</h1>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Listings</h3>
          <p>{data.totalListings}</p>
        </div>

        <div className="stat-card">
          <h3>Active Orders</h3>
          <p>{data.activeOrders}</p>
        </div>

        <div className="stat-card">
          <h3>Total Sales</h3>
          <p>KSh {data.totalSales}</p>
        </div>
      </div>

      <section>
        <h2>Recent Orders</h2>

        {data.recentOrders.map((order) => (
          <div key={order.id}>
            <strong>{order.buyer}</strong>
            <span>{order.status}</span>
            <span>KSh {order.amount}</span>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Dashboard