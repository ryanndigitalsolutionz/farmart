import { Link } from "react-router-dom"
import { useWishlist } from "../../context/WishlistContext"
import { useCart } from "../../context/CartContext"
import { FaStar } from "react-icons/fa";


function WishlistCard({ animal }) {
    const { removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const isAvailable = animal.availability?.toLowercase() === "available";

    const handleMoveToCart = () => {
        addToCart(animal);
        removeFromWishlist(animal.id);
    }
    
  return (
    <div className="border border-gray-400 flex">
        <Link to={`/marketplace/${animal.id}`} className="w-full">
            <img 
                src={animal.image?.[0]} 
                alt={animal.type} 
                className="w-full h-48 object-cover rounded-xl"
            />
        </Link>
        <h2 className="font-bold mt-2">{animal.breed} {animal.type}</h2>
        <p className="text-gray-400 text-sm ">{animal.age} years &middot; {animal.weight} Kg</p>

        <div className="">
            <span>{animal.seller?.name}</span>
            <span>&middot;</span>
            <span>{animal.location}</span>
        </div>

        {animal.seller?.rating && (
            <div className="flex items-center gap-1 text-gray-500">
                <FaStar color="gold"/>
                <span>{animal.seller.rating}</span>
                <span>({animal.seller.reviewCount} reviews)</span>
            </div>
        )}
        <p className="font-bold text-green-800 mt-1">
            Ksh {Number(animal.price).toLocaleString()} 
        </p>

        <p className={`font-semibold ${
            isAvailable? "text-green-600" :"text-red-500"
            }`}
        >
            {animal.availability}
        </p>

        <div>
            <button
                onClick={handleMoveToCart}
                disabled={!isAvailable}
                className={`flex-1 p-2 rounded-lg font-semibold transition-all duration-200${
                    isAvailable 
                    ? "bg-green-600 text-white cursor-pointer hover:translate-y-1 hover:scale-105 hover:shadow-lg"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
            >
                Move to Cart
            </button>
            <button
                onClick={() => removeFromWishlist(animal.id)}
                className="flex-1 border border-red-400 text-red-500 font-semibold p-2 rounded-lg cursor-pointer transition-colors hover:bg-red-50"
            >
                Remove
            </button>
        </div>

    </div>
  )
}

export default WishlistCard