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
    <div className='min-h-screen bg-stone-50 px-4 py-10 md:py-14 '>
        <div className='max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8'>
            <h1 className="font-bold text-center text-2xl md:text-3xl text-gray-800 mb-8">
                Complete Your Payment</h1>
            
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
                className='block text-center text-gray-500 font-semibold mt-6 hover:text-green-700 transition-colors'
            >
                Back to My Orders
            </Link>
        </div>
    </div>
  )
}

export default Payments;