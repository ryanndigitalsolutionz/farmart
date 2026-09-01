import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const saveOrders = JSON.parse(
            localStorage.getItem("orders") || "[]"
        );
        setOrders(saveOrders)
    }, []);

  return (
    <div className='p-4'>
        <div className='flex justify-between'>
            <h1 className='font-bold'>My orders</h1>
        <Link 
            to="/marketplace"
            className="bg-yellow-500 p-2 rounded-lg"
        >
            Marketplace
        </Link>

        </div>        
        

        {orders.length === 0 ? (
            <div>
                <p>You have no orders yet.</p>
                <Link to="/marketplace">Start Shopping</Link>
            </div>
        ): (
            <div>
                {orders.map((order) => (
                    <div key={order.id}>
                        <h2>{order.id}</h2>

                        <p>
                            Total: Ksh {order.total.toLocaleString()}
                        </p>

                        <p>
                            Payment:{" "}
                            {order.paymentStatus
                                ? order.paymentStatus.charAt(0).toUpperCase() + 
                                    order.paymentStatus.slice(1) 
                                : "unpaid"}
                        
                        </p>

                        <p>
                            Date:{""}
                            {new Date(order.createdAt).toLocaleDateString()}
                        </p>

                        <div className='mt-3 flex gap-3'>
                            <Link 
                                to={`/orders/${order.id}`} 
                                className='bg-green-400 p-2 rounded-lg'
                            >View Details</Link>

                            
                        </div>
                    </div>
                ))}
            </div>
        )}

    </div>
  )
}

export default Orders;// commit 14
