/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from 'react'
import { users, getUserByEmail, addUser, updateUser } from '../data/buyerMockData'
import { generateId } from '../data/livestockMockData'
import { ROLES } from '../constants/userRoles'
import { useLocalStorage } from '../hooks/useLocalStorage'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useLocalStorage('farmart_currentUser', null)
  const [usersList, setUsersList] = useState([...users])

  const login = useCallback(async (email, password) => {
    await new Promise((r) => setTimeout(r, 500))
    const user = getUserByEmail(email)
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password')
    }
    setCurrentUser(user)
    return user
  }, [setCurrentUser])

  const register = useCallback(async (userData) => {
    await new Promise((r) => setTimeout(r, 500))
    const existing = getUserByEmail(userData.email)
    if (existing) {
      throw new Error('Email already registered')
    }
    const newUser = {
      ...userData,
      id: generateId(),
      memberSince: new Date().toISOString(),
      verified: false,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
    }
    if (userData.role === ROLES.FARMER) {
      newUser.farmName = userData.farmName || ''
      newUser.farmDescription = userData.farmDescription || ''
      newUser.location = userData.location || ''
    }
    addUser(newUser)
    setUsersList([...users])
    setCurrentUser(newUser)
    return newUser
  }, [setCurrentUser])

  const logout = useCallback(() => {
    setCurrentUser(null)
  }, [setCurrentUser])

  const updateProfile = useCallback((updates) => {
    if (!currentUser) return null
    const updated = updateUser(currentUser.id, updates)
    if (updated) {
      setCurrentUser(updated)
      setUsersList([...users])
    }
    return updated
  }, [currentUser, setCurrentUser])

  const isAuthenticated = !!currentUser
  const isBuyer = currentUser?.role === ROLES.BUYER
  const isFarmer = currentUser?.role === ROLES.FARMER
  const isAdmin = currentUser?.role === ROLES.ADMIN

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        usersList,
        isAuthenticated,
        isBuyer,
        isFarmer,
        isAdmin,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
