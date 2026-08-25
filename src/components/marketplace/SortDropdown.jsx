function SortDropdown({ sort, setSort }) {
  return (
    <div>
        <select 
          value={sort} 
          onChange={(e) => setSort(e.target.value)}
          className="outline-0 border rounded-2xl px-2 py-1"
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