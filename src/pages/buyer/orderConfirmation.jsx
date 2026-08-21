import { Link, useLocation } from "react-router-dom";

function orderConfirmation() {
    const location = useLocation();
    const orderId = location.state?.orderId;

  return (
    <div className="p-4">
        <h1>Order Confirmed!</h1>

        <p>Your order has been placed successfully.</p>
        {orderId && (
            <p>
                Order #: <strong>{orderId}</strong>
            </p>
        )}

        <Link 
            to="/marketplace"
            className="bg-green-600 p-2 rounded-lg mt-4"
        >
            Continue Shopping
        </Link>
    </div>
  )
}

export default orderConfirmation