import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext"

function Cart() {
    const { cart, removeFromCart} = useCart();
    const total = cart.reduce(
        (sum, animal) => sum + Number(animal.price),
        0
    )

  return (
    <div className="p-4 min-h-screen">
        <h1 className="text-2xl text-center font-bold">Shopping Cart ({cart.length})</h1>

        {cart.length === 0 ? (
            <p>Your cart is empty</p>
        ): (
            <div>
                {cart.map((animal) => (
                    <div 
                    key={animal.id}
                    className="flex gap-2 mb-2 p-3 border-black"
                    >
                        <img 
                            src={animal.images?.[0]} 
                            alt={animal.name} 
                            className="w-30 h-30 object-cover"
                        />
                        <div className="">
                            <h2>{animal.name}</h2>

                            <p>Type: {animal.type}</p>
                            <p>Breed: {animal.breed}</p>
                            <p>Price: Ksh {Number(animal.price).toLocaleString()}</p>

                            <button onClick={() => removeFromCart(animal.id)} className="border">
                                Remove
                            </button>
                            </div>
                    </div>
                ))}

                <h2 className="font-bold">Total: Ksh {total.toLocaleString()}</h2>

                <Link 
                    to="/checkout" 
                    className=""
                >
                    <button >Checkout</button>
                </Link>

                <Link 
                    to="/marketplace"
                    className="bg-green-600 p-2 text-white rounded-lg"
                >
                    Continue Shopping
                </Link>
            </div>
        )}

    </div>
  );
}

export default Cart;