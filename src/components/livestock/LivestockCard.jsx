import React from 'react'

function LivestockCard({ animal }) {
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
    </div>
  )
}

export default LivestockCard;