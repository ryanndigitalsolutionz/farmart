/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useCallback, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { generateId } from '../data/livestockMockData'

const WishlistContext = createContext(null)

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useLocalStorage('farmart_wishlist', [])

  const addToWishlist = useCallback((item) => {
    setWishlistItems((prev) => {
      if (prev.find((i) => i.livestockId === item.livestockId)) return prev
      return [...prev, { ...item, wishlistItemId: generateId(), addedAt: new Date().toISOString() }]
    })
  }, [setWishlistItems])

  const removeFromWishlist = useCallback((livestockId) => {
    setWishlistItems((prev) => prev.filter((i) => i.livestockId !== livestockId))
  }, [setWishlistItems])

  const isInWishlist = useCallback((livestockId) => {
    return wishlistItems.some((i) => i.livestockId === livestockId)
  }, [wishlistItems])

  const toggleWishlist = useCallback((item) => {
    if (isInWishlist(item.livestockId)) {
      removeFromWishlist(item.livestockId)
    } else {
      addToWishlist(item)
    }
  }, [addToWishlist, removeFromWishlist, isInWishlist])

  const clearWishlist = useCallback(() => {
    setWishlistItems([])
  }, [setWishlistItems])

  const wishlistCount = useMemo(() => wishlistItems.length, [wishlistItems])

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
