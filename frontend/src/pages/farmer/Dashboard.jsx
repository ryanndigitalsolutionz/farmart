import { useNavigate } from 'react-router-dom'
import {
  LuClipboardList,
  LuShoppingBag,
  LuChartColumn,
  LuHouse,
  LuPlus,
} from 'react-icons/lu'
import { FaStar } from 'react-icons/fa'

function Dashboard() {
  const navigate = useNavigate()

  const stats = [
    {
      label: 'Total Listings',
      value: '2',
    },
    {
      label: 'Active Listings',
      value: '2',
    },
    {
      label: 'Pending Orders',
      value: '1',
    },
    {
      label: 'Completed Sales',
      value: '1',
    },
    {
      label: 'Revenue',
      value: 'KES 120,000',
    },
    {
      label: 'Rating',
      value: '4.8',
      rating: true,
    },
  ]

  const recentOrders = [
    {
      id: '#FM-2203',
      buyer: 'David Ochieng',
      items: '1 item(s)',
      amount: 'KES 33,000',
      status: 'Pending',
    },
    {
      id: '#FM-2201',
      buyer: 'Amina Wanjiru',
      items: '2 item(s)',
      amount: 'KES 87,000',
      status: 'Completed',
    },
  ]

  return (
    <>
      <style>{`
        .farmer-dashboard {
          min-height: 100vh;
          padding: 42px 36px 70px;
          background: #0d130f;
          box-sizing: border-box;
        }

        .farmer-dashboard-container {
          width: min(100%, 1450px);
          margin: 0 auto;
        }

        .farmer-dashboard-header {
          margin-bottom: 30px;
        }

        .farmer-dashboard-title {
          margin: 0;
          color: #edf4ee;
          font-family: "IBM Plex Serif", serif;
          font-size: clamp(30px, 4vw, 34px);
          line-height: 1.2;
        }

        .farmer-dashboard-subtitle {
          margin: 10px 0 0;
          color: #91a198;
          font-family: "Modern Antiqua", serif;
          font-size: 16px;
        }

        .farmer-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
          gap: 20px;
        }

        .farmer-stat-card {
          min-height: 136px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 25px 27px;
          border: 1px solid #1e2c23;
          border-radius: 17px;
          background: #172019;
          box-shadow:
            7px 7px 15px rgba(0, 0, 0, 0.18),
            -5px -5px 12px rgba(38, 52, 43, 0.15);
          box-sizing: border-box;
        }

        .farmer-stat-label {
          color: #82958a;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
        }

        .farmer-stat-value {
          color: #edf4ee;
          font-family: "IBM Plex Serif", serif;
          font-size: 32px;
          font-weight: 700;
        }

        .farmer-stat-rating {
          display: inline-flex;
          align-items: center;
          gap: 7px;
        }

        .farmer-stat-rating svg {
          color: #e6b947;
          fill: #e6b947;
        }

        .farmer-section {
          margin-top: 48px;
        }

        .farmer-section-title {
          margin: 0 0 22px;
          color: #edf4ee;
          font-family: "IBM Plex Serif", serif;
          font-size: 25px;
          font-weight: 500;
        }

        .farmer-actions {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
          gap: 14px;
        }

        .farmer-action {
          min-height: 67px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 0 20px;
          border: 1px solid #526259;
          border-radius: 14px;
          background: #172019;
          color: #edf4ee;
          font-family: "Modern Antiqua", serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition:
            border-color 180ms ease,
            background 180ms ease,
            color 180ms ease,
            box-shadow 180ms ease;
        }

        .farmer-action:hover {
          border-color: #72c9a3;
          background: #1b2820;
          color: #72c9a3;
          box-shadow: 0 8px 20px rgba(35, 75, 50, 0.18);
        }

        .farmer-action-primary {
          border-color: #277a44;
          background: #277a44;
          color: #ffffff;
        }

        .farmer-action-primary:hover {
          border-color: #4a9f7b;
          background: #328c51;
          color: #ffffff;
        }

        .farmer-orders {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .farmer-order {
          min-height: 104px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 20px 25px;
          border: 1px solid #718078;
          border-radius: 17px;
          background: #172019;
          box-sizing: border-box;
        }

        .farmer-order-id {
          margin: 0;
          color: #edf4ee;
          font-family: "IBM Plex Serif", serif;
          font-size: 18px;
          font-weight: 500;
        }

        .farmer-order-meta {
          margin: 8px 0 0;
          color: #71847a;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
        }

        .farmer-order-status {
          flex-shrink: 0;
          padding: 9px 18px;
          border-radius: 999px;
          font-family: "Modern Antiqua", serif;
          font-size: 13px;
          font-weight: 600;
        }

        .farmer-order-status-pending {
          background: #f8edca;
          color: #96701d;
        }

        .farmer-order-status-completed {
          background: #d9f0df;
          color: #277a44;
        }

        @media (max-width: 700px) {
          .farmer-dashboard {
            padding: 30px 18px 55px;
          }

          .farmer-order {
            align-items: flex-start;
            flex-direction: column;
          }

          .farmer-order-status {
            align-self: flex-start;
          }
        }
      `}</style>

      <div className="farmer-dashboard">
        <div className="farmer-dashboard-container">
          <header className="farmer-dashboard-header">
            <h1 className="farmer-dashboard-title">
              Welcome back, Jomo
            </h1>

            <p className="farmer-dashboard-subtitle">
              Here's what's happening on your farm today
            </p>
          </header>

          <section className="farmer-stats">
            {stats.map((stat) => (
              <article
                key={stat.label}
                className="farmer-stat-card"
              >
                <span className="farmer-stat-label">
                  {stat.label}
                </span>

                <span className="farmer-stat-value">
                  {stat.value}

                  {stat.rating && (
                    <span className="farmer-stat-rating">
                      <FaStar size={20} />
                    </span>
                  )}
                </span>
              </article>
            ))}
          </section>

          <section className="farmer-section">
            <h2 className="farmer-section-title">
              Quick Actions
            </h2>

            <div className="farmer-actions">
              <button
                type="button"
                className="farmer-action farmer-action-primary"
                onClick={() =>
                  navigate('/farmer/create-listing')
                }
              >
                <LuPlus size={18} />
                Create Listing
              </button>

              <button
                type="button"
                className="farmer-action"
                onClick={() =>
                  navigate('/farmer/listings')
                }
              >
                <LuClipboardList size={18} />
                Manage Listings
              </button>

              <button
                type="button"
                className="farmer-action"
                onClick={() =>
                  navigate('/farmer/orders')
                }
              >
                <LuShoppingBag size={18} />
                View Orders
              </button>

              <button
                type="button"
                className="farmer-action"
                onClick={() =>
                  navigate('/farmer/analytics')
                }
              >
                <LuChartColumn size={18} />
                Analytics
              </button>

              <button
                type="button"
                className="farmer-action"
                onClick={() =>
                  navigate('/farmer/farm-profile')
                }
              >
                <LuHouse size={18} />
                Edit Farm Profile
              </button>
            </div>
          </section>

          <section className="farmer-section">
            <h2 className="farmer-section-title">
              Recent Orders
            </h2>

            <div className="farmer-orders">
              {recentOrders.map((order) => (
                <article
                  key={order.id}
                  className="farmer-order"
                >
                  <div>
                    <p className="farmer-order-id">
                      {order.id} — {order.buyer}
                    </p>

                    <p className="farmer-order-meta">
                      {order.items} · {order.amount}
                    </p>
                  </div>

                  <span
                    className={`
                      farmer-order-status
                      ${
                        order.status === 'Pending'
                          ? 'farmer-order-status-pending'
                          : 'farmer-order-status-completed'
                      }
                    `}
                  >
                    {order.status}
                  </span>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Dashboard
// commit 21
