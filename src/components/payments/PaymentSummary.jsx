import React from 'react'

function PaymentSummary({ order }) {
  return (
    <div>
        <h2>Payment Summary</h2>
        <p>Order ID: {order.id}</p>

        <p className="font-semibold">
            Total: Ksh {Number(order.total).toLocaleString()}
        </p>

        <p className="font-semibold">
            Payment Status:{" "}
            <span className={order.paymentStatus === "unpaid" ? "text-red-500" : "text-green-500"}>
                {order.paymentStatus || "unpaid"}
            </span>
        </p>
    </div>
  );
}

export default PaymentSummary;