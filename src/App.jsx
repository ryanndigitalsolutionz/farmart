import AppRoutes from "./routes/AppRoutes"
import { LivestockProvider } from "./context/LivestockContext"
import { CartProvider } from "./context/CartContext"

function App() {

  return (
    <LivestockProvider>
      <CartProvider>
        <AppRoutes/>
      </CartProvider>      
    </LivestockProvider>
    
  )
}

export default App
