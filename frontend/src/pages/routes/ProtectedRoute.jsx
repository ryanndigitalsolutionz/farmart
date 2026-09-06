import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute({
  allowedRoles = [],
  requireVerified = false,
}) {
  const storedUser = localStorage.getItem('farmartUser')

  if (!storedUser) {
    return <Navigate to="/" replace />
  }

  let user

  try {
    user = JSON.parse(storedUser)
  } catch {
    localStorage.removeItem('farmartUser')
    return <Navigate to="/" replace />
  }

  if (!user || user.isLoggedIn !== true || !user.role) {
    localStorage.removeItem('farmartUser')
    return <Navigate to="/" replace />
  }

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/" replace />
  }

  if (
    requireVerified &&
    user.is_verified !== true
  ) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
