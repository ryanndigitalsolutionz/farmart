import React from 'react'

function ShowFilter({ showFilters, setShowFilters}) {
  return (
    <div className="flex justify-end mt-2 mb-4">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className=" rounded-xl bg-yellow-200 p-2 text-yellow-600"
          >
            {showFilters ? "Hide Filter" : "Show Filter"}
          </button>
        </div>
  )
}

export default ShowFilter