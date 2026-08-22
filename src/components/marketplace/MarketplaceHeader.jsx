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
        <div className="flex justify-around">
            {/*  */}
          <Link to="/marketplace">Marketplace</Link>

          {/* My orders navigation */}
          <Link to="/orders">My Orders</Link>

          {/* cart link directory */}
          <div className="flex gap-1">
            <TiShoppingCart size={24}/> 
            {/* naviagtion to cart */}
            <Link to="/cart">            
              Cart: {cartCount}
            </Link>

        </div>
          
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