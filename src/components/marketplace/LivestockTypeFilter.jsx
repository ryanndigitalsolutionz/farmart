function LivestockTypeFilter({ type, setType }) {
  return (
    <div className="w-full">
        <select className="w-full rounded-lg border border-gray-300
          bg-white px-3 py-2 text-sm outline-none focus:border-green-700 
          focus:ring-2 focus:ring-green-100" 
          value={type} 
          onChange={(e) => setType(e.target.value)}
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

export default LivestockTypeFilter
