import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

function Orders() {
    const [orders, setOrders] = useState("");

    useEffect(() => {
        const saveOrders = JSON.parse(
            localStorage.getItem("orders") || "[]"
        );
        setOrders(saveOrders)
    }, []);

  return (
    <div>
        <h1>My orders</h1>

        {orders.length === 0 ? (
            <div>
                <p>You have no orders yet.</p>
                <Link>Start Shopping</Link>
            </div>
        ): (
            <div>
                {orders.map((order) => (
                    <div key={order.id}>
                        <h2>{order.id}</h2>

                        <p>
                            Total: Ksh {order.total.toLocaleString()}
                        </p>

                        <p>Status: {order.status}</p>

                        <p>
                            Date:{""}
                            {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        )}

    </div>
  )
}

export default Orders;