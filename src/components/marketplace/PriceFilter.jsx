function PriceFilter({minPrice, setMinPrice, maxPrice, setMaxPrice}) {
  return (
    <div>
        <input 
            type="number" 
            placeholder="Min Price" 
            min="0" 
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
        />
        <input 
            type="number" 
            placeholder="Max Price" 
            min="0" 
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
        />
    </div>
  )
}

export default PriceFilter;