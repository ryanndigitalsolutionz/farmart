import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const BuyerRoute = ({ children }) => {
  const { isAuthenticated, isBuyer } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!isBuyer) {
    return <Navigate to="/" replace />
  }

  return children
}

export const FarmerRoute = ({ children }) => {
  const { isAuthenticated, isFarmer } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!isFarmer) {
    return <Navigate to="/" replace />
  }

  return children
}

export const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}
