/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useCallback, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { generateId } from '../data/livestockMockData'
import { getPendingLivestock } from '../data/livestockMockData'
import { getUsersByRole, updateUser, deleteUser, users as mockUsers } from '../data/buyerMockData'
import { useOrders } from './OrderContext'

const AdminContext = createContext(null)

export const AdminProvider = ({ children }) => {
  const [disputes, setDisputes] = useLocalStorage('farmart_disputes', [])
  const [transactions] = useLocalStorage('farmart_transactions', [])
  const { orders } = useOrders()

  const approveListing = useCallback(() => {
    // Handled via LivestockContext
  }, [])

  const rejectListing = useCallback(() => {
    // Handled via LivestockContext
  }, [])

  const suspendListing = useCallback(() => {
    // Handled via LivestockContext
  }, [])

  const createDispute = useCallback((disputeData) => {
    const dispute = {
      ...disputeData,
      id: generateId(),
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setDisputes((prev) => [...prev, dispute])
    return dispute
  }, [setDisputes])

  const updateDispute = useCallback((disputeId, updates) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === disputeId ? { ...d, ...updates, updatedAt: new Date().toISOString() } : d))
    )
  }, [setDisputes])

  const deleteUserAccount = useCallback((userId) => {
    deleteUser(userId)
  }, [])

  const suspendUser = useCallback((userId) => {
    updateUser(userId, { status: 'suspended' })
  }, [])

  const activateUser = useCallback((userId) => {
    updateUser(userId, { status: 'active' })
  }, [])

  const getDisputes = useCallback(() => {
    return disputes
  }, [disputes])

  const getTransactions = useCallback(() => {
    return transactions.length > 0 ? transactions : orders.map((o) => ({
      id: o.id,
      type: 'Order Payment',
      amount: o.total,
      date: o.createdAt,
      status: o.paymentStatus,
      buyerName: o.buyerName,
      farmerName: o.farmerName,
    }))
  }, [transactions, orders])

  const stats = useMemo(() => {
    const totalUsers = mockUsers.length
    const farmers = getUsersByRole('farmer')
    const buyers = getUsersByRole('buyer')
    const pendingListings = getPendingLivestock()
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0)
    const totalCommission = orders.reduce((sum, o) => sum + (o.platformFee || 0), 0)

    return {
      totalUsers,
      totalFarmers: farmers.length,
      totalBuyers: buyers.length,
      activeListings: pendingListings.length,
      totalRevenue,
      totalCommission,
      pendingApprovals: pendingListings.length,
    }
  }, [orders])

  return (
    <AdminContext.Provider
      value={{
        disputes,
        transactions,
        stats,
        approveListing,
        rejectListing,
        suspendListing,
        createDispute,
        updateDispute,
        deleteUserAccount,
        suspendUser,
        activateUser,
        getDisputes,
        getTransactions,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}
