import { Link } from "react-router-dom"
import { TiShoppingCart } from "react-icons/ti";

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

        {/* cart link directory */}
        <div>
          <TiShoppingCart /> 
          <Link to="/cart">
            
            Cart: {cartCount}
          </Link>
        </div>
        

        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="bg-lime-200 p-2 rounded-2xl"
        >
          {showFilters ? "Hide Filter" : "Show Filter"}
        </button>

    </div>
  )
}

export default MarketplaceHeader