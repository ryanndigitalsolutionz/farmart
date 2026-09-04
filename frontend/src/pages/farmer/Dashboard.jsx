import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FaPlus,
  FaClipboardList,
  FaShoppingBag,
  FaChartLine,
  FaHome,
  FaStar,
  FaSyncAlt,
} from 'react-icons/fa'

const API_BASE_URL = 'http://localhost:5000'

function Dashboard() {
  const navigate = useNavigate()

  const [listings, setListings] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')

  const loadDashboard = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true)
    } else {
      setLoading(true)
    }

    setError('')

    try {
      const [livestockResponse, ordersResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/livestock`, {
          credentials: 'include',
        }),
        fetch(`${API_BASE_URL}/orders`, {
          credentials: 'include',
        }),
      ])

      const livestockData = await livestockResponse.json().catch(() => [])
      const ordersData = await ordersResponse.json().catch(() => [])

      if (!livestockResponse.ok) {
        throw new Error(
          livestockData.message ||
          livestockData.error ||
          'Unable to load your listings.'
        )
      }

      if (!ordersResponse.ok) {
        throw new Error(
          ordersData.message ||
          ordersData.error ||
          'Unable to load your orders.'
        )
      }

      setListings(
        Array.isArray(livestockData)
          ? livestockData
          : livestockData.livestock || []
      )

      setOrders(
        Array.isArray(ordersData)
          ? ordersData
          : ordersData.orders || []
      )
    } catch (err) {
      setError(
        err.message ||
        'Unable to connect to the Farmart server.'
      )
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadDashboard()
  }, [])

  const activeListings = listings.filter((listing) => {
    const availability = String(
      listing.availability || ''
    ).toLowerCase()

    const quantity = Number(listing.quantity || 0)

    return (
      quantity > 0 &&
      availability !== 'unavailable' &&
      availability !== 'inactive' &&
      availability !== 'sold out' &&
      availability !== 'sold'
    )
  })

  const pendingOrders = orders.filter(
    (order) =>
      String(order.status || '').toLowerCase() === 'pending'
  )

  const completedOrders = orders.filter(
    (order) =>
      String(order.status || '').toLowerCase() === 'completed'
  )

  const revenue = completedOrders.reduce(
    (total, order) =>
      total + Number(order.total_amount || 0),
    0
  )

  const stats = [
    {
      label: 'Total Listings',
      value: listings.length.toLocaleString(),
    },
    {
      label: 'Active Listings',
      value: activeListings.length.toLocaleString(),
    },
    {
      label: 'Pending Orders',
      value: pendingOrders.length.toLocaleString(),
    },
    {
      label: 'Completed Sales',
      value: completedOrders.length.toLocaleString(),
    },
    {
      label: 'Revenue',
      value: `KES ${revenue.toLocaleString()}`,
    },
    {
      label: 'Rating',
      value: '—',
      rating: true,
    },
  ]

  return (
    <>
      <style>{`
        .farmer-dashboard {
          min-height: 100vh;
          padding: 42px 36px 70px;
          background: var(--farm-background);
          color: var(--farm-text);
          box-sizing: border-box;
        }

        .farmer-dashboard-container {
          width: min(100%, 1450px);
          margin: 0 auto;
        }

        .farmer-dashboard-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 25px;
          margin-bottom: 30px;
        }

        .farmer-dashboard-title {
          margin: 0;
          color: var(--farm-text);
          font-family: "IBM Plex Serif", serif;
          font-size: clamp(30px, 4vw, 34px);
          line-height: 1.2;
        }

        .farmer-dashboard-subtitle {
          margin: 10px 0 0;
          color: var(--farm-muted);
          font-family: "Modern Antiqua", serif;
          font-size: 16px;
        }

        .farmer-refresh {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border: 1px solid var(--farm-green-border);
          border-radius: 11px;
          background: var(--farm-green-soft);
          color: var(--farm-text);
          font-family: "Modern Antiqua", serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .farmer-refresh:disabled {
          opacity: 0.6;
          cursor: wait;
        }

        .farmer-refresh-icon {
          display: inline-flex;
        }

        .farmer-refresh-icon.spinning {
          animation: farmer-spin 0.8s linear infinite;
        }

        @keyframes farmer-spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        .farmer-error {
          margin-bottom: 25px;
          padding: 15px 18px;
          border: 1px solid #d9aaa0;
          border-radius: 13px;
          background: rgba(178, 80, 62, 0.08);
          color: #b2503e;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
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
          border: 1px solid var(--farm-green-border);
          border-radius: 17px;
          background: var(--farm-green-soft);
          box-sizing: border-box;
        }

        .farmer-stat-label {
          color: var(--farm-muted);
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
        }

        .farmer-stat-value {
          color: var(--farm-text);
          font-family: "IBM Plex Serif", serif;
          font-size: 32px;
          font-weight: 700;
        }

        .farmer-stat-rating {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: var(--farm-gold);
        }

        .farmer-section {
          margin-top: 48px;
        }

        .farmer-section-title {
          margin: 0 0 22px;
          color: var(--farm-text);
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
          border: 1px solid var(--farm-green-border);
          border-radius: 14px;
          background: var(--farm-green-soft);
          color: var(--farm-text);
          font-family: "Modern Antiqua", serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: border-color 180ms ease, background 180ms ease, color 180ms ease;
        }

        .farmer-action:hover {
          border-color: var(--farm-green);
          color: var(--farm-green);
        }

        .farmer-action-primary {
          border-color: var(--farm-green);
          background: var(--farm-green);
          color: #ffffff;
        }

        .farmer-action-primary:hover {
          color: #ffffff;
          filter: brightness(1.05);
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
          border: 1px solid var(--farm-green-border);
          border-radius: 17px;
          background: var(--farm-green-soft);
          box-sizing: border-box;
        }

        .farmer-order-id {
          margin: 0;
          color: var(--farm-text);
          font-family: "IBM Plex Serif", serif;
          font-size: 18px;
          font-weight: 500;
        }

        .farmer-order-meta {
          margin: 8px 0 0;
          color: var(--farm-muted);
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
          text-transform: capitalize;
        }

        .farmer-order-status-pending {
          background: #f8edca;
          color: #96701d;
        }

        .farmer-order-status-completed {
          background: #d9f0df;
          color: #277a44;
        }

        .farmer-order-status-confirmed {
          background: #dcecf4;
          color: #35657a;
        }

        .farmer-order-status-cancelled {
          background: #f4deda;
          color: #a24637;
        }

        .farmer-empty {
          padding: 45px 25px;
          border: 1px solid var(--farm-green-border);
          border-radius: 17px;
          background: var(--farm-green-soft);
          text-align: center;
        }

        .farmer-empty h3 {
          margin: 0;
          color: var(--farm-text);
          font-family: "IBM Plex Serif", serif;
          font-size: 21px;
        }

        .farmer-empty p {
          margin: 10px 0 0;
          color: var(--farm-muted);
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
        }

        .farmer-loading {
          color: var(--farm-muted);
          font-family: "Modern Antiqua", serif;
        }

        @media (max-width: 700px) {
          .farmer-dashboard {
            padding: 30px 18px 55px;
          }

          .farmer-dashboard-header {
            align-items: flex-start;
            flex-direction: column;
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
            <div>
              <h1 className="farmer-dashboard-title">
                Your Farm Dashboard
              </h1>

              <p className="farmer-dashboard-subtitle">
                Here's what's happening on your farm today
              </p>
            </div>

            <button
              type="button"
              className="farmer-refresh"
              onClick={() => loadDashboard(true)}
              disabled={loading || refreshing}
            >
              <span
                className={`farmer-refresh-icon ${
                  refreshing ? 'spinning' : ''
                }`}
              >
                <FaSyncAlt size={13} />
              </span>
              Refresh
            </button>
          </header>

          {error && (
            <div className="farmer-error">
              {error}
            </div>
          )}

          {loading ? (
            <p className="farmer-loading">
              Loading your farm data...
            </p>
          ) : (
            <>
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
                          <FaStar size={18} />
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
                    <FaPlus size={16} />
                    Create Listing
                  </button>

                  <button
                    type="button"
                    className="farmer-action"
                    onClick={() =>
                      navigate('/farmer/listings')
                    }
                  >
                    <FaClipboardList size={16} />
                    Manage Listings
                  </button>

                  <button
                    type="button"
                    className="farmer-action"
                    onClick={() =>
                      navigate('/farmer/orders')
                    }
                  >
                    <FaShoppingBag size={16} />
                    View Orders
                  </button>

                  <button
                    type="button"
                    className="farmer-action"
                    onClick={() =>
                      navigate('/farmer/analytics')
                    }
                  >
                    <FaChartLine size={16} />
                    Analytics
                  </button>

                  <button
                    type="button"
                    className="farmer-action"
                    onClick={() =>
                      navigate('/farmer/farm-profile')
                    }
                  >
                    <FaHome size={16} />
                    Edit Farm Profile
                  </button>
                </div>
              </section>

              <section className="farmer-section">
                <h2 className="farmer-section-title">
                  Recent Orders
                </h2>

                {orders.length === 0 ? (
                  <div className="farmer-empty">
                    <h3>No orders yet</h3>
                    <p>
                      Orders containing your livestock will
                      appear here.
                    </p>
                  </div>
                ) : (
                  <div className="farmer-orders">
                    {orders.slice(0, 5).map((order) => {
                      const status = String(
                        order.status || ''
                      ).toLowerCase()

                      const statusClass =
                        status === 'pending'
                          ? 'farmer-order-status-pending'
                          : status === 'completed'
                            ? 'farmer-order-status-completed'
                            : status === 'confirmed'
                              ? 'farmer-order-status-confirmed'
                              : status === 'cancelled'
                                ? 'farmer-order-status-cancelled'
                                : ''

                      return (
                        <article
                          key={order.id}
                          className="farmer-order"
                        >
                          <div>
                            <p className="farmer-order-id">
                              #{order.id} —{' '}
                              {order.buyer?.name ||
                                'Farmart Buyer'}
                            </p>

                            <p className="farmer-order-meta">
                              {order.items?.length || 0}{' '}
                              item(s) · KES{' '}
                              {Number(
                                order.total_amount || 0
                              ).toLocaleString()}
                            </p>
                          </div>

                          <span
                            className={`farmer-order-status ${statusClass}`}
                          >
                            {status || 'Unknown'}
                          </span>
                        </article>
                      )
                    })}
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Dashboard
