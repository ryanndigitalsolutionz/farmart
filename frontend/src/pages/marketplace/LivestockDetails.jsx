
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import useLivestock from "../../hooks/useLivestock";
import { useCart } from "../../context/CartContext";
import { LuWeight, LuMapPinned, LuShoppingCart } from "react-icons/lu";
import { GrStatusInfo } from "react-icons/gr";
import {
  GiFarmTractor,
  GiDna2,
  GiHealthNormal,
} from "react-icons/gi";
import {
  FaCalendarAlt,
  FaStar,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { useWishlist } from "../../context/WishlistContext";
import ReviewList from "../../components/reviews/ReviewList";

function LivestockDetails() {
  const { id } = useParams();
  const { livestock, loading } = useLivestock();

  const { cart, addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [added, setAdded] = useState(false);

  // Number of items currently in the cart
  const cartCount = cart?.length || 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading livestock...</p>
      </div>
    );
  }

  const animal = livestock.find(
    (livestockAnimal) => livestockAnimal.id === Number(id)
  );

  if (!animal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Livestock not found.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(animal);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <div className="p-5 max-w-2xl mx-auto shadow-2xl m-1">

      {/* Top bar */}
      <div className="flex items-center justify-between mb-5">

        {/* Back */}
        <Link
          to="/buyer/marketplace"
          className="
            text-gray-500
            font-semibold
            hover:text-[var(--farm-green-dark)]
            transition
          "
        >
          ← Marketplace
        </Link>

        {/* Cart */}
        <Link
          to="/buyer/cart"
          className="
            flex items-center gap-2
            px-4 py-2.5
            rounded-xl
            bg-[var(--farm-green)]
            text-white
            font-semibold
            shadow-md
            hover:bg-[var(--farm-green-dark)]
            transition
          "
        >
          <LuShoppingCart size={22} />

          <span>Cart</span>

          <span
            className="
              min-w-[26px]
              h-[26px]
              px-2
              flex
              items-center
              justify-center
              rounded-full
              bg-white
              text-[var(--farm-green-dark)]
              text-xs
              font-bold
            "
          >
            {cartCount}
          </span>
        </Link>
      </div>

      {/* Animal image */}
      <img
        src={animal.image}
        alt={animal.type}
        className="
          w-full
          h-77
          rounded-lg
          mb-4
          object-cover
          object-[center_40%]
        "
      />

      {/* Wishlist */}
      <div className="flex justify-end">
        <button
          onClick={() => toggleWishlist(animal)}
          aria-label={
            isInWishlist(animal.id)
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className="
            cursor-pointer
            transition-transform
            duration-200
            hover:scale-110
          "
        >
          {isInWishlist(animal.id) ? (
            <FaHeart
              size={20}
              className="text-red-500"
            />
          ) : (
            <FaRegHeart
              size={20}
              className="text-gray-400"
            />
          )}
        </button>
      </div>

      {/* Animal heading */}
      <div className="mb-2 mt-2">
        <div className="flex justify-between items-center gap-4">
          <h1 className="flex items-center gap-2 font-bold text-2xl">
            {animal.breed} {animal.type}
          </h1>

          <p className="text-green-700 font-bold whitespace-nowrap">
            Ksh {Number(animal.price).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Animal details */}
      <div className="flex items-center justify-between py-2">
        <span className="flex items-center gap-5 font-bold">
          <GiDna2 />
          Breed
        </span>

        <span>{animal.breed}</span>
      </div>

      <div className="flex items-center justify-between py-2">
        <span className="flex items-center gap-5 font-bold">
          <FaCalendarAlt />
          Age
        </span>

        <span>{animal.age} years</span>
      </div>

      <div className="flex items-center justify-between py-2">
        <span className="flex items-center gap-5 font-bold">
          <LuWeight />
          Weight
        </span>

        <span>{animal.weight} kg</span>
      </div>

      <div className="flex items-center justify-between py-2">
        <span className="flex items-center gap-5 font-bold">
          <LuMapPinned />
          Location
        </span>

        <span>{animal.location}</span>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between py-2">
        <span className="flex items-center gap-5 font-bold">
          <GrStatusInfo size={20} />
          Status
        </span>

        <span
          className={`
            p-1 px-2
            rounded-lg
            text-white
            font-semibold
            ${
              animal.availability?.toLowerCase() === "available"
                ? "bg-green-600"
                : "bg-red-600"
            }
          `}
        >
          {animal.availability}
        </span>
      </div>

      {/* Health */}
      <div className="flex items-center justify-between py-2">
        <span className="flex items-center gap-5 font-bold">
          <GiHealthNormal size={20} />
          Health Info
        </span>

        <span>
          {animal.health?.vaccinated
            ? "Vaccinated, Healthy"
            : "Not Vaccinated"}
        </span>
      </div>

      {/* Farm information */}
      <div className="flex items-center justify-between mt-2">
        <span className="flex items-center gap-5 font-bold">
          <GiFarmTractor size={20} />
          Farm
        </span>

        <div className="flex flex-col">
          <span className="font-bold text-end">
            {animal.seller?.name}
          </span>

          <div className="flex gap-2 text-sm items-center">
            <FaStar
              size={20}
              color="gold"
            />

            <span>
              {animal.seller?.rating}
            </span>

            <ReviewList livestockId={animal.id} />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2 mt-3">
        <span className="font-bold text-2xl">
          About this animal
        </span>

        <p>{animal.description}</p>
      </div>

      {/* Add to Cart */}
      {animal.availability?.toLowerCase() === "available" ? (
        <div className="mt-5">

          <button
            onClick={handleAddToCart}
            className={`
              w-full
              p-3
              border
              rounded-[11px]
              text-white
              font-semibold
              cursor-pointer
              transition
              duration-200
              ${
                added
                  ? "bg-green-600 border-green-600"
                  : "bg-[var(--farm-green)] border-[var(--farm-green)] hover:bg-[var(--farm-green-dark)]"
              }
            `}
          >
            {added ? (
              <span className="flex items-center justify-center gap-2">
                ✓ Added to Cart
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <LuShoppingCart size={20} />
                Add to Cart
              </span>
            )}
          </button>

          {/* Cart shortcut after adding */}
          {added && (
            <Link
              to="/buyer/cart"
              className="
                block
                text-center
                mt-3
                text-[var(--farm-green-dark)]
                font-semibold
                hover:underline
              "
            >
              Go to Cart →
            </Link>
          )}
        </div>
      ) : (
        <p className="text-red-500 mb-3 font-semibold mt-4 text-center">
          This Animal is currently unavailable
        </p>
      )}


    </div>
  );
}

export default LivestockDetails;

