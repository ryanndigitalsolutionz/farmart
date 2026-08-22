import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import Welcome from './pages/auth/Welcome'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import FarmSetup from './pages/auth/FarmSetup'
import ForgotPassword from './pages/auth/ForgotPassword'
import VerifyEmail from './pages/auth/VerifyEmail'
import ResetPassword from './pages/auth/ResetPassword'

import AdminRoute from './routes/AdminRoute'
import DashboardLayout from './components/layout/DashboardLayout'
import Dashboard from './pages/admin/Dashboard'
import Listings from './pages/admin/Listings'
import Disputes from './pages/admin/Disputes'
import FarmerDetails from './pages/admin/FarmerDetails'
import BuyerDetails from './pages/admin/BuyerDetails'
import Users from './pages/admin/Users'
import Farmers from './pages/admin/Farmers'
import Orders from './pages/admin/Orders'
import Transactions from './pages/admin/Transactions'
import Reports from './pages/admin/Reports'
import Settings from './pages/admin/Settings'
import Announcements from './pages/admin/Announcements'

function FarmerDashboard() {
  return <h1>Farmer Dashboard</h1>
}

function BuyerDashboard() {
  return <h1>Buyer Dashboard</h1>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/farm-setup" element={<FarmSetup />} />

        <Route path="/farmer/*" element={<FarmerDashboard />} />
        <Route path="/buyer/*" element={<BuyerDashboard />} />

        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="farmers" element={<Farmers />} />
            <Route path="farmers/:farmerId" element={<FarmerDetails />} />
            <Route path="listings" element={<Listings />} />
            <Route path="orders" element={<Orders />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="disputes" element={<Disputes />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="buyers/:buyerId" element={<BuyerDetails />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App