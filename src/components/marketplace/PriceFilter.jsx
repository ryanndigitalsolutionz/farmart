import React from 'react'

function PriceFilter({minPrice, setMinPrice, maxPrice, setMaxPrice}) {
  return (
    <div className='flex flex-col gap-1'>
        <input 
            type="number" 
            placeholder="Min Price" 
            min="0" 
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className='border px-2 w-40 bg-white'
        />
        <input 
            type="number" 
            placeholder="Max Price" 
            min="0" 
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className='border px-2 w-40 bg-white'
        />
    </div>
  )
}

export default PriceFilter;