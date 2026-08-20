
import { LivestockProvider } from "./context/LivestockContext";
import Livestock from "./pages/marketplace/Livestock";

function App() {

  return (
    
    <LivestockProvider>   
      <Livestock/>
    </LivestockProvider>
  )
}

export default App
