import { Link, useLocation } from "react-router-dom";

function OrderConfirmation() {
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
        <div className="flex gap-3">       
        
        <Link 
            to={`/payments/${orderId}`}
            className="bg-yellow-400 p-2 rounded-2xl text-orange-900"
        >
            Pay Now
        </Link>
        <Link 
            to="/marketplace"
            className="bg-green-600 p-2 rounded-lg "
        >
            Continue Shopping
        </Link>
        </div>
    </div>
  )
}

export default OrderConfirmation