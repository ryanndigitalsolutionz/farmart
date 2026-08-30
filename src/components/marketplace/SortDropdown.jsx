function SortDropdown({ sort, setSort }) {
  return (
    <div className="w-full">
        <select 
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm 
          outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100" 
          value={sort} 
          onChange={(e) => setSort(e.target.value)}
        >
            <option value="">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to low</option>
            <option value="age-young">Age: Young to Old</option>
            <option value="age-old">Age: Old to young</option>
        </select>
    </div>
  )
}

export default SortDropdown
