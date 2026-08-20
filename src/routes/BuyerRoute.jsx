import { Routes, Route } from "react-router-dom";
import Livestock from "../pages/marketplace/Livestock";
import LivestockDetails from "../pages/marketplace/LivestockDetails";
import Cart from "../pages/buyer/Cart";
import Checkout from "../pages/buyer/Checkout";

function BuyerRoute() {
  return (
    <Routes>
        <Route path="/" element={<h1>FarmerFlow</h1>}/>
        <Route path="/marketplace" element={<Livestock />} />
        <Route path="/marketplace/:id" element={<LivestockDetails />} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
    </Routes>
  )
}

export default BuyerRoute;