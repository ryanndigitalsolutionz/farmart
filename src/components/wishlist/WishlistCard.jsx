import { Link } from "react-router-dom";
import { FaRegImage, FaRegTrashAlt } from "react-icons/fa";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

function WishlistCard({ animal }) {
  const { removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const isAvailable = animal.availability?.toLowerCase() === "available";
  const image = animal.images?.[0];
  const title = `${animal.name || animal.breed || "Livestock"}${animal.type ? ` ${animal.type}` : ""}`;
  const price = Number(animal.price);

  const handleMoveToCart = () => {
    if (!isAvailable) return;

    addToCart(animal);
    removeFromWishlist(animal.id);
  };

  return (
    <article className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <Link
        to={`/marketplace/${animal.id}`}
        className="block overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2"
        aria-label={`View ${title}`}
      >
        {image ? (
          <img src={image} alt={title} className="h-36 w-full object-cover sm:h-48" />
        ) : (
          <div className="flex h-36 w-full flex-col items-center justify-center gap-2 bg-green-50 text-sm text-gray-500 sm:h-48">
            <FaRegImage className="text-lg" aria-hidden="true" />
            <span>No image</span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col pt-3">
        <h2 className="font-bold text-gray-900">{title}</h2>
        <p className="mt-1 text-sm text-gray-500">
          {[animal.breed, animal.location].filter(Boolean).join(" · ")}
        </p>
        <p className="mt-3 font-bold text-green-800">
          KES {Number.isFinite(price) ? price.toLocaleString("en-KE", { maximumFractionDigits: 0 }) : "0"}
        </p>

        <div className="mt-auto flex gap-2 pt-4">
          <button
            type="button"
            onClick={handleMoveToCart}
            disabled={!isAvailable}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-bold transition-colors ${
              isAvailable
                ? "bg-green-800 text-white hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2"
                : "cursor-not-allowed bg-gray-200 text-gray-500"
            }`}
          >
            Move to cart
          </button>
          <button
            type="button"
            onClick={() => removeFromWishlist(animal.id)}
            title="Remove from wishlist"
            aria-label="Remove from wishlist"
            className="rounded-lg border border-red-300 p-2 text-red-500 transition-colors hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
          >
            <FaRegTrashAlt aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default WishlistCard;
