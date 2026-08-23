import React from 'react'

function BreedFilter({ breed, setBreed }) {
  return (
    <div>
        <select value={breed} onChange={(e) => setBreed(e.target.value)}>
            <option value="">All Breeds</option>
            <option value="Boer">Boer</option>
            <option value="Friesian">Friesian</option>
            <option value="Dorper">Dorper</option>
            <option value="Kienyeji">Kienyeji</option>
            <option value="Landrace">Landrace</option>
        </select>
    </div>
  )
}
export default BreedFilter