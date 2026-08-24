import { useNavigate } from "react-router-dom"

function LivestockCard({ animal, onViewDetails }) {
  const navigate = useNavigate();

  return (
    <div className='livestockcard border border-gray-400 shadow-2xl flex flex-col p-2 items-center rounded-lg'>
        <img 
            src={animal.images?.[0]} 
            alt={animal.name} 
            className="w-full h-65 object-cover rounded-xl"
        />

        <h2 className="font-bold">{animal.name}</h2>
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