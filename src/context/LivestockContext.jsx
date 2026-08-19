/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useCallback, useMemo } from 'react'
import { livestockMockData } from '../data/livestockMockData'
import { useLocalStorage } from '../hooks/useLocalStorage'

const LivestockContext = createContext(null)

export const LivestockProvider = ({ children }) => {
  const [listings, setListings] = useLocalStorage('farmart_listings', [...livestockMockData])

  const getListingById = useCallback((id) => {
    return listings.find((l) => l.id === id) || null
  }, [listings])

  const createListing = useCallback((listing) => {
    const newListing = {
      ...listing,
      id: `ls-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      status: 'pending',
      views: 0,
      createdAt: new Date().toISOString(),
    }
    setListings((prev) => [...prev, newListing])
    return newListing
  }, [setListings])

  const updateListing = useCallback((id, updates) => {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...updates, updatedAt: new Date().toISOString() } : l))
    )
    const updated = listings.find((l) => l.id === id)
    if (updated) {
      return { ...updated, ...updates }
    }
    return null
  }, [setListings, listings])

  const deleteListing = useCallback((id) => {
    setListings((prev) => prev.filter((l) => l.id !== id))
  }, [setListings])

  const getApprovedListings = useCallback(() => {
    return listings.filter((l) => l.status === 'approved')
  }, [listings])

  const getPendingListings = useCallback(() => {
    return listings.filter((l) => l.status === 'pending')
  }, [listings])

  const getListingsByFarmer = useCallback((farmerId) => {
    return listings.filter((l) => l.farmerId === farmerId)
  }, [listings])

  const searchListings = useCallback((query, filters = {}) => {
    let results = [...listings]

    if (query) {
      const q = query.toLowerCase()
      results = results.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.breed.toLowerCase().includes(q) ||
          l.type.toLowerCase().includes(q) ||
          l.location.toLowerCase().includes(q) ||
          (l.farmerName && l.farmerName.toLowerCase().includes(q))
      )
    }

    if (filters.type && filters.type !== 'all') {
      results = results.filter((l) => l.type === filters.type)
    }
    if (filters.breed && filters.breed !== 'all') {
      results = results.filter((l) => l.breed === filters.breed)
    }
    if (filters.location && filters.location !== 'all') {
      results = results.filter((l) => l.location === filters.location)
    }
    if (filters.minPrice) {
      results = results.filter((l) => l.price >= Number(filters.minPrice))
    }
    if (filters.maxPrice) {
      results = results.filter((l) => l.price <= Number(filters.maxPrice))
    }
    if (filters.status && filters.status !== 'all') {
      results = results.filter((l) => l.status === filters.status)
    }
    if (filters.healthStatus && filters.healthStatus !== 'all') {
      results = results.filter((l) => l.healthStatus === filters.healthStatus)
    }
    if (filters.ageMin) {
      results = results.filter((l) => l.age >= Number(filters.ageMin))
    }
    if (filters.ageMax) {
      results = results.filter((l) => l.age <= Number(filters.ageMax))
    }

    return results
  }, [listings])

  const sortListings = useCallback((listingsToSort, sortBy) => {
    const sorted = [...listingsToSort]
    switch (sortBy) {
      case 'price_low':
        return sorted.sort((a, b) => a.price - b.price)
      case 'price_high':
        return sorted.sort((a, b) => b.price - a.price)
      case 'age':
        return sorted.sort((a, b) => a.age - b.age)
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      case 'popular':
        return sorted.sort((a, b) => b.views - a.views)
      default:
        return sorted
    }
  }, [])

  const value = useMemo(() => ({
    listings,
    getListingById,
    createListing,
    updateListing,
    deleteListing,
    getApprovedListings,
    getPendingListings,
    getListingsByFarmer,
    searchListings,
    sortListings,
  }), [listings, getListingById, createListing, updateListing, deleteListing, getApprovedListings, getPendingListings, getListingsByFarmer, searchListings, sortListings])

  return (
    <LivestockContext.Provider value={value}>
      {children}
    </LivestockContext.Provider>
  )
}

export const useLivestock = () => {
  const context = useContext(LivestockContext)
  if (!context) {
    throw new Error('useLivestock must be used within a LivestockProvider')
  }
  return context
}
