import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

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
