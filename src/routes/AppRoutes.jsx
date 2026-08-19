import { Routes, Route, Navigate } from 'react-router-dom'

import Welcome from '../pages/auth/Welcome'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import ForgotPassword from '../pages/auth/ForgotPassword'
import ResetPassword from '../pages/auth/ResetPassword'
import VerifyEmail from '../pages/auth/VerifyEmail'
import FarmSetup from '../pages/auth/FarmSetup'

import Marketplace from '../pages/marketplace/Livestock'
import LivestockDetails from '../pages/marketplace/LivestockDetails'

import BuyerDashboard from '../pages/buyer/Dashboard'
import BuyerCart from '../pages/buyer/Cart'
import BuyerCheckout from '../pages/buyer/Checkout'
import BuyerWishlist from '../pages/buyer/Wishlist'
import BuyerOrders from '../pages/buyer/Orders'
import BuyerOrderDetails from '../pages/buyer/OrderDetails'
import BuyerProfile from '../pages/buyer/Profile'
import BuyerReviews from '../pages/buyer/Reviews'

import FarmerDashboard from '../pages/farmer/Dashboard'
import FarmerListings from '../pages/farmer/Listings'
import FarmerCreateListing from '../pages/farmer/CreateListing'
import FarmerEditListing from '../pages/farmer/EditListing'
import FarmerOrders from '../pages/farmer/Orders'
import FarmerProfile from '../pages/farmer/Profile'
import FarmerAnalytics from '../pages/farmer/Analytics'
import FarmerSalesHistory from '../pages/farmer/SalesHistory'
import FarmerEarnings from '../pages/farmer/Earnings'

import AdminDashboard from '../pages/admin/Dashboard'
import AdminUsers from '../pages/admin/Users'
import AdminFarmers from '../pages/admin/Farmers'
import AdminBuyers from '../pages/admin/Buyers'
import AdminListings from '../pages/admin/Listings'
import AdminDisputes from '../pages/admin/Disputes'
import AdminTransactions from '../pages/admin/Transactions'
import AdminReports from '../pages/admin/Reports'

import { ProtectedRoute } from './ProtectedRoute'
import { BuyerRoute } from './BuyerRoute'
import { FarmerRoute } from './FarmerRoute'
import { AdminRoute } from './AdminRoute'
import { useAuth } from '../context/AuthContext'

const RoleRedirect = () => {
  const { isBuyer, isFarmer, isAdmin } = useAuth()
  if (isAdmin) return <Navigate to="/admin" replace />
  if (isFarmer) return <Navigate to="/farmer" replace />
  if (isBuyer) return <Navigate to="/buyer" replace />
  return <Navigate to="/marketplace" replace />
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RoleRedirect />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/farm-setup" element={<FarmSetup />} />

      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/livestock/:id" element={<LivestockDetails />} />

      <Route
        path="/buyer"
        element={
          <ProtectedRoute allowedRoles={['buyer']}>
            <BuyerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/buyer/cart"
        element={
          <BuyerRoute>
            <BuyerCart />
          </BuyerRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <BuyerRoute>
            <BuyerCheckout />
          </BuyerRoute>
        }
      />
      <Route
        path="/buyer/wishlist"
        element={
          <BuyerRoute>
            <BuyerWishlist />
          </BuyerRoute>
        }
      />
      <Route
        path="/buyer/orders"
        element={
          <BuyerRoute>
            <BuyerOrders />
          </BuyerRoute>
        }
      />
      <Route
        path="/buyer/orders/:id"
        element={
          <BuyerRoute>
            <BuyerOrderDetails />
          </BuyerRoute>
        }
      />
      <Route
        path="/buyer/profile"
        element={
          <BuyerRoute>
            <BuyerProfile />
          </BuyerRoute>
        }
      />
      <Route
        path="/buyer/reviews"
        element={
          <BuyerRoute>
            <BuyerReviews />
          </BuyerRoute>
        }
      />

      <Route
        path="/farmer"
        element={
          <FarmerRoute>
            <FarmerDashboard />
          </FarmerRoute>
        }
      />
      <Route
        path="/farmer/listings"
        element={
          <FarmerRoute>
            <FarmerListings />
          </FarmerRoute>
        }
      />
      <Route
        path="/farmer/listings/create"
        element={
          <FarmerRoute>
            <FarmerCreateListing />
          </FarmerRoute>
        }
      />
      <Route
        path="/farmer/listings/:id/edit"
        element={
          <FarmerRoute>
            <FarmerEditListing />
          </FarmerRoute>
        }
      />
      <Route
        path="/farmer/orders"
        element={
          <FarmerRoute>
            <FarmerOrders />
          </FarmerRoute>
        }
      />
      <Route
        path="/farmer/profile"
        element={
          <FarmerRoute>
            <FarmerProfile />
          </FarmerRoute>
        }
      />
      <Route
        path="/farmer/analytics"
        element={
          <FarmerRoute>
            <FarmerAnalytics />
          </FarmerRoute>
        }
      />
      <Route
        path="/farmer/sales-history"
        element={
          <FarmerRoute>
            <FarmerSalesHistory />
          </FarmerRoute>
        }
      />
      <Route
        path="/farmer/earnings"
        element={
          <FarmerRoute>
            <FarmerEarnings />
          </FarmerRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <AdminUsers />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/farmers"
        element={
          <AdminRoute>
            <AdminFarmers />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/buyers"
        element={
          <AdminRoute>
            <AdminBuyers />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/listings"
        element={
          <AdminRoute>
            <AdminListings />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/disputes"
        element={
          <AdminRoute>
            <AdminDisputes />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/transactions"
        element={
          <AdminRoute>
            <AdminTransactions />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <AdminRoute>
            <AdminReports />
          </AdminRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
