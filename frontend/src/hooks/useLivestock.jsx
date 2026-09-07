import { useEffect, useState } from 'react'
import API_BASE_URL from '../api/api'

function useLivestock() {
  const [livestock, setLivestock] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    const fetchLivestock = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(`${API_BASE_URL}/livestock`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
          },
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.message ||
            data.description ||
            'Unable to load livestock'
          )
        }

        const items = Array.isArray(data)
          ? data
          : Array.isArray(data.livestock)
            ? data.livestock
            : []

        if (mounted) {
          setLivestock(items)
        }
      } catch (err) {
        console.error('Livestock fetch error:', err)

        if (mounted) {
          setLivestock([])
          setError(err.message || 'Unable to load livestock')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchLivestock()

    return () => {
      mounted = false
    }
  }, [])

  return {
    livestock,
    loading,
    error,
  }
}

export default useLivestock

