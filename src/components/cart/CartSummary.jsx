import { useCart } from "../../context/CartContext"
import { Link } from "react-router-dom";


function CartSummary() {
    const { cart } = useCart();
    const itemCount = cart.length;

    const total = cart.reduce(
        (sum, animal) => sum + Number(animal.price),
        0
    )
  return (
    
    <div className="mt-3 p-3 border rounded-lg ">
        <h1>Cart Summary</h1>
        <h2 className="font-bold">Total: Ksh {total.toLocaleString()}</h2>
        <p>Item's total: {itemCount}</p>

        <div className="flex gap-3 mt-2">
        
            <Link 
                to="/marketplace"
                className="bg-green-600 p-2 text-white rounded-lg cursor-pointer font-semibold"
            >
                Continue Shopping
            </Link>
            <Link 
                to="/checkout" 
                className="bg-yellow-400 p-2 rounded-lg font-semibold cursor-pointer text-orange-600"
            >
                <button >Checkout</button>
            </Link>
        </div>

    </div>
  )
}

export default CartSummary