import { createContext, useContext, useEffect, useState } from 'react'
import API_BASE_URL from '../api/api'

const LivestockContext = createContext(null)

export function LivestockProvider({ children }) {
  const [livestock, setLivestock] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true

    const loadLivestock = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          `${API_BASE_URL}/api/livestock`,
          {
            credentials: 'include',
          },
        )

        const data = await response.json().catch(() => [])

        if (!response.ok) {
          throw new Error(
            data.error ||
            data.message ||
            'Failed to load livestock.',
          )
        }

        const items = Array.isArray(data)
          ? data
          : data.livestock || data.items || []

        if (active) {
          setLivestock(items)
        }
      } catch (err) {
        if (active) {
          setLivestock([])
          setError(err.message || 'Failed to load livestock.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadLivestock()

    return () => {
      active = false
    }
  }, [])

  return (
    <LivestockContext.Provider
      value={{
        livestock,
        loading,
        error,
      }}
    >
      {children}
    </LivestockContext.Provider>
  )
}

export function useLivestockContext() {
  const context = useContext(LivestockContext)

  if (!context) {
    throw new Error(
      'useLivestockContext must be used within a LivestockProvider',
    )
  }

  return context
}
