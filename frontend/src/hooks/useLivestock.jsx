import { useEffect, useState } from 'react'

const API_BASE_URL = './api'

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
        const response = await fetch(`${API}/livestock`, {
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

export default useLivestock;
