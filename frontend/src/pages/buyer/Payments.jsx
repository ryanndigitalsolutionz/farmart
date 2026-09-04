import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LuArrowLeft, LuCircleCheck, LuCreditCard } from "react-icons/lu";

import PaymentForm from "../../components/payments/PaymentForm";
import PaymentSummary from "../../components/payments/PaymentSummary";

function Payments() {
    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    useEffect(() => {
        const savedOrders = JSON.parse(
            localStorage.getItem("orders") || "[]"
        );

        const foundOrder = savedOrders.find(
            (savedOrder) => savedOrder.id === id
        );

        setOrder(foundOrder);
    }, [id]);

    /*
     * Order not found
     */
    if (!order) {
        return (
            <div className="min-h-screen bg-[var(--farm-background)] p-5 flex items-center justify-center">
                <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 text-center">

                    <div className="text-red-500 text-5xl mb-4">
                        !
                    </div>

                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Order Not Found
                    </h1>

                    <p className="text-gray-500 mb-6">
                        We couldn't find the order you're trying to pay for.
                    </p>

                    <Link
                        to="/buyer/orders"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            px-5
                            py-3
                            rounded-xl
                            bg-[var(--farm-green)]
                            text-white
                            font-semibold
                            hover:bg-[var(--farm-green-dark)]
                            transition
                        "
                    >
                        <LuArrowLeft />
                        Back to My Orders
                    </Link>
                </div>
            </div>
        );
    }

    /*
     * Handle payment
     */
    const handlePayment = async ({ phoneNumber, amount }) => {
        if (isLoading) return;

        setIsLoading(true);
        setPaymentSuccess(false);

        console.log("Payment request:", {
            orderId: order.id,
            phone: phoneNumber,
            amount,
        });

        try {
            /*
             * Temporary payment simulation.
             *
             * Replace this section later with
             * your Daraja / M-Pesa API request.
             */
            await new Promise((resolve) =>
                setTimeout(resolve, 2000)
            );

            const savedOrders = JSON.parse(
                localStorage.getItem("orders") || "[]"
            );

            const updatedOrders = savedOrders.map(
                (savedOrder) =>
                    savedOrder.id === order.id
                        ? {
                              ...savedOrder,
                              paymentStatus: "paid",
                              status: "confirmed",
                          }
                        : savedOrder
            );

            localStorage.setItem(
                "orders",
                JSON.stringify(updatedOrders)
            );

            const updatedOrder = updatedOrders.find(
                (savedOrder) => savedOrder.id === order.id
            );

            setOrder(updatedOrder);
            setPaymentSuccess(true);

        } catch (error) {
            console.error("Payment failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    /*
     * Payment successful
     */
    if (paymentSuccess) {
        return (
            <div className="min-h-screen bg-[var(--farm-background)] p-5 flex items-center justify-center">

                <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8 text-center">

                    <div className="flex justify-center mb-5">
                        <div
                            className="
                                w-16
                                h-16
                                rounded-full
                                bg-[var(--farm-green-soft)]
                                flex
                                items-center
                                justify-center
                            "
                        >
                            <LuCircleCheck
                                size={38}
                                className="text-[var(--farm-green)]"
                            />
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-[var(--farm-green-dark)]">
                        Payment Successful
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Your payment for order{" "}
                        <span className="font-semibold text-gray-700">
                            #{order.id}
                        </span>{" "}
                        has been received.
                    </p>

                    <div className="mt-6 p-4 rounded-xl bg-[var(--farm-background)]">
                        <p className="text-sm text-gray-500">
                            Amount Paid
                        </p>

                        <p className="text-2xl font-bold text-[var(--farm-green-dark)] mt-1">
                            Ksh{" "}
                            {Number(order.total).toLocaleString()}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-6">

                        <Link
                            to={`/buyer/orders/${order.id}`}
                            className="
                                flex-1
                                px-5
                                py-3
                                rounded-xl
                                bg-[var(--farm-green)]
                                text-white
                                font-semibold
                                hover:bg-[var(--farm-green-dark)]
                                transition
                            "
                        >
                            View Order
                        </Link>

                        <Link
                            to="/buyer/marketplace"
                            className="
                                flex-1
                                px-5
                                py-3
                                rounded-xl
                                border
                                border-[var(--farm-green-border)]
                                text-[var(--farm-green-dark)]
                                font-semibold
                                hover:bg-[var(--farm-background)]
                                transition
                            "
                        >
                            Continue Shopping
                        </Link>

                    </div>
                </div>
            </div>
        );
    }

    /*
     * Payment page
     */
    return (
        <div className="min-h-screen bg-[var(--farm-background)] p-4 md:p-8">

            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">

                    <Link
                        to="/buyer/checkout"
                        className="
                            flex
                            items-center
                            gap-2
                            text-[var(--farm-green-dark)]
                            font-semibold
                            hover:text-[var(--farm-green)]
                            transition
                        "
                    >
                        <LuArrowLeft size={20} />
                        Back to Checkout
                    </Link>

                    <Link
                        to="/buyer/orders"
                        className="
                            text-sm
                            text-gray-500
                            hover:text-[var(--farm-green-dark)]
                            transition
                        "
                    >
                        My Orders
                    </Link>
                </div>

                {/* Page heading */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">

                    <div className="flex items-center gap-3">

                        <div
                            className="
                                w-11
                                h-11
                                rounded-xl
                                bg-[var(--farm-green-soft)]
                                flex
                                items-center
                                justify-center
                            "
                        >
                            <LuCreditCard
                                size={24}
                                className="text-[var(--farm-green-dark)]"
                            />
                        </div>

                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-[var(--farm-green-dark)]">
                                Payment
                            </h1>

                            <p className="text-sm text-gray-500 mt-1">
                                Complete payment for order #{order.id}
                            </p>
                        </div>

                    </div>
                </div>

                {/* Main payment area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Order summary */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <h2 className="text-xl font-bold text-[var(--farm-green-dark)] mb-5">
                            Order Summary
                        </h2>

                        <PaymentSummary
                            items={order.items}
                            subtotal={order.total}
                            total={order.total}
                        />

                    </div>

                    {/* Payment form */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <h2 className="text-xl font-bold text-[var(--farm-green-dark)] mb-2">
                            Pay for your order
                        </h2>

                        <p className="text-sm text-gray-500 mb-6">
                            Enter your M-Pesa phone number to continue.
                        </p>

                        <PaymentForm
                            amount={order.total}
                            isLoading={isLoading}
                            onPaymentStart={handlePayment}
                        />

                    </div>
                </div>

                {/* Order information */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">

                    <h2 className="font-bold text-lg text-[var(--farm-green-dark)] mb-4">
                        Order Information
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                        <div>
                            <p className="text-sm text-gray-500">
                                Order ID
                            </p>

                            <p className="font-semibold mt-1">
                                #{order.id}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Items
                            </p>

                            <p className="font-semibold mt-1">
                                {order.items?.length || 0}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Amount
                            </p>

                            <p className="font-semibold text-[var(--farm-green-dark)] mt-1">
                                Ksh{" "}
                                {Number(order.total).toLocaleString()}
                            </p>
                        </div>

                    </div>
                </div>

                {/* Bottom navigation */}
                <div className="flex justify-center mt-6">

                    <Link
                        to="/buyer/orders"
                        className="
                            text-gray-500
                            hover:text-[var(--farm-green-dark)]
                            font-semibold
                            transition
                        "
                    >
                        Back to My Orders
                    </Link>

                </div>

            </div>
        </div>
    );
}

export default Payments;