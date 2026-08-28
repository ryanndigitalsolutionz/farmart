import React from 'react'

function PaymentSummary({ order }) {
  return (
    <div>
        <h2>Payment Summary</h2>
        <p>Order ID: {order.id}</p>

        <p>
            Total: Ksh {Number(order.total).toLocaleString()}
        </p>

        <p>
            Payment Status:{" "}
            {order.paymentStatus || "unpaid"}
        </p>
    </div>
  );
}

export default PaymentSummary;