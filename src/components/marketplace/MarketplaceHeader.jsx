import { Link } from "react-router-dom"
import { TiShoppingCart } from "react-icons/ti";

function MarketplaceHeader({ 
  showFilters, 
  setShowFilters,
  cartCount
 }) {
  return (
    <div>
      <div className="text-center mt-1 mb-2 text-gray-500">
        <h2>Find Livestock</h2>

        <p>
          Browser healthy livestock from trusted farmers.
        </p>

      </div>
        
        <div className="flex justify-around mt-2 mb-4">
            {/*  */}
          <Link 
            to="/marketplace"
            className="bg-green-600 rounded-2xl p-2 text-white"
          >
            Marketplace
          </Link>

          {/* My orders navigation */}
          <Link 
            to="/orders" 
            className="bg-green-600 rounded-2xl p-2 text-white"
          >My Orders</Link>

          {/* cart link directory */}
          <div className="flex gap-1 bg-green-600 rounded-2xl p-2 text-white">
            <TiShoppingCart size={24}/> 
            {/* naviagtion to cart */}
            <Link to="/cart"
            
            >            
              Cart: {cartCount}
            </Link>

        </div>
          
        </div>      
        
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex justify-end p-2 rounded-2xl "
        >
          {showFilters ? "Hide Filter" : "Show Filter"}
        </button>

    </div>
  )
}

export default MarketplaceHeader