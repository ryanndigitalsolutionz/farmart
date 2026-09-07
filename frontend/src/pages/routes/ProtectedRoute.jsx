import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import API_BASE_URL from '../../api/api'

function ProtectedRoute({
  allowedRoles = [],
  requireVerified = false,
}) {
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    let active = true

    const restoreSession = async () => {
      const storedUser = localStorage.getItem('farmartUser')

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)

          if (
            parsedUser &&
            parsedUser.isLoggedIn === true &&
            parsedUser.role
          ) {
            if (active) {
              setUser(parsedUser)
              setChecking(false)
            }

            return
          }
        } catch {
          localStorage.removeItem('farmartUser')
        }
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/auth/me`,
          {
            method: 'GET',
            credentials: 'include',
          },
        )

        const data = await response.json()

        if (
          !response.ok ||
          !data.success ||
          !data.user
        ) {
          localStorage.removeItem('farmartUser')

          if (active) {
            setUser(null)
            setChecking(false)
          }

          return
        }

        const restoredUser = {
          id: data.user.id,
          first_name: data.user.first_name,
          last_name: data.user.last_name,
          email: data.user.email,
          role: data.user.role,
          is_verified: data.user.is_verified,
          isLoggedIn: true,
        }

        localStorage.setItem(
          'farmartUser',
          JSON.stringify(restoredUser),
        )

        if (active) {
          setUser(restoredUser)
          setChecking(false)
        }
      } catch {
        localStorage.removeItem('farmartUser')

        if (active) {
          setUser(null)
          setChecking(false)
        }
      }
    }

    restoreSession()

    return () => {
      active = false
    }
  }, [])

  if (checking) {
    return null
  }

  if (!user) {
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
