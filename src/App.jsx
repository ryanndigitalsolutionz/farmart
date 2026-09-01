import AppRoutes from "./routes/AppRoutes"
import { LivestockProvider } from "./context/LivestockContext"
import { CartProvider } from "./context/CartContext"
import { WishlistProvider } from "./context/WishlistContext"
import { ReviewProvider } from "./context/ReviewContext"

function App() {

  return (
    <LivestockProvider>
      <WishlistProvider>
        <CartProvider>
          <ReviewProvider>
            <AppRoutes/>
          </ReviewProvider>
        </CartProvider> 
      </WishlistProvider>     
    </LivestockProvider>    
  )
}

export default App
