import { useState } from 'react'
import { FaTrash, FaBoxOpen } from 'react-icons/fa'
import ConfirmDialog from '../../components/common/ConfirmDialog'

function Orders() {
  const [activeFilter, setActiveFilter] = useState('All')

  const [orders, setOrders] = useState([
    {
      id: '#FM-2203',
      buyer: 'David Ochieng',
      items: 1,
      date: '8/26/2026',
      amount: 33000,
      status: 'Pending',
    },
    {
      id: '#FM-2201',
      buyer: 'Amina Wanjiru',
      items: 1,
      date: '8/17/2026',
      amount: 87000,
      status: 'Delivered',
    },
  ])

  const [orderToCancel, setOrderToCancel] = useState(null)

  const filters = [
    'All',
    'Pending',
    'Processing',
    'Shipped',
    'Delivered',
    'Cancelled',
  ]

  const filteredOrders =
    activeFilter === 'All'
      ? orders
      : orders.filter(
          (order) => order.status === activeFilter,
        )

  const formatPrice = (amount) => {
    return `KES ${amount.toLocaleString()}`
  }

  const handleCancelOrder = () => {
    if (!orderToCancel) return

    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderToCancel.id
          ? {
              ...order,
              status: 'Cancelled',
            }
          : order,
      ),
    )

    setOrderToCancel(null)
  }

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
            }
          : order,
      ),
    )
  }

  return (
    <>
      <style>{`
        .farmer-orders-page {
          min-height: 100vh;
          padding: 42px 36px 70px;
          background: #0d130f;
          color: #edf4ee;
          box-sizing: border-box;
        }

        .farmer-orders-container {
          width: min(100%, 1200px);
          margin: 0 auto;
        }

        .farmer-orders-header {
          margin-bottom: 30px;
        }

        .farmer-orders-title {
          margin: 0;
          color: #edf4ee;
          font-family: "IBM Plex Serif", serif;
          font-size: 34px;
        }

        .farmer-orders-subtitle {
          margin: 10px 0 0;
          color: #91a198;
          font-family: "Modern Antiqua", serif;
          font-size: 16px;
        }

        .farmer-order-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 11px;
          margin-bottom: 27px;
        }

        .farmer-order-filter {
          min-height: 46px;
          padding: 0 20px;
          border: 1px solid #718078;
          border-radius: 999px;
          background: transparent;
          color: #edf4ee;
          font-family: "IBM Plex Serif", serif;
          font-size: 14px;
          cursor: pointer;
        }

        .farmer-order-filter:hover {
          border-color: #72c9a3;
          color: #72c9a3;
        }

        .farmer-order-filter.active {
          border-color: #277a44;
          background: #277a44;
          color: #ffffff;
        }

        .farmer-orders-list {
          display: flex;
          flex-direction: column;
          gap: 17px;
        }

        .farmer-order-card {
          padding: 25px 28px;
          border: 1px solid #718078;
          border-radius: 18px;
          background: #172019;
          box-sizing: border-box;
        }

        .farmer-order-main {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 25px;
        }

        .farmer-order-information {
          min-width: 0;
        }

        .farmer-order-id {
          margin: 0;
          color: #edf4ee;
          font-family: "IBM Plex Serif", serif;
          font-size: 20px;
        }

        .farmer-order-details {
          margin: 10px 0 0;
          color: #71847a;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          line-height: 1.7;
        }

        .farmer-order-right {
          display: flex;
          align-items: center;
          gap: 17px;
          flex-shrink: 0;
        }

        .farmer-order-amount {
          color: #edf4ee;
          font-family: "IBM Plex Serif", serif;
          font-size: 18px;
          font-weight: 700;
        }

        .farmer-order-status {
          min-width: 95px;
          padding: 9px 15px;
          border-radius: 999px;
          text-align: center;
          font-family: "Modern Antiqua", serif;
          font-size: 13px;
          font-weight: 600;
          box-sizing: border-box;
        }

        .status-pending {
          background: #f8edca;
          color: #96701d;
        }

        .status-processing {
          background: #dcebdc;
          color: #35734a;
        }

        .status-shipped {
          background: #dce9ef;
          color: #466f7c;
        }

        .status-delivered {
          background: #d9f0df;
          color: #277a44;
        }

        .status-cancelled {
          background: #f2d8d3;
          color: #a3483b;
        }

        .farmer-order-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 20px;
          padding-top: 17px;
          border-top: 1px solid #304238;
        }

        .farmer-order-status-select {
          min-height: 39px;
          padding: 0 12px;
          border: 1px solid #526259;
          border-radius: 9px;
          background: #101710;
          color: #cbd8cf;
          font-family: "Modern Antiqua", serif;
          font-size: 13px;
          outline: none;
        }

        .farmer-order-status-select:focus {
          border-color: #4a9f7b;
        }

        .farmer-cancel-order {
          width: 39px;
          height: 39px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #8d4b43;
          border-radius: 9px;
          background: #291816;
          color: #dc7567;
          cursor: pointer;
        }

        .farmer-cancel-order:hover {
          border-color: #dc7567;
          background: #351d1a;
        }

        .farmer-order-completed-note {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #72c9a3;
          font-family: "Modern Antiqua", serif;
          font-size: 13px;
        }

        .farmer-empty-orders {
          padding: 60px 25px;
          border: 1px dashed #526259;
          border-radius: 18px;
          color: #82958a;
          font-family: "Modern Antiqua", serif;
          text-align: center;
        }

        @media (max-width: 750px) {
          .farmer-orders-page {
            padding: 30px 18px 55px;
          }

          .farmer-order-main {
            align-items: flex-start;
            flex-direction: column;
          }

          .farmer-order-right {
            width: 100%;
            justify-content: space-between;
          }

          .farmer-order-actions {
            justify-content: space-between;
          }
        }

        @media (max-width: 500px) {
          .farmer-order-card {
            padding: 21px;
          }

          .farmer-order-right {
            align-items: flex-start;
            flex-direction: column;
          }

          .farmer-order-actions {
            align-items: stretch;
            flex-direction: column;
          }

          .farmer-order-status-select {
            width: 100%;
          }

          .farmer-cancel-order {
            width: 100%;
          }
        }
      `}</style>

      <main className="farmer-orders-page">
        <div className="farmer-orders-container">

          <header className="farmer-orders-header">
            <h1 className="farmer-orders-title">
              Orders
            </h1>

            <p className="farmer-orders-subtitle">
              Manage your incoming and outgoing orders
            </p>
          </header>

          <div className="farmer-order-filters">
            {filters.map((filter) => (
              <button
                type="button"
                key={filter}
                className={`
                  farmer-order-filter
                  ${
                    activeFilter === filter
                      ? 'active'
                      : ''
                  }
                `}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <section className="farmer-orders-list">

            {filteredOrders.length === 0 ? (
              <div className="farmer-empty-orders">
                No {activeFilter.toLowerCase()} orders
                found.
              </div>
            ) : (
              filteredOrders.map((order) => (
                <article
                  className="farmer-order-card"
                  key={order.id}
                >
                  <div className="farmer-order-main">

                    <div className="farmer-order-information">
                      <h2 className="farmer-order-id">
                        {order.id}
                      </h2>

                      <p className="farmer-order-details">
                        Buyer: {order.buyer} ·{' '}
                        {order.items} item(s)
                        <br />
                        {order.date}
                      </p>
                    </div>

                    <div className="farmer-order-right">

                      <strong className="farmer-order-amount">
                        {formatPrice(order.amount)}
                      </strong>

                      <span
                        className={`
                          farmer-order-status
                          status-${order.status.toLowerCase()}
                        `}
                      >
                        {order.status}
                      </span>

                    </div>
                  </div>

                  {order.status !== 'Delivered' &&
                    order.status !== 'Cancelled' && (
                      <div className="farmer-order-actions">

                        <select
                          className="farmer-order-status-select"
                          value={order.status}
                          onChange={(event) =>
                            handleStatusChange(
                              order.id,
                              event.target.value,
                            )
                          }
                        >
                          <option value="Pending">
                            Pending
                          </option>

                          <option value="Processing">
                            Processing
                          </option>

                          <option value="Shipped">
                            Shipped
                          </option>

                          <option value="Delivered">
                            Delivered
                          </option>
                        </select>

                        <button
                          type="button"
                          className="farmer-cancel-order"
                          onClick={() =>
                            setOrderToCancel(order)
                          }
                          aria-label={`Cancel ${order.id}`}
                          title="Cancel order"
                        >
                          <FaTrash size={16} />
                        </button>

                      </div>
                    )}

                  {order.status === 'Delivered' && (
                    <div className="farmer-order-actions">
                      <span className="farmer-order-completed-note">
                        <FaBoxOpen size={17} />
                        Order delivered
                      </span>
                    </div>
                  )}

                </article>
              ))
            )}

          </section>

        </div>
      </main>

      {orderToCancel && (
        <ConfirmDialog
          title="Cancel this order?"
          message={`
            This will mark ${orderToCancel.id} as
            cancelled. This action should only be used
            when the order cannot be fulfilled.
          `}
          confirmText="Cancel Order"
          cancelText="Keep Order"
          onConfirm={handleCancelOrder}
          onCancel={() => setOrderToCancel(null)}
        />
      )}
    </>
  )
}

export default Orders
// commit 23
