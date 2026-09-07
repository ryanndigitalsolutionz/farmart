import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API_BASE_URL from '../../api/api'

function GoogleCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const finishLogin = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/auth/me`,
          {
            method: 'GET',
            credentials: 'include',
          },
        )

        const data = await response.json()

        if (!response.ok || !data.success || !data.user) {
          localStorage.removeItem('farmartUser')
          navigate('/', { replace: true })
          return
        }

        const user = {
          id: data.user.id,
          first_name: data.user.first_name,
          last_name: data.user.last_name,
          email: data.user.email,
          role: data.user.role,
          is_verified: data.user.is_verified,
          isLoggedIn: true,
        }

        localStorage.setItem(
          'farmartUser',
          JSON.stringify(user),
        )

        if (user.role === 'farmer') {
          navigate('/farm-setup', { replace: true })
          return
        }

        if (user.role === 'buyer') {
          navigate('/buyer/marketplace', { replace: true })
          return
        }

        if (user.role === 'admin') {
          navigate('/admin/dashboard', { replace: true })
          return
        }

        localStorage.removeItem('farmartUser')
        navigate('/', { replace: true })
      } catch {
        localStorage.removeItem('farmartUser')
        navigate('/', { replace: true })
      }
    }

    finishLogin()
  }, [navigate])

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--farm-background)',
        color: 'var(--farm-text)',
        fontFamily: '"Modern Antiqua", serif',
      }}
    >
      Logging you in...
    </main>
  )
}

export default GoogleCallback
