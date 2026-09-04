import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    LuArrowLeft,
    LuCircleCheck,
    LuCreditCard,
} from "react-icons/lu";

import PaymentForm from "../../components/payments/PaymentForm";
import PaymentSummary from "../../components/payments/PaymentSummary";

const API_BASE = "http://localhost:5000";

function Payments() {
    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [payment, setPayment] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isPaying, setIsPaying] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentMessage, setPaymentMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const loadOrder = async () => {
            try {
                setIsLoading(true);
                setError("");

                const response = await fetch(
                    `${API_BASE}/orders/${id}`,
                    {
                        credentials: "include",
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                            data.error ||
                            "Unable to load order."
                    );
                }

                setOrder(data);
            } catch (requestError) {
                setError(
                    requestError.message ||
                        "Unable to load this order."
                );
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            loadOrder();
        }
    }, [id]);

    useEffect(() => {
        if (!payment?.id || paymentSuccess) {
            return;
        }

        const interval = setInterval(async () => {
            try {
                const response = await fetch(
                    `${API_BASE}/payments/${payment.id}`,
                    {
                        credentials: "include",
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    return;
                }

                setPayment(data);

                if (data.status === "completed") {
                    setPaymentSuccess(true);

                    const orderResponse = await fetch(
                        `${API_BASE}/orders/${id}`,
                        {
                            credentials: "include",
                        }
                    );

                    if (orderResponse.ok) {
                        const orderData =
                            await orderResponse.json();

                        setOrder(orderData);
                    }
                }

                if (data.status === "failed") {
                    setPaymentMessage(
                        "The M-Pesa payment was not completed."
                    );
                    setIsPaying(false);
                }
            } catch {
                return;
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [payment?.id, paymentSuccess, id]);

    const handlePayment = async ({ phoneNumber }) => {
        if (isPaying || paymentSuccess || !order) {
            return;
        }

        setIsPaying(true);
        setError("");
        setPaymentMessage("");

        try {
            const response = await fetch(
                `${API_BASE}/payments`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        order_id: Number(order.id),
                        phone_number: phoneNumber,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                        data.error ||
                        "Unable to initiate M-Pesa payment."
                );
            }

            if (!data.payment) {
                throw new Error(
                    "M-Pesa request was sent but no payment record was returned."
                );
            }

            setPayment(data.payment);

            setPaymentMessage(
                data.message ||
                    "M-Pesa payment request sent. Check your phone and enter your M-Pesa PIN."
            );
        } catch (requestError) {
            setError(
                requestError.message ||
                    "Unable to initiate M-Pesa payment."
            );
        } finally {
            setIsPaying(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[var(--farm-background)] p-5 flex items-center justify-center">
                <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 text-center">
                    <h1 className="text-2xl font-bold text-[var(--farm-green-dark)]">
                        Loading Order
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Please wait while we load your order.
                    </p>
                </div>
            </div>
        );
    }

    if (error && !order) {
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
                        {error}
                    </p>

                    <Link
                        to="/buyer/orders"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--farm-green)] text-white font-semibold hover:bg-[var(--farm-green-dark)] transition"
                    >
                        <LuArrowLeft />
                        Back to My Orders
                    </Link>
                </div>
            </div>
        );
    }

    if (!order) {
        return null;
    }

    if (paymentSuccess) {
        return (
            <div className="min-h-screen bg-[var(--farm-background)] p-5 flex items-center justify-center">

                <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8 text-center">

                    <div className="flex justify-center mb-5">
                        <div className="w-16 h-16 rounded-full bg-[var(--farm-green-soft)] flex items-center justify-center">
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
                        Your M-Pesa payment for order{" "}
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
                            KSh{" "}
                            {Number(
                                order.total_amount
                            ).toLocaleString()}
                        </p>

                        {payment?.transaction_id && (
                            <p className="text-xs text-gray-500 mt-2">
                                M-Pesa Receipt:{" "}
                                {payment.transaction_id}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-6">

                        <Link
                            to={`/buyer/orders/${order.id}`}
                            className="flex-1 px-5 py-3 rounded-xl bg-[var(--farm-green)] text-white font-semibold hover:bg-[var(--farm-green-dark)] transition"
                        >
                            View Order
                        </Link>

                        <Link
                            to="/buyer/marketplace"
                            className="flex-1 px-5 py-3 rounded-xl border border-[var(--farm-green-border)] text-[var(--farm-green-dark)] font-semibold hover:bg-[var(--farm-background)] transition"
                        >
                            Continue Shopping
                        </Link>

                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--farm-background)] p-4 md:p-8">

            <div className="max-w-5xl mx-auto">

                <div className="flex items-center justify-between mb-6">

                    <Link
                        to="/buyer/checkout"
                        className="flex items-center gap-2 text-[var(--farm-green-dark)] font-semibold hover:text-[var(--farm-green)] transition"
                    >
                        <LuArrowLeft size={20} />
                        Back to Checkout
                    </Link>

                    <Link
                        to="/buyer/orders"
                        className="text-sm text-gray-500 hover:text-[var(--farm-green-dark)] transition"
                    >
                        My Orders
                    </Link>

                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">

                    <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-xl bg-[var(--farm-green-soft)] flex items-center justify-center">
                            <LuCreditCard
                                size={24}
                                className="text-[var(--farm-green-dark)]"
                            />
                        </div>

                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-[var(--farm-green-dark)]">
                                M-Pesa Payment
                            </h1>

                            <p className="text-sm text-gray-500 mt-1">
                                Complete payment for order #{order.id}
                            </p>
                        </div>

                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-xl border border-red-200 bg-red-50 text-red-700">
                        {error}
                    </div>
                )}

                {paymentMessage && (
                    <div className="mb-6 p-4 rounded-xl border border-[var(--farm-green-border)] bg-[var(--farm-green-soft)] text-[var(--farm-green-dark)]">
                        {paymentMessage}
                    </div>
                )}

                {payment?.status === "pending" && !paymentSuccess && (
                    <div className="mb-6 p-4 rounded-xl border border-amber-200 bg-amber-50 text-amber-800">
                        Waiting for your M-Pesa payment confirmation...
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <h2 className="text-xl font-bold text-[var(--farm-green-dark)] mb-5">
                            Order Summary
                        </h2>

                        <PaymentSummary
                            items={order.items || []}
                            subtotal={order.total_amount}
                            total={order.total_amount}
                        />

                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <h2 className="text-xl font-bold text-[var(--farm-green-dark)] mb-2">
                            Pay with M-Pesa
                        </h2>

                        <p className="text-sm text-gray-500 mb-6">
                            Enter your Kenyan M-Pesa number and we will send an STK Push to your phone.
                        </p>

                        <PaymentForm
                            amount={order.total_amount}
                            isLoading={isPaying || payment?.status === "pending"}
                            onPaymentStart={handlePayment}
                        />

                    </div>
                </div>

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
                                KSh{" "}
                                {Number(
                                    order.total_amount
                                ).toLocaleString()}
                            </p>
                        </div>

                    </div>

                </div>

                <div className="flex justify-center mt-6">

                    <Link
                        to="/buyer/orders"
                        className="text-gray-500 hover:text-[var(--farm-green-dark)] font-semibold transition"
                    >
                        Back to My Orders
                    </Link>

                </div>

            </div>
        </div>
    );
}

export default Payments;
