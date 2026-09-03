import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { FaTrash } from "react-icons/fa";

function Cart() {
    const { cart, removeFromCart} = useCart();
    const itemCount = cart.length;

    const total = cart.reduce(
        (sum, animal) => sum + Number(animal.price),
        0
    )

  return (
    <div className="p-4 max-w-3xl mx-auto shadow-2xl m-1">
        <div className="text-center">
            <h1 className="text-2xl font-bold">Shopping Cart ({cart.length})</h1>
            <p className="font-medium">{itemCount} item{itemCount !== 1 ? "s" : ""}</p>

        </div>
        

        {cart.length === 0 ? (
            <div>
                <p>Your cart is empty</p>

                <p className="mb-3">Add livestock to your cart before checking out</p>
                <Link 
                    to="/buyer/marketplace"
                    className="group relative mt-3 text-gray-400 hover:text-(--farm-green-dark)"
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
            
        ): (
            <div className="flex flex-col justify-center items-center mt-5 ">
                {cart.map((animal) => (
                    <div 
                        key={animal.id}
                        className="flex gap-10 mb-2 p-3 border-[var(--farm-green-border)] border-1 rounded-xl"
                    >
                        <img 
                            src={animal.image} 
                            alt={animal.type} 
                            className="w-30 h-30 object-cover rounded-xl"
                        />
                        <div className="">
                            <h2 className="font-bold">{animal.type} ({animal.breed})</h2>

                            <p>Type: {animal.type}</p>
                            <p>Breed: {animal.breed}</p>
                            <p>Price: Ksh {Number(animal.price).toLocaleString()}</p>
                            <div className="flex justify-center items-center">
                                <button 
                                    onClick={() => removeFromCart(animal.id)} 
                                    className="mt-1 ">
                                    <FaTrash size={20} className="text-red-500" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                <h2 className="font-bold">Total: Ksh {total.toLocaleString()}</h2>

                          
                <div className="flex gap-2 mt-3 mb-1">
                    <Link 
                        to="/buyer/checkout" 
                        className="block w-full"
                    >
                        <button 
                             type="button"
                            className="marketplace-card-button w-50 mt-[15px] p-[12px]
                            border border-[var(--farm-green)] rounded-[11px] bg-[var(--farm-green)]
                            text-white font-[var(--farm-body-font)] text-[13px] font-semibold cursor-pointer
                            transition-[background,transform] duration-[160ms] ease-[ease]
                            hover:bg-[var(--farm-green-dark)] hover:translate-y-[-1px]"
                        >
                            Checkout
                        </button>
                    </Link>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <Link 
                        to="/buyer/marketplace"
                        className="group relative mt-3 text-gray-400 hover:text-(--farm-green-dark) "
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
        )}

    </div>
  );
}

export default Cart;// commit 9
