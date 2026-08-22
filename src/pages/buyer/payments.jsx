import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function payments() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const savedOrders = JSON.parse(
            localStorage.getItem("orders") || "[]"
        );

        const foundOrder = savedOrders.find(
            (savedOrder) => savedOrder.id === id
        )

        setOrder(foundOrder)
    }, [id])

  if (!order){
    return (
    <div>
        <h1>order Not found</h1>

        <Link to="/orders">Back to My orders</Link>
    </div>
  )}
  return (
    <div>
        <h1>payment</h1>

        <h2>Order #: {order.id}</h2>

        <p>
            Amount: Ksh {Number(order.total).toLocaleString()}
        </p>
        <p>
            Payment Status:{" "}
            {order.paymentStatus
                ? order.status.charAt(0).toUpperCase() + 
                    order.status.slice(1) 
                : "unpaid"}
        </p>
        <button>Pay Now</button>

        <br />

        <Link to="/orders">Back to My Orders</Link>
    </div>
  )
}

export default payments