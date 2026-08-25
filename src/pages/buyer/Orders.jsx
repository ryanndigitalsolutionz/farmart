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
    <div className='p-4 max-w-4xl mx-auto shadow-2xl m-3 flex flex-col items-center justify-center'>
        <div className='flex justify-between'>
            <h1 className='font-bold text-xl'>My orders</h1>

        </div>        
        

        {orders.length === 0 ? (
            <div className='mt-3'>
                <p className='text-red-700 text-lg  mb-3'>You have no orders yet.</p>
                <Link 
                    to="/marketplace"
                    className="text-green-100  font-semibold bg-green-600 border p-2 px-2  rounded-lg 
                transition-all duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-lg "
                >
                    Start Shopping
                </Link>
            </div>
        ): (
            <div className=''>
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
                            >
                                View Details
                            </Link>

                            
                        </div>
                    </div>
                ))}
            </div>
        )}

    </div>
  )
}

export default Orders;