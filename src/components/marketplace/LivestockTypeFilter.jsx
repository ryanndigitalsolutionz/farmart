import React from 'react'

function LivestockTypeFilter({ type, setType }) {
  return (
    <div>
        <select value={type} onChange={(e) => setType(e.target.value)}>
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