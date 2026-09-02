import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import ProtectedRoute from './components/auth/ProtectedRoute'
import { getPostLoginRedirect } from './utils/authRedirect'

import SplashScreen from './components/SplashScreen'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import FarmerDashboardLayout from './components/layout/FarmerDashboardLayout'

import LandingPage from './pages/LandingPage'

import Welcome from './pages/auth/Welcome'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import FarmSetup from './pages/auth/FarmSetup'
import ForgotPassword from './pages/auth/ForgotPassword'
import VerifyEmail from './pages/auth/VerifyEmail'
import ResetPassword from './pages/auth/ResetPassword'

import HelpCenter from './pages/public/HelpCenter'
import Contact from './pages/public/Contact'
import FAQs from './pages/public/FAQs'
import ReportProblem from './pages/public/ReportProblem'
import Privacy from './pages/public/Privacy'
import Terms from './pages/public/Terms'

import FarmerDashboard from './pages/farmer/Dashboard'
import FarmerProfile from './pages/farmer/Profile'
import FarmProfile from './pages/farmer/FarmProfile'
import CreateListings from './pages/farmer/CreateListings'
import FarmerOrders from './pages/farmer/Orders'
import FarmerAnalytics from './pages/farmer/Analytics'

import Marketplace from './pages/buyer/Marketplace'
import BuyerProfile from './pages/buyer/Profile'
import Cart from './pages/buyer/Cart'
import Checkout from './pages/buyer/Checkout'
import BuyerPayments from './pages/buyer/Payments'
import BuyerOrders from './pages/buyer/Orders'
import OrderDetails from './pages/buyer/OrderDetails'
import OrderConfirmation from './pages/buyer/OrderConfirmation'
import Wishlist from './pages/buyer/Wishlist'
import BuyerReviews from './pages/buyer/Reviews'

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

import { useAuth } from './context/AuthContext'
import './App.css'

const PUBLIC_ROUTES = [
  '/',
  '/welcome',
  '/login',
  '/register',
  '/forgot-password',
  '/verify-email',
  '/reset-password',
  '/farm-setup',
  '/help',
  '/contact',
  '/faqs',
  '/report',
  '/privacy',
  '/terms',
]

function shouldShowFooter(pathname) {
  if (pathname.startsWith('/farmer')) return false
  if (pathname.startsWith('/buyer')) return false
  if (pathname.startsWith('/admin')) return false
  return true
}

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const location = useLocation()
  const showFooter = shouldShowFooter(location.pathname)
  const { loading, isAuthenticated, user } = useAuth()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          color: 'var(--farm-text)',
        }}
      >
        <div className="spinner" />
      </div>
    )
  }

  return (
    <>
      <Navbar />

      <AnimatePresence>
        {showSplash && <SplashScreen key="splash" />}
      </AnimatePresence>

      <main className="farmart-main">
        <Routes location={location} key={location.pathname}>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={
            isAuthenticated ? (
              <Navigate to={getPostLoginRedirect(user)} replace />
            ) : (
              <Login />
            )
          } />
          <Route path="/register" element={
            isAuthenticated ? (
              <Navigate to={getPostLoginRedirect(user)} replace />
            ) : (
              <Register />
            )
          } />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/farm-setup" element={
            <ProtectedRoute allowedRoles={['farmer']}>
              <FarmSetup />
            </ProtectedRoute>
          } />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/report" element={<ReportProblem />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          {/* Farmer */}
          <Route path="/farmer" element={
            <ProtectedRoute allowedRoles={['farmer']}>
              <FarmerDashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<FarmerDashboard />} />
            <Route path="dashboard" element={<FarmerDashboard />} />
            <Route path="create-listing" element={<CreateListings />} />
            <Route path="listings" element={<CreateListings />} />
            <Route path="orders" element={<FarmerOrders />} />
            <Route path="analytics" element={<FarmerAnalytics />} />
            <Route path="farm-profile" element={<FarmProfile />} />
            <Route path="profile" element={<FarmerProfile />} />
          </Route>

          {/* Buyer */}
          <Route path="/buyer" element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <FarmerDashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Marketplace />} />
            <Route path="marketplace" element={<Marketplace />} />
            <Route path="profile" element={<BuyerProfile />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="payments" element={<BuyerPayments />} />
            <Route path="orders" element={<BuyerOrders />} />
            <Route path="orders/:orderId" element={<OrderDetails />} />
            <Route
              path="order-confirmation"
              element={<OrderConfirmation />}
            />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="reviews" element={<BuyerReviews />} />
          </Route>

          {/* Admin */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <FarmerDashboardLayout />
            </ProtectedRoute>
          }>
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
      </main>

      {showFooter && <Footer />}
    </>
  )
}

export default App