import { useNavigate } from "react-router-dom"

function LivestockCard({ animal, onViewDetails }) {
  const navigate = useNavigate();

  return (
    <div className='livestockcard border border-amber-200 shadow-2xl flex flex-col p-1 items-center'>
        <img 
            src={animal.images?.[0]} 
            alt={animal.name} 
            className="w-full h-80 object-cover"
        />

        <h2 className="font-bold">{animal.name}</h2>
        <p>{animal.type}</p>
        <p>{animal.breed}</p>
        <p>{animal.age} years</p>
        <p>Ksh {animal.price}</p>
        <p>{animal.availability}</p>

        <button 
          onClick={() => navigate(`/marketplace/${animal.id}`)}
          className="bg-yellow-200 p-2 text-yellow-600 font-medium rounded-lg mb-2"
        >
          View Details
        </button>
    </div>
  )
}

export default LivestockCard;