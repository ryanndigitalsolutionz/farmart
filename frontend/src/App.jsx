import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { CartProvider } from './context/CartContext'
import { LivestockProvider } from './context/LivestockContext'
import { WishlistProvider } from './context/WishlistContext'

import SplashScreen from './components/SplashScreen'
import Header from './components/layout/Header'
import FarmerDashboardLayout from './components/layout/FarmerDashboardLayout'
import DashboardLayout from './components/layout/DashboardLayout'

import LandingPage from './pages/LandingPage'
import FAQs from './pages/FAQs'
import Welcome from './pages/auth/Welcome'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import FarmSetup from './pages/auth/FarmSetup'
import ForgotPassword from './pages/auth/ForgotPassword'
import VerifyEmail from './pages/auth/VerifyEmail'
import ResetPassword from './pages/auth/ResetPassword'

import FarmerDashboard from './pages/farmer/Dashboard'
import FarmerProfile from './pages/farmer/Profile'
import FarmProfile from './pages/farmer/FarmProfile'
import CreateListings from './pages/farmer/CreateListings'
import FarmerOrders from './pages/farmer/Orders'
import FarmerAnalytics from './pages/farmer/Analytics'

import BuyerRoute from './pages/routes/BuyerRoute'

import AdminDashboard from './pages/admin/Dashboard'
import Users from './pages/admin/Users'
import Farmers from './pages/admin/Farmers'
import FarmerDetails from './pages/admin/FarmerDetails'
import BuyerDetails from './pages/admin/BuyerDetails'
import Listings from './pages/admin/Listings'
import AdminOrders from './pages/admin/Orders'
import Transactions from './pages/admin/Transactions'
import Reports from './pages/admin/Reports'
import Disputes from './pages/admin/Disputes'
import Announcements from './pages/admin/Announcements'
import Settings from './pages/admin/Settings'

import './App.css'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Header />

      <AnimatePresence>
        {showSplash && <SplashScreen key="splash" />}
      </AnimatePresence>

      <LivestockProvider>
        <WishlistProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/faqs" element={<FAQs />} />

              <Route path="/welcome" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/farm-setup" element={<FarmSetup />} />

              <Route path="/farmer" element={<FarmerDashboardLayout />}>
                <Route index element={<FarmerDashboard />} />
                <Route path="dashboard" element={<FarmerDashboard />} />
                <Route path="create-listing" element={<CreateListings />} />
                <Route path="listings" element={<CreateListings />} />
                <Route path="orders" element={<FarmerOrders />} />
                <Route path="analytics" element={<FarmerAnalytics />} />
                <Route path="farm-profile" element={<FarmProfile />} />
                <Route path="profile" element={<FarmerProfile />} />
              </Route>

              <Route path="/buyer/*" element={<BuyerRoute />} />

              <Route path="/admin" element={<DashboardLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="farmers" element={<Farmers />} />
                <Route
                  path="farmers/:farmerId"
                  element={<FarmerDetails />}
                />
                <Route
                  path="buyers/:buyerId"
                  element={<BuyerDetails />}
                />
                <Route path="listings" element={<Listings />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="reports" element={<Reports />} />
                <Route path="disputes" element={<Disputes />} />
                <Route
                  path="announcements"
                  element={<Announcements />}
                />
                <Route path="settings" element={<Settings />} />
              </Route>

              <Route
                path="*"
                element={<Navigate to="/" replace />}
              />
            </Routes>
          </CartProvider>
        </WishlistProvider>
      </LivestockProvider>
    </>
  )
}

export default App
