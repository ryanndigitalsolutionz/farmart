import { useEffect, useState } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

const API_BASE_URL = 'http://localhost:5000'

function Analytics() {
  const [analytics, setAnalytics] = useState(null)
  const [revenueData, setRevenueData] = useState([])
  const [salesData, setSalesData] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [orderStatusData, setOrderStatusData] =
    useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(
          `${API_BASE_URL}/analytics`,
          {
            credentials: 'include',
          },
        )

        const data = await response.json().catch(
          () => ({}),
        )

        if (!response.ok) {
          throw new Error(
            data.message ||
              data.error ||
              'Unable to load analytics.',
          )
        }

        setAnalytics(
          data.analytics || null,
        )

        setRevenueData(
          Array.isArray(data.revenue_data)
            ? data.revenue_data
            : [],
        )

        setSalesData(
          Array.isArray(data.sales_data)
            ? data.sales_data
            : [],
        )

        setCategoryData(
          Array.isArray(data.category_data)
            ? data.category_data
            : [],
        )

        setOrderStatusData(
          Array.isArray(
            data.order_status_data,
          )
            ? data.order_status_data
            : [],
        )
      } catch (loadError) {
        setError(
          loadError.message ||
            'Unable to connect to the Farmart server.',
        )
      } finally {
        setLoading(false)
      }
    }

    loadAnalytics()
  }, [])

  const formatDate = (value) => {
    if (!value) {
      return value
    }

    const parsedDate = new Date(value)

    if (Number.isNaN(parsedDate.getTime())) {
      return value
    }

    return parsedDate.toLocaleDateString(
      'en-KE',
      {
        month: 'short',
        day: 'numeric',
      },
    )
  }

  const formatPrice = (value) => {
    return `KES ${Number(
      value || 0,
    ).toLocaleString('en-KE')}`
  }

  return (
    <>
      <style>{`
        .analytics-page {
          min-height: 100vh;
          padding: 42px 36px 70px;
          background: var(--farm-background);
          color: var(--farm-text);
          box-sizing: border-box;
        }

        .analytics-container {
          width: min(100%, 1250px);
          margin: 0 auto;
        }

        .analytics-header {
          margin-bottom: 32px;
        }

        .analytics-title {
          margin: 0;
          color: var(--farm-text);
          font-family: "IBM Plex Serif", serif;
          font-size: 34px;
        }

        .analytics-subtitle {
          margin: 9px 0 0;
          color: var(--farm-muted);
          font-family: "Modern Antiqua", serif;
          font-size: 16px;
        }

        .analytics-message {
          margin-bottom: 22px;
          padding: 14px 16px;
          border-radius: 12px;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          line-height: 1.5;
        }

        .analytics-message.error {
          border: 1px solid rgba(223, 128, 98, 0.35);
          background: rgba(223, 128, 98, 0.1);
          color: #df8062;
        }

        .analytics-message.loading {
          border: 1px solid var(--farm-green-border);
          background: var(--farm-green-soft);
          color: var(--farm-muted);
        }

        .analytics-summary {
          display: grid;
          grid-template-columns:
            repeat(4, minmax(0, 1fr));
          gap: 18px;
          margin-bottom: 22px;
        }

        .analytics-summary-card {
          padding: 21px 22px;
          border: 1px solid var(--farm-green-border);
          border-radius: 17px;
          background: var(--farm-green-soft);
          box-sizing: border-box;
        }

        .analytics-summary-label {
          display: block;
          color: var(--farm-muted);
          font-family: "Modern Antiqua", serif;
          font-size: 13px;
        }

        .analytics-summary-value {
          display: block;
          margin-top: 8px;
          color: var(--farm-text);
          font-family: "IBM Plex Serif", serif;
          font-size: 26px;
          font-weight: 700;
        }

        .analytics-grid {
          display: grid;
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
          gap: 22px;
        }

        .analytics-card {
          min-width: 0;
          padding: 27px 28px;
          border: 1px solid var(--farm-green-border);
          border-radius: 20px;
          background: var(--farm-green-soft);
          box-sizing: border-box;
        }

        .analytics-card-wide {
          grid-column: 1 / -1;
        }

        .analytics-card-title {
          margin: 0 0 25px;
          color: var(--farm-text);
          font-family: "IBM Plex Serif", serif;
          font-size: 22px;
        }

        .analytics-chart {
          width: 100%;
          height: 330px;
        }

        .analytics-empty {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px dashed var(--farm-green-border);
          border-radius: 12px;
          color: var(--farm-muted);
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          text-align: center;
        }

        .analytics-tooltip {
          background: var(--farm-background);
          border: 1px solid var(--farm-green-border);
          border-radius: 10px;
          padding: 10px 13px;
        }

        .analytics-tooltip p {
          margin: 0;
          color: var(--farm-text);
          font-family: "Modern Antiqua", serif;
          font-size: 13px;
        }

        .recharts-default-tooltip {
          border-color: var(--farm-green-border) !important;
          background: var(--farm-background) !important;
        }

        .recharts-tooltip-label {
          color: var(--farm-text) !important;
        }

        @media (max-width: 950px) {
          .analytics-summary {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 800px) {
          .analytics-page {
            padding: 30px 18px 55px;
          }

          .analytics-grid {
            grid-template-columns: 1fr;
          }

          .analytics-card-wide {
            grid-column: auto;
          }

          .analytics-chart {
            height: 280px;
          }
        }

        @media (max-width: 550px) {
          .analytics-summary {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <main className="analytics-page">
        <div className="analytics-container">
          <header className="analytics-header">
            <h1 className="analytics-title">
              Analytics
            </h1>

            <p className="analytics-subtitle">
              Insights into your farm performance
            </p>
          </header>

          {error && (
            <div className="analytics-message error">
              {error}
            </div>
          )}

          {loading && (
            <div className="analytics-message loading">
              Loading your analytics...
            </div>
          )}

          <section className="analytics-summary">
            <article className="analytics-summary-card">
              <span className="analytics-summary-label">
                Total Listings
              </span>

              <strong className="analytics-summary-value">
                {analytics?.total_listings ?? 0}
              </strong>
            </article>

            <article className="analytics-summary-card">
              <span className="analytics-summary-label">
                Total Sales
              </span>

              <strong className="analytics-summary-value">
                {analytics?.total_sales ?? 0}
              </strong>
            </article>

            <article className="analytics-summary-card">
              <span className="analytics-summary-label">
                Total Revenue
              </span>

              <strong className="analytics-summary-value">
                {formatPrice(
                  analytics?.total_revenue,
                )}
              </strong>
            </article>

            <article className="analytics-summary-card">
              <span className="analytics-summary-label">
                Total Views
              </span>

              <strong className="analytics-summary-value">
                {analytics?.total_views ?? 0}
              </strong>
            </article>
          </section>

          <section className="analytics-grid">
            <article className="analytics-card analytics-card-wide">
              <h2 className="analytics-card-title">
                Revenue Over Time
              </h2>

              <div className="analytics-chart">
                {revenueData.length === 0 ? (
                  <div className="analytics-empty">
                    No completed sales revenue data yet.
                  </div>
                ) : (
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <LineChart
                      data={revenueData}
                    >
                      <CartesianGrid
                        strokeDasharray="4 5"
                        stroke="var(--farm-green-border)"
                      />

                      <XAxis
                        dataKey="date"
                        tickFormatter={formatDate}
                        stroke="var(--farm-muted)"
                      />

                      <YAxis
                        stroke="var(--farm-muted)"
                      />

                      <Tooltip
                        formatter={(value) =>
                          formatPrice(value)
                        }
                        contentStyle={{
                          background:
                            'var(--farm-background)',
                          borderColor:
                            'var(--farm-green-border)',
                          borderRadius: '10px',
                          color:
                            'var(--farm-text)',
                        }}
                      />

                      <Line
                        type="monotone"
                        dataKey="revenue"
                        name="Revenue"
                        stroke="var(--farm-mint)"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </article>

            <article className="analytics-card analytics-card-wide">
              <h2 className="analytics-card-title">
                Sales Volume
              </h2>

              <div className="analytics-chart">
                {salesData.length === 0 ? (
                  <div className="analytics-empty">
                    No completed sales volume data yet.
                  </div>
                ) : (
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <BarChart
                      data={salesData}
                    >
                      <CartesianGrid
                        strokeDasharray="4 5"
                        stroke="var(--farm-green-border)"
                      />

                      <XAxis
                        dataKey="date"
                        tickFormatter={formatDate}
                        stroke="var(--farm-muted)"
                      />

                      <YAxis
                        allowDecimals={false}
                        stroke="var(--farm-muted)"
                      />

                      <Tooltip
                        contentStyle={{
                          background:
                            'var(--farm-background)',
                          borderColor:
                            'var(--farm-green-border)',
                          borderRadius: '10px',
                          color:
                            'var(--farm-text)',
                        }}
                      />

                      <Bar
                        dataKey="quantity"
                        name="Quantity Sold"
                        fill="var(--green-700)"
                        radius={[
                          8,
                          8,
                          0,
                          0,
                        ]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </article>

            <article className="analytics-card">
              <h2 className="analytics-card-title">
                Category Distribution
              </h2>

              <div className="analytics-chart">
                {categoryData.length === 0 ? (
                  <div className="analytics-empty">
                    No completed sales by category yet.
                  </div>
                ) : (
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <PieChart>
                      <Pie
                        data={categoryData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="45%"
                        outerRadius="65%"
                        label
                      >
                        {categoryData.map(
                          (entry, index) => (
                            <Cell
                              key={`category-${index}`}
                              fill={
                                [
                                  'var(--green-700)',
                                  'var(--farm-mint)',
                                  'var(--farm-gold)',
                                  'var(--farm-brown)',
                                  'var(--farm-olive)',
                                ][
                                  index %
                                    5
                                ]
                              }
                            />
                          ),
                        )}
                      </Pie>

                      <Tooltip
                        contentStyle={{
                          background:
                            'var(--farm-background)',
                          borderColor:
                            'var(--farm-green-border)',
                          borderRadius: '10px',
                          color:
                            'var(--farm-text)',
                        }}
                      />

                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </article>

            <article className="analytics-card">
              <h2 className="analytics-card-title">
                Order Status Distribution
              </h2>

              <div className="analytics-chart">
                {orderStatusData.length === 0 ? (
                  <div className="analytics-empty">
                    No orders available yet.
                  </div>
                ) : (
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <PieChart>
                      <Pie
                        data={orderStatusData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="45%"
                        outerRadius="65%"
                        label
                      >
                        {orderStatusData.map(
                          (entry, index) => (
                            <Cell
                              key={`status-${index}`}
                              fill={
                                [
                                  'var(--farm-gold)',
                                  'var(--green-700)',
                                  'var(--farm-mint)',
                                  'var(--farm-brown)',
                                ][
                                  index %
                                    4
                                ]
                              }
                            />
                          ),
                        )}
                      </Pie>

                      <Tooltip
                        contentStyle={{
                          background:
                            'var(--farm-background)',
                          borderColor:
                            'var(--farm-green-border)',
                          borderRadius: '10px',
                          color:
                            'var(--farm-text)',
                        }}
                      />

                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </article>
          </section>
        </div>
      </main>
    </>
  )
}

export default Analytics
