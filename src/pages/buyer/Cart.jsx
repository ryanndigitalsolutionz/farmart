import { useCart } from "../../context/CartContext"

function Cart() {
  return (
    <div>
        <h1>Shopping Cart</h1>
        {Cart.length === 0 ? (
            <p>Your cart is empty</p>
        ): (
            <div>
                {Cart.map((animal) => (
                    <div key={animal.id}>
                        <h2>{animal.id}</h2>

                        <p>Type: {animal.type}</p>
                        <p>Breed: {animal.breed}</p>
                        <p>Price: Ksh {animal.price}</p>

                        <button onClick={() => removeFromCart(animal.id)}>
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        )}

    </div>
  );
}

export default Cart;