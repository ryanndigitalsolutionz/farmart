function LivestockTypeFilter({ type, setType }) {
  return (
    <div>
        <select value={type} onChange={(e) => setType(e.target.value)}>
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