function MarketplaceHeader({ 
  showFilters, 
  setShowFilters,
  cartCount
 }) {
  return (
    <div>
        <h2>Find Livestock</h2>

        <p>
          Browser healthy livestock from trusted farmers.
        </p>

        <p>Cart: {cartCount}</p>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className=""
        >
          {showFilters ? "Hide Filter" : "Show Filter"}
        </button>

    </div>
  )
}

export default MarketplaceHeader