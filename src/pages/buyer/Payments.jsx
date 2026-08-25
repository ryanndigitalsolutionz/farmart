import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PaymentForm from '../../components/payments/PaymentForm';
import PaymentSummary from '../../components/payments/PaymentSummary';

function Payments() {
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
        <h1 className='text-red-400 font-semibold mb-4'>Order Not found!</h1>

        <Link 
            to="/orders" 
            className='bg-green-500 p-2 rounded-lg text-white 
                transition-all duration-200 hover:-translate-y-1 
                hover:scale-105 hover:shadow-lg'
        >
            Back to My orders
        </Link>
    </div>
  )}

  if (order.paymentStatus === "paid") {
    return (
        <div>
            <h1>Payment Complete</h1>

            <p>This order has already been paid.</p>

            <Link 
                to={`/orders/${order.id}`} 
                className='transition-all duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-lg'
            >
                Back to order
            </Link>
        </div>
    )
  }

  return (
    <div className='p-4 max-w-2xl mx-auto flex flex-col gap-4 m-3 border shadow-2xl rounded-lg '>
        <h1 className="font-bold text-center text-2xl">Payment</h1>
        
        <PaymentSummary order={order}/>
        <PaymentForm 
            order={order}
            onPay={(phone) => {
                console.log("Payment request:", {
                    orderId: order.id,
                    phone,
                    amount: order.total,
                })
            }} 
        />

        <Link 
            to={`/orders/${order.id}`}
            className='bg-green-500 p-2 rounded-lg w-40 text-center
                 text-white font-semibold mt-3 hover:bg-green-700
                 transition-all duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-lg'
        >
            Back to My Orders
        </Link>
    </div>
  )
}

export default Payments;