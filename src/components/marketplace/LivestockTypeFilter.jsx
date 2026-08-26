import React from 'react'

function LivestockTypeFilter({ type, setType }) {
  return (
    <div className="outline-0 border rounded-2xl px-2 py-1 w-40 bg-white">
        <select value={type} onChange={(e) => setType(e.target.value)} className='outline-0'>
            <option value="">All Livestock</option>
            <option value="Goat">Goats</option>
            <option value="Cow">Cows</option>
            <option value="Sheep">Sheeps</option>
            <option value="Chicken">Chickens</option>
            <option value="Pig">Pigs</option>
        </select>
    </div>
  )
}

export default LivestockTypeFilter