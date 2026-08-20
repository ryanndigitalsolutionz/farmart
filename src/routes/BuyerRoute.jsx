import { Routes, Route } from "react-router-dom";
import Livestock from "../pages/marketplace/Livestock";
import LivestockDetails from "../pages/marketplace/LivestockDetails";
import Cart from "../pages/buyer/Cart";

function BuyerRoute() {
  return (
    <Routes>
        <Route path="/" element={<h1>FarmerFlow</h1>}/>
        <Route path="/marketplace" element={<Livestock />} />
        <Route path="/marketplace/:id" element={<LivestockDetails />} />
        <Route path="/cart" element={<Cart/>}/>
    </Routes>
  )
}

export default BuyerRoute;