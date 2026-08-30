function PaymentSummary({
  items = [],
  subtotal = 0,
  total = subtotal,
}) {
  return (
    <>
      <style>{`
        .farmart-payment-summary {
          width: 100%;
          padding: 24px;

          border: 1px solid #d5e1d8;
          border-radius: 18px;

          background: #f7faf7;

          box-shadow:
            5px 5px 12px rgba(47, 72, 55, 0.08),
            -5px -5px 12px rgba(255, 255, 255, 0.85);

          box-sizing: border-box;
        }

        .farmart-payment-summary-title {
          margin: 0 0 20px;

          color: #284533;

          font-family: "IBM Plex Serif", serif;
          font-size: 21px;
          font-weight: 700;
        }

        .farmart-payment-summary-items {
          display: flex;
          flex-direction: column;
          gap: 13px;
        }

        .farmart-payment-summary-item {
          display: flex;
          justify-content: space-between;
          gap: 16px;

          color: #617268;

          font-family: "Modern Antiqua", serif;
          font-size: 14px;
        }

        .farmart-payment-summary-item-name {
          min-width: 0;
          overflow: hidden;

          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .farmart-payment-summary-item-price {
          flex-shrink: 0;
          color: #3e5647;
          font-weight: 600;
        }

        .farmart-payment-summary-divider {
          height: 1px;
          margin: 20px 0 16px;

          background: #d5e1d8;
        }

        .farmart-payment-summary-row {
          display: flex;
          justify-content: space-between;
          gap: 16px;

          color: #68796f;

          font-family: "Modern Antiqua", serif;
          font-size: 14px;
        }

        .farmart-payment-summary-total {
          margin-top: 12px;

          color: #277a44;

          font-family: "IBM Plex Serif", serif;
          font-size: 22px;
          font-weight: 700;
        }

        .farmart-payment-summary-empty {
          color: #7b8980;

          font-family: "Modern Antiqua", serif;
          font-size: 14px;
        }
      `}</style>

      <section className="farmart-payment-summary">

        <h2 className="farmart-payment-summary-title">
          Order Summary
        </h2>

        {items.length > 0 ? (
          <div className="farmart-payment-summary-items">
            {items.map((item) => (
              <div
                className="farmart-payment-summary-item"
                key={item.id}
              >
                <span className="farmart-payment-summary-item-name">
                  {item.name}
                  {item.quantity
                    ? ` × ${item.quantity}`
                    : ''}
                </span>

                <span className="farmart-payment-summary-item-price">
                  KES {Number(item.subtotal ?? item.price ?? 0).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="farmart-payment-summary-empty">
            No items in this order.
          </p>
        )}

        <div className="farmart-payment-summary-divider" />

        <div className="farmart-payment-summary-row">
          <span>Subtotal</span>
          <span>
            KES {Number(subtotal).toLocaleString()}
          </span>
        </div>

        <div className="farmart-payment-summary-row farmart-payment-summary-total">
          <span>Total</span>
          <span>
            KES {Number(total).toLocaleString()}
          </span>
        </div>

      </section>
    </>
  )
}

export default PaymentSummary
// commit 54
