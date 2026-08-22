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

    const handlePayment = () => {
        const saveOrders = JSON.parse(
            localStorage.getItem("orders") || "[]"
        );

        const updatedOrders = saveOrders.map((saveOrders) => 
            saveOrders.id === order.id
                ?{
                    ...saveOrders,
                    paymentStatus: "paid"
                }
                : saveOrders
        );
        localStorage.setItem(
            "orders",
            JSON.stringify(updatedOrders)
        );
        setOrder({
            ...order,
            paymentStatus: "paid"
        })
    }

  if (!order){
    return (
    <div>
        <h1>order Not found</h1>

        <Link to="/orders">Back to My orders</Link>
    </div>
  )}

  return (
    <div className='p-4'>
        <h1 className="font-bold">Payment</h1>
        
        <PaymentSummary order={order}/>
        <PaymentForm onPay={handlePayment} />

        <br />

        <Link 
            to="/orders"
            className='bg-yellow-500 p-2 rounded-lg'
        >
            Back to My Orders
        </Link>
    </div>
  )
}

export default Payments