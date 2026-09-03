function SortDropdown({ sort, setSort }) {
  return (
    <div 
      className="flex items-center"
    >
        <select 
          value={sort} 
          onChange={(e) => setSort(e.target.value)}
          className="border-2 border-(--farm-green-border) rounded-xl p-2 "
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

export default SortDropdown// commit 52
