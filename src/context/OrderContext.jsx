/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { generateId } from '../data/livestockMockData'
import { ORDER_STATUS } from '../constants/userRoles'

const OrderContext = createContext(null)

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useLocalStorage('farmart_orders', [])
  const [reviews, setReviews] = useLocalStorage('farmart_reviews', [])

  const createOrder = useCallback((orderData) => {
    const order = {
      ...orderData,
      id: generateId(),
      orderStatus: ORDER_STATUS.PENDING,
      paymentStatus: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setOrders((prev) => [...prev, order])
    return order
  }, [setOrders])

  const getOrderById = useCallback((orderId) => {
    return orders.find((o) => o.id === orderId) || null
  }, [orders])

  const getOrdersByBuyer = useCallback((buyerId) => {
    return orders.filter((o) => o.buyerId === buyerId)
  }, [orders])

  const getOrdersByFarmer = useCallback((farmerId) => {
    return orders.filter((o) => o.farmerId === farmerId)
  }, [orders])

  const updateOrderStatus = useCallback((orderId, status) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: status, updatedAt: new Date().toISOString() } : o))
    )
  }, [setOrders])

  const updatePaymentStatus = useCallback((orderId, paymentStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, paymentStatus, updatedAt: new Date().toISOString() } : o
      )
    )
  }, [setOrders])

  const addReview = useCallback((review) => {
    const newReview = {
      ...review,
      id: generateId(),
      createdAt: new Date().toISOString(),
    }
    setReviews((prev) => [...prev, newReview])
    return newReview
  }, [setReviews])

  const getReviewsByLivestock = useCallback((livestockId) => {
    return reviews.filter((r) => r.livestockId === livestockId)
  }, [reviews])

  const getReviewsByBuyer = useCallback((buyerId) => {
    return reviews.filter((r) => r.buyerId === buyerId)
  }, [reviews])

  return (
    <OrderContext.Provider
      value={{
        orders,
        reviews,
        createOrder,
        getOrderById,
        getOrdersByBuyer,
        getOrdersByFarmer,
        updateOrderStatus,
        updatePaymentStatus,
        addReview,
        getReviewsByLivestock,
        getReviewsByBuyer,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export const useOrders = () => {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider')
  }
  return context
}
