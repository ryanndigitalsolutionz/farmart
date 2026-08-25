import { Link, useLocation } from "react-router-dom";

function OrderConfirmation() {
    const location = useLocation();
    const orderId = location.state?.orderId;

  return (
    <div className=" ">
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
        
        

        </div>
    </div>
  )
}

export default OrderConfirmation