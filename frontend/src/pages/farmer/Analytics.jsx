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

function Analytics() {
  // Temporary frontend data.
  // This will later come from the backend.
  const revenueData = [
    { date: 'Aug 17', revenue: 87000 },
    { date: 'Aug 20', revenue: 45000 },
    { date: 'Aug 23', revenue: 62000 },
    { date: 'Aug 26', revenue: 33000 },
  ]

  const salesData = [
    { date: 'Aug 17', quantity: 1 },
    { date: 'Aug 20', quantity: 3 },
    { date: 'Aug 23', quantity: 2 },
    { date: 'Aug 26', quantity: 1 },
  ]

  const categoryData = [
    { name: 'Cattle', value: 4 },
    { name: 'Goats', value: 3 },
    { name: 'Sheep', value: 2 },
    { name: 'Poultry', value: 5 },
    { name: 'Pigs', value: 1 },
  ]

  const orderStatusData = [
    { name: 'Pending', value: 2 },
    { name: 'Processing', value: 1 },
    { name: 'Shipped', value: 1 },
    { name: 'Delivered', value: 4 },
    { name: 'Cancelled', value: 1 },
  ]

  return (
    <>
      <style>{`
        .analytics-page {
          min-height: 100vh;
          padding: 42px 36px 70px;
          background: #0d130f;
          color: #edf4ee;
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
          color: #edf4ee;
          font-family: "IBM Plex Serif", serif;
          font-size: 34px;
        }

        .analytics-subtitle {
          margin: 9px 0 0;
          color: #91a198;
          font-family: "Modern Antiqua", serif;
          font-size: 16px;
        }

        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
        }

        .analytics-card {
          min-width: 0;
          padding: 27px 28px;
          border: 1px solid #718078;
          border-radius: 20px;
          background: #172019;
          box-sizing: border-box;
        }

        .analytics-card-wide {
          grid-column: 1 / -1;
        }

        .analytics-card-title {
          margin: 0 0 25px;
          color: #edf4ee;
          font-family: "IBM Plex Serif", serif;
          font-size: 22px;
        }

        .analytics-chart {
          width: 100%;
          height: 330px;
        }

        .analytics-tooltip {
          background: #101710;
          border: 1px solid #718078;
          border-radius: 10px;
          padding: 10px 13px;
        }

        .analytics-tooltip p {
          margin: 0;
          color: #edf4ee;
          font-family: "Modern Antiqua", serif;
          font-size: 13px;
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

          <section className="analytics-grid">

            {/* Revenue */}
            <article className="analytics-card analytics-card-wide">
              <h2 className="analytics-card-title">
                Revenue Over Time
              </h2>

              <div className="analytics-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid
                      strokeDasharray="4 5"
                    />

                    <XAxis dataKey="date" />

                    <YAxis />

                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="revenue"
                      name="Revenue"
                      stroke="#35a45d"
                      strokeWidth={3}
                      dot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </article>

            {/* Sales volume */}
            <article className="analytics-card analytics-card-wide">
              <h2 className="analytics-card-title">
                Sales Volume
              </h2>

              <div className="analytics-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid
                      strokeDasharray="4 5"
                    />

                    <XAxis dataKey="date" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="quantity"
                      name="Quantity Sold"
                      fill="#277a44"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </article>

            {/* Category distribution */}
            <article className="analytics-card">
              <h2 className="analytics-card-title">
                Category Distribution
              </h2>

              <div className="analytics-chart">
                <ResponsiveContainer width="100%" height="100%">
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
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`category-${index}`}
                        />
                      ))}
                    </Pie>

                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </article>

            {/* Order status */}
            <article className="analytics-card">
              <h2 className="analytics-card-title">
                Order Status Distribution
              </h2>

              <div className="analytics-chart">
                <ResponsiveContainer width="100%" height="100%">
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
                      {orderStatusData.map((entry, index) => (
                        <Cell
                          key={`status-${index}`}
                        />
                      ))}
                    </Pie>

                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </article>

          </section>
        </div>
      </main>
    </>
  )
}

export default Analytics
// commit 19
