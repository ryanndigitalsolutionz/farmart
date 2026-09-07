import { useEffect, useMemo, useState } from 'react'
import {
  FaTrash,
  FaBoxOpen,
} from 'react-icons/fa'
import ConfirmDialog from '../../components/common/ConfirmDialog'

import API_BASE_URL from '../../api/api'

function Orders() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState(null)
  const [orderToCancel, setOrderToCancel] =
    useState(null)

  const filters = [
    'All',
    'Pending',
    'Confirmed',
    'Completed',
    'Cancelled',
  ]

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(
          `${API_BASE_URL}/orders`,
          {
            credentials: 'include',
          },
        )

        const data = await response.json().catch(
          () => [],
        )

        if (!response.ok) {
          throw new Error(
            data.message ||
              'Unable to load your orders.',
          )
        }

        setOrders(Array.isArray(data) ? data : [])
      } catch (loadError) {
        setError(
          loadError.message ||
            'Unable to connect to the Farmart server.',
        )
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [])

  const normalizeStatus = (status) => {
    const normalized = String(
      status || '',
    ).toLowerCase()

    if (normalized === 'pending') {
      return 'Pending'
    }

    if (normalized === 'confirmed') {
      return 'Confirmed'
    }

    if (normalized === 'completed') {
      return 'Completed'
    }

    if (normalized === 'cancelled') {
      return 'Cancelled'
    }

    return status || 'Unknown'
  }

  const filteredOrders = useMemo(() => {
    if (activeFilter === 'All') {
      return orders
    }

    return orders.filter(
      (order) =>
        normalizeStatus(order.status) ===
        activeFilter,
    )
  }, [activeFilter, orders])

  const formatPrice = (amount) => {
    const numericAmount = Number(amount || 0)

    return `KES ${numericAmount.toLocaleString(
      'en-KE',
      {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      },
    )}`
  }

  const formatDate = (date) => {
    if (!date) {
      return 'Date unavailable'
    }

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
      return date
    }

    return parsedDate.toLocaleDateString(
      'en-KE',
      {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      },
    )
  }

  const getItemName = (item) => {
    if (item.livestock?.name) {
      return item.livestock.name
    }

    if (item.product?.name) {
      return item.product.name
    }

    if (item.livestock_id) {
      return 'Livestock item'
    }

    if (item.product_id) {
      return 'Farm product'
    }

    return 'Order item'
  }

  const getItemSummary = (order) => {
    if (!Array.isArray(order.items)) {
      return 'No items'
    }

    if (order.items.length === 0) {
      return 'No items'
    }

    return order.items
      .map(
        (item) =>
          `${getItemName(item)} × ${item.quantity}`,
      )
      .join(', ')
  }

  const refreshOrders = async () => {
    const response = await fetch(
      `${API_BASE_URL}/orders`,
      {
        credentials: 'include',
      },
    )

    const data = await response.json().catch(
      () => [],
    )

    if (!response.ok) {
      throw new Error(
        data.message ||
          'Unable to refresh your orders.',
      )
    }

    setOrders(Array.isArray(data) ? data : [])
  }

  const updateOrder = async (
    orderId,
    payload,
  ) => {
    setActionLoading(orderId)
    setError('')

    try {
      const response = await fetch(
        `${API_BASE_URL}/orders/${orderId}`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      )

      const data = await response.json().catch(
        () => ({}),
      )

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            'Unable to update this order.',
        )
      }

      await refreshOrders()
      setOrderToCancel(null)
    } catch (updateError) {
      setError(
        updateError.message ||
          'Unable to connect to the Farmart server.',
      )
    } finally {
      setActionLoading(null)
    }
  }

  const handleCancelOrder = async () => {
    if (!orderToCancel) {
      return
    }

    await updateOrder(
      orderToCancel.id,
      {
        action: 'cancel',
      },
    )
  }

  const handleStatusChange = async (
    orderId,
    newStatus,
  ) => {
    await updateOrder(
      orderId,
      {
        status: newStatus.toLowerCase(),
      },
    )
  }

  return (
    <>
      <style>{`
        .farmer-orders-page {
          min-height: 100vh;
          padding: 42px 36px 70px;
          background: var(--farm-background);
          color: var(--farm-text);
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
          color: var(--farm-text);
          font-family: "IBM Plex Serif", serif;
          font-size: 34px;
        }

        .farmer-orders-subtitle {
          margin: 10px 0 0;
          color: var(--farm-muted);
          font-family: "Modern Antiqua", serif;
          font-size: 16px;
        }

        .farmer-order-message {
          margin-bottom: 24px;
          padding: 14px 16px;
          border-radius: 12px;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          line-height: 1.5;
        }

        .farmer-order-message.error {
          border: 1px solid rgba(223, 128, 98, 0.35);
          background: rgba(223, 128, 98, 0.1);
          color: #df8062;
        }

        .farmer-order-message.loading {
          border: 1px solid var(--farm-green-border);
          background: var(--farm-green-soft);
          color: var(--farm-muted);
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
          border: 1px solid var(--farm-green-border);
          border-radius: 999px;
          background: transparent;
          color: var(--farm-text);
          font-family: "IBM Plex Serif", serif;
          font-size: 14px;
          cursor: pointer;
        }

        .farmer-order-filter:hover {
          border-color: var(--farm-mint);
          color: var(--farm-mint);
        }

        .farmer-order-filter.active {
          border-color: var(--green-700);
          background: var(--green-700);
          color: #ffffff;
        }

        .farmer-orders-list {
          display: flex;
          flex-direction: column;
          gap: 17px;
        }

        .farmer-order-card {
          padding: 25px 28px;
          border: 1px solid var(--farm-green-border);
          border-radius: 18px;
          background: var(--farm-green-soft);
          box-sizing: border-box;
          box-shadow: 0 10px 28px var(--farm-green-glow);
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
          color: var(--farm-text);
          font-family: "IBM Plex Serif", serif;
          font-size: 20px;
        }

        .farmer-order-details {
          margin: 10px 0 0;
          color: var(--farm-muted);
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          line-height: 1.7;
        }

        .farmer-order-items {
          margin: 8px 0 0;
          color: var(--farm-muted);
          font-family: "Modern Antiqua", serif;
          font-size: 13px;
          line-height: 1.6;
        }

        .farmer-order-right {
          display: flex;
          align-items: center;
          gap: 17px;
          flex-shrink: 0;
        }

        .farmer-order-amount {
          color: var(--farm-text);
          font-family: "IBM Plex Serif", serif;
          font-size: 18px;
          font-weight: 700;
        }

        .farmer-order-status {
          min-width: 100px;
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

        .status-confirmed {
          background: #dcebdc;
          color: #35734a;
        }

        .status-completed {
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
          border-top: 1px solid var(--farm-green-border);
        }

        .farmer-order-status-select {
          min-height: 39px;
          padding: 0 12px;
          border: 1px solid var(--farm-green-border);
          border-radius: 9px;
          background: var(--farm-background);
          color: var(--farm-text);
          font-family: "Modern Antiqua", serif;
          font-size: 13px;
          outline: none;
        }

        .farmer-order-status-select:focus {
          border-color: var(--farm-mint);
        }

        .farmer-order-status-select:disabled {
          opacity: 0.55;
          cursor: not-allowed;
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

        .farmer-cancel-order:hover:not(:disabled) {
          border-color: #dc7567;
          background: #351d1a;
        }

        .farmer-cancel-order:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .farmer-order-completed-note {
          display: flex;
          align-items: center;
          gap: 7px;
          color: var(--farm-mint);
          font-family: "Modern Antiqua", serif;
          font-size: 13px;
        }

        .farmer-empty-orders {
          padding: 60px 25px;
          border: 1px dashed var(--farm-green-border);
          border-radius: 18px;
          color: var(--farm-muted);
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
              Manage orders for your livestock and
              farm products
            </p>
          </header>

          {error && (
            <div className="farmer-order-message error">
              {error}
            </div>
          )}

          {loading && (
            <div className="farmer-order-message loading">
              Loading your orders...
            </div>
          )}

          <div className="farmer-order-filters">
            {filters.map((filter) => (
              <button
                type="button"
                key={filter}
                className={`farmer-order-filter ${
                  activeFilter === filter
                    ? 'active'
                    : ''
                }`}
                onClick={() =>
                  setActiveFilter(filter)
                }
              >
                {filter}
              </button>
            ))}
          </div>

          <section className="farmer-orders-list">
            {!loading &&
            filteredOrders.length === 0 ? (
              <div className="farmer-empty-orders">
                No {activeFilter.toLowerCase()} orders
                found.
              </div>
            ) : (
              filteredOrders.map((order) => {
                const displayStatus =
                  normalizeStatus(order.status)

                const statusClass =
                  String(displayStatus)
                    .toLowerCase()
                    .replace(
                      /[^a-z]+/g,
                      '-',
                    )

                const isPending =
                  displayStatus === 'Pending'

                const isConfirmed =
                  displayStatus === 'Confirmed'

                const isTerminal =
                  displayStatus ===
                    'Completed' ||
                  displayStatus ===
                    'Cancelled'

                const isUpdating =
                  actionLoading === order.id

                return (
                  <article
                    className="farmer-order-card"
                    key={order.id}
                  >
                    <div className="farmer-order-main">
                      <div className="farmer-order-information">
                        <h2 className="farmer-order-id">
                          Order #{order.id}
                        </h2>

                        <p className="farmer-order-details">
                          Buyer:{' '}
                          {order.buyer?.name ||
                            'Unknown buyer'}
                          <br />
                          {formatDate(
                            order.created_at,
                          )}
                        </p>

                        <p className="farmer-order-items">
                          {getItemSummary(order)}
                        </p>
                      </div>

                      <div className="farmer-order-right">
                        <strong className="farmer-order-amount">
                          {formatPrice(
                            order.total_amount,
                          )}
                        </strong>

                        <span
                          className={`farmer-order-status status-${statusClass}`}
                        >
                          {displayStatus}
                        </span>
                      </div>
                    </div>

                    {!isTerminal && (
                      <div className="farmer-order-actions">
                        <select
                          className="farmer-order-status-select"
                          value={displayStatus}
                          disabled={isUpdating}
                          onChange={(event) =>
                            handleStatusChange(
                              order.id,
                              event.target.value,
                            )
                          }
                        >
                          {isPending && (
                            <>
                              <option value="Pending">
                                Pending
                              </option>
                              <option value="Confirmed">
                                Confirmed
                              </option>
                            </>
                          )}

                          {isConfirmed && (
                            <>
                              <option value="Confirmed">
                                Confirmed
                              </option>
                              <option value="Completed">
                                Completed
                              </option>
                            </>
                          )}
                        </select>

                        {isPending && (
                          <button
                            type="button"
                            className="farmer-cancel-order"
                            disabled={isUpdating}
                            onClick={() =>
                              setOrderToCancel(
                                order,
                              )
                            }
                            aria-label={`Cancel order ${order.id}`}
                            title="Cancel order"
                          >
                            <FaTrash size={16} />
                          </button>
                        )}
                      </div>
                    )}

                    {displayStatus ===
                      'Completed' && (
                      <div className="farmer-order-actions">
                        <span className="farmer-order-completed-note">
                          <FaBoxOpen size={17} />
                          Order completed
                        </span>
                      </div>
                    )}
                  </article>
                )
              })
            )}
          </section>
        </div>
      </main>

      {orderToCancel && (
        <ConfirmDialog
          title="Cancel this order?"
          message={`This will mark Order #${orderToCancel.id} as cancelled. This action should only be used when the order cannot be fulfilled.`}
          confirmText="Cancel Order"
          cancelText="Keep Order"
          onConfirm={handleCancelOrder}
          onCancel={() =>
            setOrderToCancel(null)
          }
        />
      )}
    </>
  )
}

export default Orders
