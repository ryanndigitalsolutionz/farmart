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
        <div>
            <h1>Order Details</h1>

            <h2>{order.id}</h2>
            <p>Status: {order.status}</p>

            <p>
                Date:{" "}
                {new Date(order.createdAt).toLocaleDateString()}
            </p>

            <h2>Buyer Information</h2>

            <p>Name: {order.buyer.name}</p>
            <p>Phone: {order.buyer.phone}</p>
            <p>Location: {order.buyer.location}</p>
        </div>
    )

  
}

export default OrderDetails