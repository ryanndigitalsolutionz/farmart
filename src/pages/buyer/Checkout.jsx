import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import CheckoutSteps from "./CheckoutSteps";
import OrderConfirmation from "./OrderConfirmation";
import Delivery from "../delivery/Delivery";

function Checkout() {
    const { cart, clearCart } = useCart();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [orderNote, setOrderNote] = useState("");
    // information error 
    const [error, setError] = useState("");

    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const [deliverMethod, setDeliveryMethod] = useState("standard");
    

    const [currentStep, setCurrentStep] = useState(1);
  
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
            },
            delivery: {
                location,
                method: deliverMethod,
                note: "orderNote",
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

        navigate(`/payments/${order.id}`);
    };    

  return (
    <div className="p-4 max-w-3xl mx-auto shadow-2xl m-3 items-center justify-center flex flex-col gap-4">
        <div className="">
            <h1 className="font-bold text-2xl text-center tracking-wide mb-2">
                Checkout
            </h1>
            <CheckoutSteps currentStep={currentStep} />


        </div>
        <div className="flex flex-col justify-center items-center mt-5">
            {currentStep === 1 && (
                <div>
                    <h2 className="font-bold  mb-5 tracking-wide text-xl text-gray-700 text-center p-2">Order Summary</h2>
                    <OrderConfirmation />
                

                {cart.map((animal) => (
                    <div key={animal.id} className="flex flex-col gap-1">                
                        <div className="flex gap-3">
                            <img 
                                src={animal.images} 
                                alt={animal.type} 
                                className="w-35 h-35 object-cover mb-4"
                            />
                            <div className="flex flex-col gap-1">
                                <p className="font-bold text-xl ">{animal.breed} {animal.type}</p>                                
                                <p className="text-gray-400">{animal.age} years - {animal.weight} kg</p>
                                <p className="text-gray-400">{animal.location}</p>
                                <p className="font-semibold">
                                Price: Ksh {Number(animal.price).toLocaleString()}
                                </p>
                            </div>  
                        </div>              
                    </div>
                ))}

                <h2 className="font-bold text-xl mt-3 text-green-700">Total: ksh {total.toLocaleString()}</h2>

                <div className="flex gap-4 mt-3 mb-4">
                    <button 
                            onClick={() => setCurrentStep(2)}
                            className="text-green-600 font-semibold border-3 p-2 px-4 py-1 rounded-lg hover:bg-green-500 hover:text-white"
                        >
                            Continue to payment
                    </button>
                    <Link 
                        to="/marketplace"
                        className="bg-green-600 px-2 py-1 rounded-lg  text-white font-semibold hover:bg-green-900 "
                    >
                    Continue Shopping
                    </Link>
                </div>

                </div>
            )}

            {currentStep === 2 && (
                <Delivery
                    name={name}
                    setName={setName}
                    phone={phone}
                    setPhone={setPhone}
                    location={location}
                    setLocation={setLocation}
                    orderNote={orderNote}
                    setOrderNote={setOrderNote}
                    error={error}
                    submitting={submitting}
                    onContinue={handlePlaceOrder}
                />
            )}

            {currentStep === 3 && (
                
                <Payments
                    total={total}
                    onBack={() => setCurrentStep(2)}
                    onPlaceOrder={handlePlaceOrder}
                />
            )}
        </div>

    </div>
  )
}   

export default Checkout;