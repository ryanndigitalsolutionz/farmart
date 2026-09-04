import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { FaTrash, FaShoppingCart, FaArrowLeft } from "react-icons/fa";

function Cart() {
    const { cart, removeFromCart } = useCart();

    const itemCount = cart.length;

    const total = cart.reduce(
        (sum, item) => sum + Number(item.price),
        0
    );

    return (
        <main className="min-h-screen bg-[var(--farm-background)] text-[var(--farm-text)] px-4 py-8">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="flex justify-center mb-3">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[var(--farm-green-soft)] text-[var(--farm-green)]">
                            <FaShoppingCart size={22} />
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold font-[var(--farm-heading-font)]">
                        Shopping Cart
                    </h1>

                    <p className="mt-2 text-sm text-[var(--farm-muted)]">
                        {itemCount} item{itemCount !== 1 ? "s" : ""} in your cart
                    </p>
                </div>

                {/* Empty Cart */}
                {cart.length === 0 ? (
                    <div className="bg-[var(--farm-green-soft)] border border-[var(--farm-green-border)] rounded-2xl p-10 text-center shadow-sm">
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 rounded-full bg-[var(--farm-background)] flex items-center justify-center text-[var(--farm-muted)]">
                                <FaShoppingCart size={24} />
                            </div>
                        </div>

                        <h2 className="text-xl font-bold font-[var(--farm-heading-font)]">
                            Your cart is empty
                        </h2>

                        <p className="mt-2 text-sm text-[var(--farm-muted)] max-w-md mx-auto">
                            You haven't added any livestock or farm products yet.
                            Browse the marketplace and add something you like.
                        </p>

                        <Link
                            to="/buyer/marketplace"
                            className="inline-flex items-center justify-center gap-2 mt-6 px-5 py-3 rounded-xl
                            bg-[var(--farm-green)] text-white text-sm font-semibold no-underline
                            transition-all duration-200
                            hover:bg-[var(--farm-green-dark)] hover:-translate-y-0.5"
                        >
                            <FaArrowLeft size={12} />
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

                        {/* Cart Items */}
                        <section className="space-y-4">

                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-lg font-bold font-[var(--farm-heading-font)]">
                                    Your Items
                                </h2>

                                <span className="text-xs text-[var(--farm-muted)]">
                                    {itemCount} item{itemCount !== 1 ? "s" : ""}
                                </span>
                            </div>

                            {cart.map((item) => (
                                <article
                                    key={item.id}
                                    className="flex gap-4 p-4 bg-[var(--farm-green-soft)]
                                    border border-[var(--farm-green-border)]
                                    rounded-2xl shadow-sm
                                    transition-all duration-200
                                    hover:border-[var(--farm-green)]
                                    hover:shadow-md"
                                >
                                    {/* Image */}
                                    <div className="shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name || item.type}
                                            className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0">

                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <p className="text-xs uppercase tracking-wide font-bold text-[var(--farm-green)]">
                                                    {item.category || "Farm Item"}
                                                </p>

                                                <h3 className="mt-1 text-base sm:text-lg font-bold font-[var(--farm-heading-font)]">
                                                    {item.name || item.type}
                                                </h3>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeFromCart(item.id)}
                                                aria-label={`Remove ${item.name || item.type} from cart`}
                                                className="shrink-0 w-9 h-9 flex items-center justify-center
                                                rounded-lg border border-transparent
                                                text-red-500 bg-transparent cursor-pointer
                                                transition-all duration-200
                                                hover:bg-red-50 hover:border-red-100"
                                            >
                                                <FaTrash size={14} />
                                            </button>
                                        </div>

                                        {/* Livestock Details */}
                                        {item.breed && (
                                            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--farm-muted)]">
                                                <span>
                                                    <strong>Type:</strong> {item.type}
                                                </span>

                                                <span>
                                                    <strong>Breed:</strong> {item.breed}
                                                </span>
                                            </div>
                                        )}

                                        {/* Product Details */}
                                        {!item.breed && item.type && (
                                            <p className="mt-2 text-xs text-[var(--farm-muted)]">
                                                Type: {item.type}
                                            </p>
                                        )}

                                        <div className="mt-3">
                                            <span className="text-lg font-bold text-[var(--farm-text)]">
                                                KSh {Number(item.price).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </section>

                        {/* Order Summary */}
                        <aside className="lg:sticky lg:top-6 h-fit">
                            <div className="bg-[var(--farm-green-soft)]
                                border border-[var(--farm-green-border)]
                                rounded-2xl p-5 shadow-sm">

                                <h2 className="text-lg font-bold font-[var(--farm-heading-font)]">
                                    Order Summary
                                </h2>

                                <div className="mt-5 space-y-3">

                                    <div className="flex justify-between text-sm">
                                        <span className="text-[var(--farm-muted)]">
                                            Items
                                        </span>

                                        <span className="font-medium">
                                            {itemCount}
                                        </span>
                                    </div>

                                    <div className="border-t border-[var(--farm-green-border)] pt-4 flex justify-between items-center">
                                        <span className="font-semibold">
                                            Total
                                        </span>

                                        <span className="text-xl font-bold text-[var(--farm-green)]">
                                            KSh {total.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <Link
                                    to="/buyer/checkout"
                                    className="block w-full mt-6 no-underline"
                                >
                                    <button
                                        type="button"
                                        className="w-full py-3 px-4 rounded-xl
                                        border border-[var(--farm-green)]
                                        bg-[var(--farm-green)]
                                        text-white font-semibold text-sm
                                        cursor-pointer
                                        transition-all duration-200
                                        hover:bg-[var(--farm-green-dark)]
                                        hover:-translate-y-0.5
                                        hover:shadow-md"
                                    >
                                        Proceed to Checkout
                                    </button>
                                </Link>

                                <Link
                                    to="/buyer/marketplace"
                                    className="flex items-center justify-center gap-2
                                    mt-4 text-sm text-[var(--farm-muted)]
                                    no-underline
                                    hover:text-[var(--farm-green-dark)]"
                                >
                                    <FaArrowLeft size={11} />
                                    Continue Shopping
                                </Link>
                            </div>
                        </aside>
                    </div>
                )}
            </div>
        </main>
    );
}

export default Cart;
