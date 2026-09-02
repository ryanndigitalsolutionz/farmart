import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import useLivestock from "../../hooks/useLivestock";
import { useCart } from "../../context/CartContext";
import { LuWeight, LuMapPinned } from "react-icons/lu";
import { GrStatusInfo } from "react-icons/gr";
import { GiFarmTractor, GiDna2, GiHealthNormal } from "react-icons/gi";
import { FaCalendarAlt, FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlist } from "../../context/WishlistContext";
import ReviewList from "../../components/reviews/ReviewList";

function LivestockDetails() {
  const { id } = useParams();
  const { livestock, loading } = useLivestock();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(null);

  if (loading) {
    return <p>Loading livestock...</p>;
  }

  const animal = livestock.find((livestockAnimal) => livestockAnimal.id === id);
  const mainImage = selectedImage || animal?.images?.[0];

  if (!animal) {
    return <p>Livestock not found.</p>;
  }

  return (
    <div className="p-5 max-w-2xl mx-auto shadow-2xl m-1">
      <img
        src={mainImage}
        alt={animal.type}
        className="w-full h-77 rounded-lg mb-4 object-cover object-[center_40%]"
      />

      <div className="flex gap-3 flex-wrap">
        {animal.images?.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${animal.name} ${index + 1}`}
            onClick={() => setSelectedImage(image)}
            style={{ margin: "5px" }}
            className="w-22.5 h-22.5 lg:w-27.5 lg:h-27.5 object-cover rounded-lg cursor-pointer"
          />
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => toggleWishlist(animal)}
          aria-label={isInWishlist(animal.id) ? "Remove from wishlist" : "Add to wishlist"}
          className="cursor-pointer transition-transform duration-200 hover:scale-110"
        >
          {isInWishlist(animal.id) ? (
            <FaHeart size={20} className="text-red-500" />
          ) : (
            <FaRegHeart size={20} className="text-gray-400" />
          )}
        </button>
      </div>

      <div className="mb-2 mt-2">
        <div className="flex justify-between">
          <h1 className="flex items-center gap-2 font-bold text-2xl">
            {animal.breed} {animal.type}
          </h1>
          <p className="text-green-700 font-bold">Ksh {animal.price}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="flex items-center gap-5"><GiDna2 /> Breed</span>
        <span>{animal.breed}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-5"><FaCalendarAlt /> Age</span>
        <span>{animal.age} years</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-5"><LuWeight /> Weight</span>
        <span>{animal.weight} kg</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-5"><LuMapPinned /> Location</span>
        <span>{animal.location}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-5"><GrStatusInfo size={20} /> Status</span>
        <span className={`p-1 rounded-lg text-white font-semibold ${animal.availability?.toLowerCase() === "available" ? "bg-green-600" : "bg-red-600"}`}>
          {animal.availability}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-5"><GiHealthNormal size={20} /> Health Info</span>
        <span>{animal.health?.vaccinated ? "Vaccinated, Healthy" : "Not Vaccinated"}</span>
      </div>

      <div className="flex items-center justify-between">
        <span className="flex items-center gap-5"><GiFarmTractor size={20} /> Farm</span>
        <div className="flex flex-col">
          <span className="font-bold text-end">{animal.seller.name}</span>
          <div className="flex gap-2 text-sm items-center">
            <FaStar size={20} color="gold" />
            <span>{animal.seller.rating}</span>
            <div><ReviewList animalId={animal.id} /></div>
          </div>
        </div>
      </div>

      <p className="flex flex-col gap-2">
        <span className="font-bold text-2xl mt-2">About this animal</span>
        {animal.description}
      </p>

      {animal.availability?.toLowerCase() === "available" ? (
        <div className="mb-4 mt-2 flex gap-2">
          <button onClick={() => addToCart(animal)} className="bg-yellow-500 p-2 rounded-lg font-medium cursor-pointer">
            Add to Cart
          </button>
          <Link to="/cart" className="bg-green-100 p-2 rounded-lg font-medium">
            View cart
          </Link>
        </div>
      ) : (
        <p className="text-red-500 mb-3 font-semibold mt-2">This Animal is currently unavailable</p>
      )}

      <div className="flex flex-col items-center justify-center">
        <Link 
            to="/marketplace"
          className="group relative mt-3 text-gray-400 hover:text-(--farm-green-dark)"
        >
        Back to Marketplace
        <span
          className="absolute -bottom-1 left-1/2 h-0.5 w-6
                    -translate-x-1/2 scale-x-0 rounded-full
              bg-(--farm-green-dark)
                    transition-transform duration-300
                    group-hover:scale-x-100"
        />
        </Link>
    </div>
    </div>
  );
}

export default LivestockDetails;