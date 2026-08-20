import { useNavigate } from "react-router-dom"

function LivestockCard({ animal, onViewDetails }) {
  const navigate = useNavigate();

  return (
    <div className='livestockcard'>
        <img 
            src={animal.images?.[0]} 
            alt={animal.name} 
            width="200"
        />

        <h2>{animal.name}</h2>
        <p>{animal.type}</p>
        <p>{animal.breed}</p>
        <p>{animal.age} years</p>
        <p>Ksh {animal.price}</p>
        <p>{animal.availability}</p>

        <button 
          onClick={() => navigate(`/marketplace/${animal.id}`)}
          className=""
        >
          View Details
        </button>
    </div>
  )
}

export default LivestockCard;