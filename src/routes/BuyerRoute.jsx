import { Routes, Route } from "react-router-dom";
import Livestock from "../pages/marketplace/Livestock";
import LivestockDetails from "../pages/marketplace/LivestockDetails";

function BuyerRoute() {
  return (
    <Routes>
        <Route path="" element={<h1>FarmerFlow</h1>}/>
        <Route path="/marketplace" element={<Livestock />} />
        <Route path="/marketplace/:id" element={<LivestockDetails />} />
    </Routes>
  )
}

export default BuyerRoute;