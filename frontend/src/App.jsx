import { useState, useEffect, Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { CartProvider } from './context/CartContext'
import { LivestockProvider } from './context/LivestockContext'
import { WishlistProvider } from './context/WishlistContext'

import SplashScreen from './components/SplashScreen'
import Header from './components/layout/Header'
import FarmerDashboardLayout from './components/layout/FarmerDashboardLayout'
import DashboardLayout from './components/layout/DashboardLayout'

import './App.css'

const LandingPage = lazy(() => import('./pages/LandingPage'))
const FAQs = lazy(() => import('./pages/FAQs'))
const Welcome = lazy(() => import('./pages/auth/Welcome'))
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const FarmSetup = lazy(() => import('./pages/auth/FarmSetup'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'))
const VerifyEmail = lazy(() => import('./pages/auth/VerifyEmail'))
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'))

const FarmerDashboard = lazy(() => import('./pages/farmer/Dashboard'))
const FarmerProfile = lazy(() => import('./pages/farmer/Profile'))
const FarmProfile = lazy(() => import('./pages/farmer/FarmProfile'))
const CreateListings = lazy(() => import('./pages/farmer/CreateListings'))
const FarmerOrders = lazy(() => import('./pages/farmer/Orders'))
const FarmerAnalytics = lazy(() => import('./pages/farmer/Analytics'))

const BuyerRoute = lazy(() => import('./pages/routes/BuyerRoute'))

const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))
const Users = lazy(() => import('./pages/admin/Users'))
const Farmers = lazy(() => import('./pages/admin/Farmers'))
const FarmerDetails = lazy(() => import('./pages/admin/FarmerDetails'))
const BuyerDetails = lazy(() => import('./pages/admin/BuyerDetails'))
const Listings = lazy(() => import('./pages/admin/Listings'))
const AdminOrders = lazy(() => import('./pages/admin/Orders'))
const Transactions = lazy(() => import('./pages/admin/Transactions'))
const Reports = lazy(() => import('./pages/admin/Reports'))
const Disputes = lazy(() => import('./pages/admin/Disputes'))
const Announcements = lazy(() => import('./pages/admin/Announcements'))
const Settings = lazy(() => import('./pages/admin/Settings'))

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
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
              <div className="w-8 h-8 border-4 border-farmart-primary border-t-transparent rounded-full animate-spin" />
            </div>}>
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
            </Suspense>
          </CartProvider>
        </WishlistProvider>
      </LivestockProvider>
    </>
  )
}

export default App
