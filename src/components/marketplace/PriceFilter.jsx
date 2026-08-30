function PriceFilter({minPrice, setMinPrice, maxPrice, setMaxPrice}) {
  return (
    <div className="flex w-full gap-2">
        <input 
            type="number" 
            placeholder="Min Price" 
            min="0" 
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="min-w-0 w-full rounded-lg border border-gray-300 px-3 
            py-2 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
        />
        <input 
            type="number" 
            placeholder="Max Price" 
            min="0" 
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="min-w-0 w-full rounded-lg border border-gray-300 px-3 py-2 
            text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
        />
    </div>
  )
}

export default PriceFilter;
