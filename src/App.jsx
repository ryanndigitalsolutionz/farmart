import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import Welcome from './pages/auth/Welcome'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import FarmSetup from './pages/auth/FarmSetup'
import ForgotPassword from './pages/auth/ForgotPassword'
import VerifyEmail from './pages/auth/VerifyEmail'
import ResetPassword from './pages/auth/ResetPassword'

function FarmerDashboard() {
  return <h1>Farmer Dashboard</h1>
}

function BuyerDashboard() {
  return <h1>Buyer Dashboard</h1>
}

function AdminDashboard() {
  return <h1>Admin Dashboard</h1>
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
        <Route path="/admin/*" element={<AdminDashboard />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
