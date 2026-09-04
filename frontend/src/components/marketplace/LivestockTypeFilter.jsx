function LivestockTypeFilter({ type, setType }) {
  return (
    <div className="flex items-center gap-2  ">
        <select 
          value={type} 
          onChange={(e) => setType(e.target.value)}
          className="border-2 rounded-2xl p-2 border-(--farm-green-border) w-40"
        >
            <option value="">All Livestock</option>
            <option value="Goat">Goats</option>
            <option value="Cow">Cows</option>
            <option value="Sheep">Sheep</option>
            <option value="Poultry">Poultry</option>
            <option value="Pig">Pigs</option>
        </select>
    </div>
  )
}

export default LivestockTypeFilter// commit 49
