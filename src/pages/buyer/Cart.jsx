import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext"

function Cart() {
    const { cart, removeFromCart} = useCart();
    const total = cart.reduce(
        (sum, animal) => sum + Number(animal.price),
        0
    )

  return (
    <div className="p-4 ">
        <h1 className="text-2xl text-center font-bold">Shopping Cart ({cart.length})</h1>

        {cart.length === 0 ? (
            <div>
                <p>Your cart is empty</p>

                <p className="mb-3">Add livestock to your cart before checking out</p>
                <Link 
                    to="/marketplace"
                    className="bg-green-500 p-2 rounded-lg "
                >
                    Continue Shopping
                </Link>

            </div>
            
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

                            <button 
                                onClick={() => removeFromCart(animal.id)} 
                                className="border bg-green-100 p-1 rounded-lg mt-1">
                                Remove
                            </button>
                            </div>
                    </div>
                ))}

                <h2 className="font-bold">Total: Ksh {total.toLocaleString()}</h2>

                <div className="flex gap-3">

                
                <Link 
                    to="/marketplace"
                    className="bg-green-600 p-2 text-white rounded-lg cursor-pointer"
                >
                    Continue Shopping
                </Link>
                <Link 
                    to="/checkout" 
                    className="bg-yellow-500 p-2 rounded-lg font-semibold cursor-pointer text-green-600"
                >
                    <button >Checkout</button>
                </Link>
                </div>
            </div>
        )}

    </div>
  );
}

export default Cart;