import React from 'react'

function LivestockDetails({ animal }) {
  return (
    <div>
        <h1>Livestock Details</h1>

        <p>{animal?.name}</p>
    </div>
  )
}

export default LivestockDetails