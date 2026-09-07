import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import API_BASE_URL from '../api/api'
import { storage } from '../hooks/useLocalStorage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = storage.get('currentUser', null)

    if (storedUser) {
      return storedUser
    }

    const farmartUser = localStorage.getItem('farmartUser')

    if (!farmartUser) {
      return null
    }

    try {
      const parsedUser = JSON.parse(farmartUser)

      if (parsedUser?.isLoggedIn === true) {
        return parsedUser
      }
    } catch {
      localStorage.removeItem('farmartUser')
    }

    return null
  })

  const [loading, setLoading] = useState(true)
  const [farmProfile, setFarmProfile] = useState(() =>
    storage.get('farmProfile', null),
  )
  const [isVerified, setIsVerified] = useState(() =>
    storage.get('emailVerified', false),
  )

  useEffect(() => {
    storage.set('currentUser', user)

    if (user) {
      localStorage.setItem(
        'farmartUser',
        JSON.stringify({
          ...user,
          isLoggedIn: true,
        }),
      )
    } else {
      localStorage.removeItem('farmartUser')
    }
  }, [user])

  useEffect(() => {
    storage.set('farmProfile', farmProfile)
  }, [farmProfile])

  useEffect(() => {
    storage.set('emailVerified', isVerified)
  }, [isVerified])

  const fetchCurrentUser = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/me`,
        {
          credentials: 'include',
        },
      )

      if (!response.ok) {
        setUser(null)
        return null
      }

      const data = await response.json()

      if (!data.success || !data.user) {
        setUser(null)
        return null
      }

      const authenticatedUser = {
        ...data.user,
        isLoggedIn: true,
      }

      setUser(authenticatedUser)
      setIsVerified(data.user.is_verified === true)

      return authenticatedUser
    } catch {
      setUser(null)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCurrentUser()
  }, [fetchCurrentUser])

  const login = useCallback(async (email, password) => {
    setLoading(true)

    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            email,
            password,
          }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
          data.message ||
          'Login failed.',
        )
      }

      const authenticatedUser = {
        ...data.user,
        isLoggedIn: true,
      }

      setUser(authenticatedUser)
      setIsVerified(data.user.is_verified === true)

      return authenticatedUser
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(async (registrationData) => {
    setLoading(true)

    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(registrationData),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
          data.message ||
          'Registration failed.',
        )
      }

      const registeredUser = {
        ...data.user,
        isLoggedIn: true,
      }

      setUser(registeredUser)
      setIsVerified(data.user.is_verified === true)

      return registeredUser
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setFarmProfile(null)
    setIsVerified(false)
    localStorage.removeItem('farmartUser')
  }, [])

  const updateFarmProfile = useCallback((profile) => {
    setFarmProfile(profile)
  }, [])

  const verifyEmail = useCallback(() => {
    setIsVerified(true)

    setUser((currentUser) => {
      if (!currentUser) {
        return currentUser
      }

      return {
        ...currentUser,
        is_verified: true,
        isLoggedIn: true,
      }
    })
  }, [])

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    role: user?.role || null,
    farmProfile,
    isVerified,
    login,
    register,
    logout,
    updateFarmProfile,
    verifyEmail,
    refreshUser: fetchCurrentUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      'useAuth must be used within AuthProvider',
    )
  }

  return context
}
