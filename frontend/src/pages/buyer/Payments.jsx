import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PaymentForm from '../../components/payments/PaymentForm';
import PaymentSummary from '../../components/payments/PaymentSummary';

function Payments() {
const { id } = useParams();
const [order, setOrder] = useState(null);
const [isLoading, setIsLoading] = useState(false);


useEffect(() => {
    const savedOrders = JSON.parse(
        localStorage.getItem("orders") || "[]"
    );

    const foundOrder = savedOrders.find(
        (savedOrder) => savedOrder.id === id
    );

    setOrder(foundOrder);
}, [id]);

if (!order) {
    return (
        <div className='flex flex-col justify-center items-center p-3'>
            <h1 className='text-red-500 font-semibold text-xl'>
                Order Not Found
            </h1>

            <Link
                to="/buyer/orders"
                className="group relative mt-3 text-gray-400 hover:text-(--farm-green-dark)"
            >
                <span
                    className="absolute -bottom-1 left-1/2 h-0.5 w-6
                                -translate-x-1/2 scale-x-0 rounded-full
                                bg-(--farm-green-dark) transition-transform duration-300
                                group-hover:scale-x-100"
                />
                Back to My Orders
            </Link>
        </div>
    );
}

return (
    <div className='p-4 max-w-4xl mx-auto'>
        <h1 className="font-bold">Payment</h1>

        <PaymentSummary
            items={order.items}
            subtotal={order.total}
            total={order.total}
        />

        <PaymentForm
            amount={order.total}
            isLoading={isLoading}
            onPaymentStart={async ({ phoneNumber, amount }) => {
                setIsLoading(true);

                console.log("Payment request:", {
                    orderId: order.id,
                    phone: phoneNumber,
                    amount,
                });

                // Temporary simulation until Daraja/M-Pesa is connected
                await new Promise((resolve) =>
                    setTimeout(resolve, 2000)
                );

                const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");

                const updatedOrders = savedOrders.map(
                    (savedOrder) => savedOrder.id === order.id
                    ? {...savedOrder, paymentStatus: "paid"}
                    : savedOrder
                );

                localStorage.setItem("orders", JSON.stringify(updatedOrders));

                const updatedOrder = updatedOrders.find((savedOrder) => savedOrder.id === order.id)
                setOrder(updatedOrder);

                setOrder(updatedOrder);

                setIsLoading(false);
            }}
        />

        <br />

        <Link
            to="/buyer/orders"
            className=''
        >
            Back to My Orders
        </Link>
    </div>
);


}

export default Payments;
