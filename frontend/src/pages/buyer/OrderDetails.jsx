import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiCheck, FiPrinter, FiXCircle } from 'react-icons/fi'

const STATUS_BADGE = {
  pending: 'bg-[#faeeda] text-[#633806]',
  shipped: 'bg-[#e6f0fa] text-[#1c4c85]',
  delivered: 'bg-[#eaf3de] text-[#27500a]',
  cancelled: 'bg-[#fcebeb] text-[var(--farm-error)]',
}

const PAYMENT_BADGE = {
  paid: 'bg-[#eaf3de] text-[#27500a]',
  unpaid: 'bg-[#faeeda] text-[#633806]',
  failed: 'bg-[#fcebeb] text-[var(--farm-error)]',
}

const STATUS_STEPS = [
  { key: 'pending', label: 'Order placed' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'delivered', label: 'Delivered' },
]

function StatusTimeline({ status }) {
  const currentIndex = STATUS_STEPS.findIndex(
    (step) => step.key === status,
  )

  return (
    <div className="flex items-start">
      {STATUS_STEPS.map((step, index) => {
        const isComplete = index <= currentIndex
        const isCurrent = index === currentIndex

        return (
          <div
            key={step.key}
            className="flex-1 flex flex-col items-center relative"
          >
            {index > 0 && (
              <div
                className={`absolute top-[13px] right-1/2 w-full h-[2px] -z-10
                ${
                  index <= currentIndex
                    ? 'bg-[var(--farm-green)]'
                    : 'bg-[var(--farm-green-border)]'
                }`}
              />
            )}

            <div
              className={`w-[26px] h-[26px] rounded-full flex items-center justify-center
              border-2 flex-shrink-0
              ${
                isComplete
                  ? 'bg-[var(--farm-green)] border-[var(--farm-green)] text-white'
                  : 'bg-white border-[var(--farm-green-border)] text-[var(--farm-muted)]'
              }`}
            >
              {isComplete ? (
                <FiCheck size={13} />
              ) : (
                <span className="text-[10px] font-bold">
                  {index + 1}
                </span>
              )}
            </div>

            <span
              className={`mt-2 text-[11px] text-center font-[var(--farm-body-font)]
              ${
                isCurrent
                  ? 'text-[var(--farm-text)] font-bold'
                  : 'text-[var(--farm-muted)]'
              }`}
            >
              {step.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function OrderDetails() {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [notFoundChecked, setNotFoundChecked] = useState(false)

  useEffect(() => {
    const savedOrders = JSON.parse(
      localStorage.getItem('orders') || '[]',
    )

    const foundOrder = savedOrders.find(
      (savedOrder) => savedOrder.id === orderId,
    )

    setOrder(foundOrder)
    setNotFoundChecked(true)
  }, [orderId])

  const handleCancelOrder = () => {
    const savedOrders = JSON.parse(
      localStorage.getItem('orders') || '[]',
    )

    const updatedOrders = savedOrders.map((savedOrder) =>
      savedOrder.id === orderId
        ? { ...savedOrder, status: 'cancelled' }
        : savedOrder,
    )

    localStorage.setItem('orders', JSON.stringify(updatedOrders))
    setOrder((current) => ({ ...current, status: 'cancelled' }))
  }

  if (notFoundChecked && !order) {
    return (
      <div className="min-h-screen bg-[var(--farm-background)] flex flex-col items-center justify-center gap-3 px-4">
        <h1 className="font-[var(--farm-heading-font)] text-xl font-bold text-[var(--farm-text)]">
          Order not found
        </h1>

        <Link
          to="/buyer/marketplace"
          className="mt-2 px-5 py-3 rounded-[11px] bg-[var(--farm-green)]
          text-white font-[var(--farm-body-font)] font-semibold no-underline
          transition-colors duration-150 hover:bg-[var(--farm-green-dark)]"
        >
          Start shopping
        </Link>
      </div>
    )
  }

  if (!order) {
    return null
  }

  const status = order.status || 'pending'
  const paymentStatus = order.paymentStatus || 'unpaid'
  const isCancelled = status === 'cancelled'
  const canCancel = status === 'pending'

  return (
    <div className="min-h-screen bg-[var(--farm-background)] py-10 px-4 print:bg-white">
      <div className="max-w-[640px] mx-auto">

        <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
          <div>
            <h1 className="font-[var(--farm-heading-font)] text-[22px] font-semibold text-[var(--farm-text)] m-0">
              Order #{order.id}
            </h1>
            <p className="font-[var(--farm-body-font)] text-[13px] text-[var(--farm-muted)] mt-[4px] mb-0">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span
              className={`${STATUS_BADGE[status] || STATUS_BADGE.pending} text-[11px] font-bold px-[10px] py-[4px] rounded-full capitalize`}
            >
              {status}
            </span>
            <span className="font-[var(--farm-heading-font)] text-[18px] font-bold text-[var(--farm-text)]">
              KSh {Number(order.total).toLocaleString()}
            </span>
          </div>
        </div>

        {isCancelled ? (
          <div className="flex items-center gap-3 border border-[var(--farm-error)]/30 bg-[#fcebeb] rounded-[16px] px-5 py-4 mb-6">
            <FiXCircle size={20} className="text-[var(--farm-error)] flex-shrink-0" />
            <p className="font-[var(--farm-body-font)] text-[13px] text-[var(--farm-error)] m-0">
              This order was cancelled.
            </p>
          </div>
        ) : (
          <div className="border border-[var(--farm-green-border)] rounded-[16px] bg-white px-6 py-6 mb-6">
            <StatusTimeline status={status} />
          </div>
        )}

        <div className="border border-[var(--farm-green-border)] rounded-[16px] bg-white overflow-hidden mb-5">
          <div className="px-5 py-3 border-b border-[var(--farm-green-border)] bg-[var(--farm-green-soft)]">
            <h2 className="font-[var(--farm-heading-font)] text-[14px] font-bold text-[var(--farm-text)] m-0">
              Items ({order.items.length})
            </h2>
          </div>

          <div className="divide-y divide-[var(--farm-green-border)]">
            {order.items.map((item, index) => (
              <div
                key={item.id ?? index}
                className="px-5 py-4 flex gap-4"
              >
                <div className="w-[56px] h-[56px] rounded-[10px] overflow-hidden bg-[var(--farm-green-soft)] flex-shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-[var(--farm-muted)]">
                      No image
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-3">
                    <h3 className="font-[var(--farm-heading-font)] text-[14px] font-bold text-[var(--farm-text)] m-0">
                      {item.name || `${item.breed} ${item.type}`}
                    </h3>
                    <span className="font-[var(--farm-heading-font)] text-[14px] font-bold text-[var(--farm-text)] whitespace-nowrap">
                      KSh {Number(item.price).toLocaleString()}
                    </span>
                  </div>

                  <p className="font-[var(--farm-body-font)] text-[12px] text-[var(--farm-muted)] mt-[3px] mb-0">
                    {item.type}
                    {item.breed ? ` · ${item.breed}` : ''}
                  </p>

                  {item.seller?.name && (
                    <p className="font-[var(--farm-body-font)] text-[11px] text-[var(--farm-muted)] mt-[3px] mb-0">
                      Sold by {item.seller.name}
                      {item.seller.rating &&
                        ` · ★ ${item.seller.rating}`}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-[var(--farm-green-border)] rounded-[16px] bg-white overflow-hidden mb-5">
          <div className="px-5 py-3 border-b border-[var(--farm-green-border)] bg-[var(--farm-green-soft)]">
            <h2 className="font-[var(--farm-heading-font)] text-[14px] font-bold text-[var(--farm-text)] m-0">
              Delivery
            </h2>
          </div>

          <div className="divide-y divide-[var(--farm-green-border)] font-[var(--farm-body-font)] text-[13px]">
            <div className="flex justify-between px-5 py-3">
              <span className="text-[var(--farm-muted)]">Name</span>
              <span className="text-[var(--farm-text)] font-medium">
                {order.buyer?.name || 'Not provided'}
              </span>
            </div>
            <div className="flex justify-between px-5 py-3">
              <span className="text-[var(--farm-muted)]">Phone</span>
              <span className="text-[var(--farm-text)]">
                {order.buyer?.phone || 'Not provided'}
              </span>
            </div>
            <div className="flex justify-between px-5 py-3">
              <span className="text-[var(--farm-muted)]">Location</span>
              <span className="text-[var(--farm-text)]">
                {order.delivery?.location || 'Not provided'}
              </span>
            </div>
            <div className="flex justify-between px-5 py-3">
              <span className="text-[var(--farm-muted)]">Method</span>
              <span className="text-[var(--farm-text)] capitalize">
                {order.delivery?.method || 'Standard'}
              </span>
            </div>
          </div>
        </div>

        <div className="border border-[var(--farm-green-border)] rounded-[16px] bg-white overflow-hidden mb-8">
          <div className="px-5 py-3 border-b border-[var(--farm-green-border)] bg-[var(--farm-green-soft)]">
            <h2 className="font-[var(--farm-heading-font)] text-[14px] font-bold text-[var(--farm-text)] m-0">
              Payment
            </h2>
          </div>

          <div className="font-[var(--farm-body-font)] text-[13px]">
            <div className="flex justify-between px-5 py-3 border-b border-[var(--farm-green-border)]">
              <span className="text-[var(--farm-muted)]">Status</span>
              <span
                className={`${PAYMENT_BADGE[paymentStatus] || PAYMENT_BADGE.unpaid} text-[11px] font-bold px-[10px] py-[3px] rounded-full capitalize`}
              >
                {paymentStatus}
              </span>
            </div>
            <div className="flex justify-between items-baseline px-5 py-4">
              <span className="font-[var(--farm-heading-font)] text-[14px] font-bold text-[var(--farm-text)]">
                Total
              </span>
              <span className="font-[var(--farm-heading-font)] text-[19px] font-bold text-[var(--farm-text)]">
                KSh {Number(order.total).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-[10px] rounded-[11px]
            border border-[var(--farm-green-border)] bg-[var(--farm-green-soft)]
            text-[var(--farm-text)] font-[var(--farm-body-font)] text-[13px] font-semibold
            cursor-pointer transition-colors duration-150 hover:border-[var(--farm-green)]"
          >
            <FiPrinter size={14} />
            Print receipt
          </button>

          {canCancel && (
            <button
              type="button"
              onClick={handleCancelOrder}
              className="inline-flex items-center gap-2 px-4 py-[10px] rounded-[11px]
              border border-[var(--farm-error)]/40 bg-transparent
              text-[var(--farm-error)] font-[var(--farm-body-font)] text-[13px] font-semibold
              cursor-pointer transition-colors duration-150 hover:bg-[#fcebeb]"
            >
              Cancel order
            </button>
          )}

          <Link
            to="/buyer/marketplace"
            className="inline-flex items-center gap-2 px-4 py-[10px] rounded-[11px]
            bg-[var(--farm-green)] text-white font-[var(--farm-body-font)] text-[13px] font-semibold
            no-underline transition-colors duration-150 hover:bg-[var(--farm-green-dark)]"
          >
            Continue shopping
          </Link>
        </div>

      </div>
    </div>
  )
}

export default OrderDetails