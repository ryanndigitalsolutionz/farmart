import { Link, useLocation } from "react-router-dom";

function orderConfirmation() {
    const location = useLocation();
    const orderId = location.state?.orderId;

  return (
    <div className="p-4 ">
        <div className="mb-4">
            <h1 className="font-semibold">Order Confirmed!</h1>

            <p>Your order has been placed successfully.</p>
            {orderId && (
                <p>
                    Order #: <strong>{orderId}</strong>
                </p>
            )}

        </div>
        

        <Link 
            to="/marketplace"
            className="bg-green-600 p-2 rounded-lg "
        >
            Continue Shopping
        </Link>
    </div>
  )
}

export default orderConfirmation