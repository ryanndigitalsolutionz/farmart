import { Routes, Route } from 'react-router-dom'

import Marketplace from '../buyer/Marketplace'
import BuyerProfile from '../buyer/Profile'
import Cart from '../buyer/Cart'
import Checkout from '../buyer/Checkout'
import LivestockDetails from '../marketplace/LivestockDetails'
import Payments from '../buyer/Payments'
import BuyerOrders from '../buyer/Orders'
import OrderDetails from '../buyer/OrderDetails'
import OrderConfirmation from '../buyer/OrderConfirmation'
import Wishlist from '../buyer/Wishlist'
import BuyerReviews from '../buyer/Reviews'

function BuyerRoute() {
  return (
    <Routes>      
        <Route index element={<Marketplace />} />
        <Route path="marketplace" element={<Marketplace />} />
        <Route path="profile" element={<BuyerProfile />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="livestock/:id" element={<LivestockDetails />} />
        <Route path="payments/:id" element={<Payments />} />
        <Route path="orders" element={<BuyerOrders />} />      

        <Route path="orders/:orderId" element={<OrderDetails />} />
        <Route path="order-confirmation" element={<OrderConfirmation />}/>
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="reviews" element={<BuyerReviews />} />
       
    </Routes> 
)}

export default BuyerRoute;