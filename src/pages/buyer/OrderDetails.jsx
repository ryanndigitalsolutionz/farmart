import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


function OrderDetails() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const saveOrders = JSON.parse(
            localStorage.getItem("orders") || "[]"
        );

        const foundOrder = saveOrders.find(
            (saveOrder) => saveOrder.id === id
        );
        setOrder(foundOrder);
    }, [id]);

    if(!order) {
        return (
            <div>
                <h1>Order Not Found</h1>

                <Link to="/orders">
                    Back to my orders
                </Link>
            </div>
        );
    }

    return (
        <div className="p-4 text-center m-2 shadow-2xl h-screen flex flex-col">
            <h1 className="font-bold text-2xl mb-3 tracking-widest text-green-900">Order Details</h1>

            <h2>{order.id}</h2>

            <div>
                <p>Order status</p>
                <strong>
                    {order.status.charAt(0).toUpperCase() + 
                        order.status.slice(1)}             
                </strong>

            </div>
            <div>
                <p>Payment status</p>
                <strong >
                    {order.paymentStatus
                        ? order.paymentStatus.charAt(0).toUpperCase() + 
                            order.paymentStatus.slice(1) 
                        : "unpaid"}
                </strong>

            </div>
            

            <p>
                Date:{" "}
                {new Date(order.createdAt).toLocaleDateString()}
            </p>

            <h2>Buyer Information</h2>

            <p>Name: {order.buyer.name}</p>
            <p>Phone: {order.buyer.phone}</p>
            <p>Location: {order.buyer.location}</p>

            <h2 className="font-semibold">Items</h2>
            {order.items.map((animal) => (
                <div key={animal.id}>
                    <h3 className="font-medium">{animal.name}</h3>

                    <p>Type: {animal.type}</p>
                    <p>Breed: {animal.breed}</p>

                    <p>
                        Price: Ksh {Number(animal.price).toLocaleString()}
                    </p>

                </div>
            ))}

            <h2 className="font-bold">
                Total: Ksh {Number(order.total).toLocaleString()}
            </h2>
            <div className=" flex justify-center gap-5 mt-4">
                {order.paymentStatus !== "paid" && (
                    <Link 
                        to={`/payments/${order.id}`}
                        className="bg-yellow-400 p-2 rounded-lg text-orange-900
                            transition-all duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
                    >
                        Pay Now
                    </Link>

                )}
                <Link 
                    to="/marketplace"
                    className="bg-green-500 p-2 rounded-lg text-white
                        transition-all duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
                >
                    Continue shopping
                </Link>
            </div>

        </div>
    )

  
}

export default OrderDetails;