/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useCallback, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { generateId } from '../data/livestockMockData'
import { PLATFORM_FEE_RATE } from '../constants/userRoles'

const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage('farmart_cart', [])

  const addToCart = useCallback((item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.livestockId === item.livestockId)
      if (existing) {
        return prev.map((i) =>
          i.livestockId === item.livestockId
            ? { ...i, quantity: Math.min(i.quantity + 1, 99) }
            : i
        )
      }
      return [...prev, { ...item, quantity: 1, cartItemId: generateId() }]
    })
  }, [setCartItems])

  const removeFromCart = useCallback((cartItemId) => {
    setCartItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId))
  }, [setCartItems])

  const updateQuantity = useCallback((cartItemId, quantity) => {
    if (quantity < 1) return
    setCartItems((prev) =>
      prev.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity: Math.min(quantity, 99) } : i))
    )
  }, [setCartItems])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [setCartItems])

  const cartCount = useMemo(() => cartItems.reduce((sum, i) => sum + i.quantity, 0), [cartItems])
  const subtotal = useMemo(() => cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0), [cartItems])
  const platformFee = useMemo(() => subtotal * PLATFORM_FEE_RATE, [subtotal])
  const total = useMemo(() => subtotal + platformFee, [subtotal, platformFee])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        subtotal,
        platformFee,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
