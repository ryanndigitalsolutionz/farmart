import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


function Checkout() {
    const { cart, clearCart } = useCart();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    // information error 
    const [error, setError] = useState("");

    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();
  
    // calculate total in shopping cart
    const total = cart.reduce(
        (sum, animal) => sum + (Number(animal.price) || 0),
        0
    );

    // arrow function to handle order placement
    const handlePlaceOrder = () => {
        if (submitting) return;

        if(!name.trim() || !phone.trim() || !location.trim()){
            setError("Please fill all buyer information.");
            return;
        }

        // create order
        setSubmitting(true);
        setError("");

        const order = {
            id: `ORD-${Date.now()}`,
            buyer: {
                name,
                phone,
                location,
            },
            items: cart,
            total,
            status: "pending",
            paymentStatus: "unpaid",
            createdAt: new Date().toISOString(),
        };

        const existingOrders = JSON.parse(
        localStorage.getItem("orders") || "[]"
        );

        const updateOrders = [...existingOrders, order];

        localStorage.setItem(
            "orders", 
            JSON.stringify(updateOrders)
        );

        setSuccess("order saved successfully.");

        clearCart();

        console.log("Order saved:", order);

        navigate("/order-confirmation", {
            state: { orderId: order.id},
        });
    };    

  return (
    <div className="p-4">
        <h1 className="font-bold text-2xl text-center tracking-wide">Checkout</h1>

        <h2 className="font-semibold">Order Summary</h2>

        {cart.map((animal) => (
            <div key={animal.id}>
                <p>{animal.name}</p>
                <p>
                    Ksh {Number(animal.price).toLocaleString()}
                </p>                
            </div>
        ))}

        <h2>Total: ksh {total.toLocaleString()}</h2>
        <h2>Buyer information</h2>

        {/* buyer information inputs */}
        <div className="">
            <label>
                Full Name
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className=""
                    required
                />
            </label>
        </div>
        <div className="">
            <label>
                Phone Number
                <input 
                    type="text" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className=""
                    required
                />
            </label>
        </div>
        <div className="">
            <label>
                Location
                <input 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter your Location"
                    className=""
                    required
                />
            </label>
        </div>

        {error && <p>{error}</p>}

        <button 
            onClick={handlePlaceOrder} 
            disabled={submitting}
            className="text-green-600 rounded-lg mt-2 font-semibold"
        >
            {submitting ? "Placing order" : "Place Order"}
        </button>

    </div>
  )
}

export default Checkout