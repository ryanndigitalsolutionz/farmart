import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext"
import CartSummary from "../../components/cart/CartSummary";

function Cart() {
    const { cart, removeFromCart} = useCart();
    const itemCount = cart.length;

  return (
    <div className="p-4 shadow-2xl max-h-screen max-w-4xl mx-auto mt-3 ">
        
        <div className="text-center">
            <h1 className="text-2xl font-bold">Shopping Cart ({cart.length})</h1>
            <p className="font-medium">{itemCount} item{itemCount !== 1 ? "s" : ""}</p>

        </div>
        

        {cart.length === 0 ? (
            <div className="text-center mt-4">
                <p className="text-lg text-red-400 font-semibold">Your cart is empty</p>

                <p className="mb-3">Add livestock to your cart before checking out</p>
                <Link 
                    to="/marketplace"
                    className="bg-green-500 p-2 rounded-lg"
                >
                    Continue Shopping
                </Link>

            </div>
            
        ): (
            <div>
                {cart.map((animal) => (
                    <div 
                    key={animal.id}
                    className="flex gap-3 mb-2 p-3 border-black"
                    >
                        <img 
                            src={animal.images?.[0]} 
                            alt={animal.type} 
                            className="w-30 h-30 object-cover"
                        />
                        <div className="">
                            <h2>{animal.breed} {animal.type}</h2>
                            
                            <p className="text-gray-400 text-sm">name: {animal.name}</p>
                            
                            <p>Price: Ksh {Number(animal.price).toLocaleString()}</p>

                            <button 
                                onClick={() => removeFromCart(animal.id)} 
                                className="border bg-green-100 p-1 rounded-lg mt-1">
                                Remove
                            </button>
                            </div>
                    </div>
                ))}

                <CartSummary />
            </div>
        )}
        

    </div>
  );
}

export default Cart;