import { Routes, Route } from 'react-router-dom'

import Marketplace from '../pages/buyer/Marketplace'
import BuyerProfile from '../pages/buyer/Profile'
import Cart from '../pages/buyer/Cart'
import Checkout from '../pages/buyer/Checkout'
import BuyerPayments from '../pages/buyer/Payments'
import BuyerOrders from '../pages/buyer/Orders'
import OrderDetails from '../pages/buyer/OrderDetails'
import OrderConfirmation from '../pages/buyer/OrderConfirmation'
import Wishlist from '../pages/buyer/Wishlist'
import BuyerReviews from '../pages/buyer/Reviews'

function BuyerRoute() {
  return (
    <Routes>      
        <Route index element={<Marketplace />} />
        <Route path="marketplace" element={<Marketplace />} />
        <Route path="profile" element={<BuyerProfile />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="payments" element={<BuyerPayments />} />
        <Route path="orders" element={<BuyerOrders />} />      

        <Route path="orders/:orderId" element={<OrderDetails />} />
        <Route path="order-confirmation" element={<OrderConfirmation />}
        />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="reviews" element={<BuyerReviews />} />
       
    </Routes> 
)}

export default BuyerRoute;
