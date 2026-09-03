import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function OrderDetails() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const savedOrders = JSON.parse(
            localStorage.getItem("orders") || "[]"
        );

        const foundOrder = savedOrders.find(
            (savedOrder) => savedOrder.id === orderId
        );

        setOrder(foundOrder);
    }, [orderId]);

    if (!order) {
        return (
            <div className="flex flex-col gap-2 mt-10 justify-center items-center">
                <h1 className="text-red-500 font-bold">
                    Order Not Found
                </h1>

                <Link
                    to="/buyer/marketplace"
                    className="mt-3 px-5 py-3 rounded-lg
                    bg-[var(--farm-green)] text-white font-semibold
                    hover:bg-[var(--farm-green-dark)]
                    transition"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="p-4 max-w-3xl mx-auto shadow-2xl shadow-green-900">

            <div className="max-w-2xl mx-auto">
            {/* Page title */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold">
                    Order Details
                </h1>

                <p className="text-gray-500 mt-1">
                    Order #{order.id}
                </p>
            </div>

            {/* Order Summary */}
            <div className="border rounded-xl overflow-hidden mb-5">

                <div className="bg-gray-50 px-5 py-3 border-b">
                    <h2 className="font-semibold">
                        Order Summary
                    </h2>
                </div>

                <div className="divide-y">

                    <div className="flex justify-between items-center px-5 py-4">
                        <span className="text-gray-500">
                            Order ID
                        </span>

                        <span className="font-medium">
                            {order.id}
                        </span>
                    </div>

                    <div className="flex justify-between items-center px-5 py-4">
                        <span className="text-gray-500">
                            Order Status
                        </span>

                        <span className="font-semibold">
                            {order.status
                                ? order.status.charAt(0).toUpperCase() +
                                  order.status.slice(1)
                                : "Pending"}
                        </span>
                    </div>

                    <div className="flex justify-between items-center px-5 py-4">
                        <span className="text-gray-500">
                            Payment Status
                        </span>

                        <span
                            className={
                                order.paymentStatus === "paid"
                                    ? "text-green-700 bg-green-50"
                                    : order.paymentStatus === "pending"
                                    ? "text-amber-700 bg-amber-50"
                                    : "text-orange-700 bg-orange-500"
                            }
                        >
                            {order.paymentStatus
                                ? order.paymentStatus.charAt(0).toUpperCase() +
                                order.paymentStatus.slice(1)
                                : "Unpaid"}
                        </span>
                    </div>

                    <div className="flex justify-between items-center px-5 py-4">
                        <span className="text-gray-500">
                            Date
                        </span>

                        <span>
                            {new Date(
                                order.createdAt
                            ).toLocaleDateString()}
                        </span>
                    </div>

                </div>
            </div>


            {/* Buyer Information */}
            <div className="border rounded-xl overflow-hidden mb-5">

                <div className="bg-gray-50 px-5 py-3 border-b">
                    <h2 className="font-semibold">
                        Buyer Information
                    </h2>
                </div>

                <div className="divide-y">

                    <div className="flex justify-between px-5 py-4">
                        <span className="text-gray-500">
                            Name
                        </span>

                        <span className="font-medium">
                            {order.buyer.name}
                        </span>
                    </div>

                    <div className="flex justify-between px-5 py-4">
                        <span className="text-gray-500">
                            Phone
                        </span>

                        <span>
                            {order.buyer.phone}
                        </span>
                    </div>

                    <div className="flex justify-between px-5 py-4">
                        <span className="text-gray-500">
                            Location
                        </span>

                        <span>
                            {order.delivery?.location ||
                                "Not provided"}
                        </span>
                    </div>

                </div>
            </div>


            {/* Items */}
            <div className="border rounded-xl overflow-hidden mb-5">

                <div className="bg-gray-50 px-5 py-3 border-b">
                    <h2 className="font-semibold">
                        Items ({order.items.length})
                    </h2>
                </div>

                <div className="divide-y">

                    {order.items.map((animal, index) => (
                        <div
                            key={animal.id}
                            className="px-5 py-4 flex flex-col gap-2"
                        >

                            {/* Item heading */}
                            <div className="flex justify-between items-center">

                                <h3 className="font-semibold">
                                    {index + 1}.{" "}
                                    {animal.name ||
                                        `${animal.breed} ${animal.type}`}
                                </h3>

                                <span className="font-semibold">
                                    Ksh{" "}
                                    {Number(
                                        animal.price
                                    ).toLocaleString()}
                                </span>

                            </div>

                            {/* Item details */}
                            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500">

                                <span>
                                    <strong className="text-gray-700">
                                        Type:
                                    </strong>{" "}
                                    {animal.type}
                                </span>

                                <span>
                                    <strong className="text-gray-700">
                                        Breed:
                                    </strong>{" "}
                                    {animal.breed}
                                </span>

                            </div>

                        </div>
                    ))}

                </div>
            </div>


            {/* Total */}
            <div className="border rounded-xl px-5 py-5 mb-6 flex justify-between items-center">
                <span className="text-lg font-semibold">
                    Total
                </span>

                <span className="text-xl font-bold">
                    Ksh{" "}
                    {Number(order.total).toLocaleString()}
                </span>
            </div>
            </div>


            {/* Continue Shopping */}
            <div className="text-center">

                <Link
                    to="/buyer/marketplace"
                    className="group relative inline-block text-gray-400
                    hover:text-(--farm-green-dark)"
                >
                    <span
                        className="absolute -bottom-1 left-1/2 h-0.5 w-6
                        -translate-x-1/2 scale-x-0 rounded-full
                        bg-(--farm-green-dark)
                        transition-transform duration-300
                        group-hover:scale-x-100"
                    />

                    Continue Shopping
                </Link>

            </div>

        </div>
    );
}

export default OrderDetails;

