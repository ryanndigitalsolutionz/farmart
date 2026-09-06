function PriceFilter({minPrice, setMinPrice, maxPrice, setMaxPrice}) {
  return (
    <div className="flex gap-2 rounded-2xl p-2 border-(--farm-green-border) w-40 ">
        <input 
            type="number" 
            placeholder="Min Price" 
            min="0" 
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="flex items-center gap-2 border-2 rounded-2xl p-2 border-(--farm-green-border) w-40 "
        />
        <input 
            type="number" 
            placeholder="Max Price" 
            min="0" 
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="flex items-center gap-2 border-2 rounded-2xl p-2 border-(--farm-green-border) w-40 "
        />
    </div>
  )
}

export default PriceFilter;// commit 50
