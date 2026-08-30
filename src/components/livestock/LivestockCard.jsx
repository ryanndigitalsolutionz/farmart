import { useNavigate } from "react-router-dom"
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlist } from "../../context/WishlistContext";

function LivestockCard({ animal, onViewDetails }) {
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(animal.id);

  return (
    <div className='livestockcard relative border border-gray-400 shadow-2xl flex flex-col p-2 items-center rounded-lg'>
      <button
        onClick={() => toggleWishlist(animal)}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5 
        shadow cursor-pointer transition-transform duration-200 hover:scale-110"
      >
        {wishlisted ? (
          <FaHeart size={16} className="text-red-500"/>

        ) : (
          <FaRegHeart size={16} className="text-red-500"/>
        )}
      </button>
        <img 
            src={animal.images?.[0]} 
            alt={animal.type} 
            className="w-full h-65 object-cover rounded-xl"
        />

        <h2 className="font-bold">{animal.breed}{animal.type}</h2>
        <p>{animal.type}</p>
        <p>{animal.breed}</p>
        <p>{animal.age} years</p>
        <p>{animal.weight} kg</p>
        <p className="font-bold">Ksh {animal.price}</p>
        <p className={`font-semibold ${
          animal.availability === "Available"
            ? "text-green-500"
            : animal.availability === "Sold"
            ? "text-red-500"
            : "text-yellow-500"
        }`}>
          {animal.availability}
        </p>

        <button 
          onClick={() => navigate(`/marketplace/${animal.id}`)}
          className="bg-yellow-200 p-2 text-yellow-600 font-medium rounded-lg mb-2 mt-2"
        >
          View Details
        </button>
    </div>
  )
}

export default LivestockCard;