import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { validators, validate } from '../../utils/validation'
import { ROLES } from '../../constants/userRoles'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import ErrorMessage from '../../components/common/ErrorMessage'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated } = useAuth()

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  const from = location.state?.from?.pathname || null

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from || '/', { replace: true })
    }
  }, [isAuthenticated, navigate, from])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
    setApiError('')
  }

  const handleBlur = (name) => {
    if (name === 'email') {
      setErrors((prev) => ({ ...prev, email: validators.email(formData.email) }))
    }
    if (name === 'password') {
      setErrors((prev) => ({ ...prev, password: validators.password(formData.password) }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError('')

    const validationRules = {
      email: [validators.required, validators.email],
      password: [validators.required, validators.password],
    }

    const validationErrors = validate(formData, validationRules)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    setLoading(true)
    try {
      const user = await login(formData.email, formData.password)
      const rolePath =
        user.role === ROLES.ADMIN
          ? '/admin'
          : user.role === ROLES.FARMER
          ? '/farmer'
          : '/buyer'
      navigate(rolePath, { replace: true })
    } catch (err) {
      setApiError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="card max-w-md w-full">
        <div className="card-header text-center p-6">
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-1">Sign in to your Farmart account</p>
        </div>
        <div className="card-body p-6">
          {apiError && <ErrorMessage message={apiError} />}
          <form onSubmit={handleSubmit}>
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => handleBlur('email')}
              error={errors.email}
              placeholder="you@example.com"
              required
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={() => handleBlur('password')}
              error={errors.password}
              placeholder="Enter your password"
              required
            />
            <div className="flex justify-end mb-3">
              <button
                type="button"
                className="text-sm text-green-600 hover:text-green-700"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot password?
              </button>
            </div>
            <Button type="submit" loading={loading} className="w-full">
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              className="text-green-600 font-semibold hover:text-green-700"
              onClick={() => navigate('/register')}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
