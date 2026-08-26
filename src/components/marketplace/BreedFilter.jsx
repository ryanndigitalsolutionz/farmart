import React from 'react'

function BreedFilter({ breed, setBreed }) {
  return (
    <div className="outline-0 border rounded-2xl px-2 py-1 w-40 bg-white">
        <select value={breed} onChange={(e) => setBreed(e.target.value)} className='outline-0'>
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