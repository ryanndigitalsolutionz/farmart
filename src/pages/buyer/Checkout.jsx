import { useCart } from "../../context/CartContext"

function Checkout() {
    const { cart } = useCart();

    const total = cart.reuce(
        (sum, animal) => sum + Number(animal.price),
        0
    );

  return (
    <div>
        <h1>Checkout</h1>

        <h2>order Summary</h2>

        {cart.map((animal) => (
            <div key={animal.id}>
                <p>{animal.name}</p>
                <p>
                    Ksh {Number(animal.price).toLocaleString}
                </p>                
            </div>
        ))}

        <h2>Total: ksh {total.toLocaleString()}</h2>
        <h2>Buyer information</h2>

        <p>Checkout form coming next..</p>

    </div>
  )
}

export default Checkout