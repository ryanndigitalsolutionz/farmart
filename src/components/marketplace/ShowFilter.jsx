import React from 'react'

function ShowFilter({ showFilters, setShowFilters}) {
  return (
    <div className="flex justify-end mt-2 mb-4">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className=" rounded-xl bg-green-600 p-2 text-green-100"
          >
            {showFilters ? "Hide Filter" : "Show Filter"}
          </button>
        </div>
  )
}

export default ShowFilter