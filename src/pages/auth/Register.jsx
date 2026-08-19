import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { validators, validate } from '../../utils/validation'
import { ROLES, USER_ROLES } from '../../constants/userRoles'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Select from '../../components/common/Select'
import ErrorMessage from '../../components/common/ErrorMessage'

const Register = () => {
  const navigate = useNavigate()
  const { register, isAuthenticated } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: ROLES.BUYER,
  })
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
    setApiError('')
  }

  const handleBlur = (name) => {
    if (name === 'name') {
      setErrors((prev) => ({
        ...prev,
        name: validators.required(formData.name) || validators.minLength(2)(formData.name),
      }))
    }
    if (name === 'email') {
      setErrors((prev) => ({ ...prev, email: validators.email(formData.email) }))
    }
    if (name === 'phone') {
      setErrors((prev) => ({ ...prev, phone: validators.phone(formData.phone) }))
    }
    if (name === 'password') {
      setErrors((prev) => ({ ...prev, password: validators.password(formData.password) }))
    }
    if (name === 'confirmPassword') {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validators.confirmPassword(formData.confirmPassword, formData.password),
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError('')

    const validationRules = {
      name: [validators.required, validators.minLength(2)],
      email: [validators.required, validators.email],
      phone: [validators.required, validators.phone],
      password: [validators.required, validators.password],
      confirmPassword: [validators.confirmPassword.bind(null, formData.password)],
    }

    const validationErrors = validate(formData, validationRules)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    setLoading(true)
    try {
      const userData = { ...formData }
      delete userData.confirmPassword
      await register(userData)
      if (formData.role === ROLES.FARMER) {
        navigate('/farm-setup', { replace: true })
      } else {
        navigate('/verify-email', { replace: true, state: { email: formData.email } })
      }
    } catch (err) {
      setApiError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const roleOptions = [
    { value: ROLES.BUYER, label: USER_ROLES[ROLES.BUYER] },
    { value: ROLES.FARMER, label: USER_ROLES[ROLES.FARMER] },
    { value: ROLES.ADMIN, label: USER_ROLES[ROLES.ADMIN] },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="card max-w-lg w-full">
        <div className="card-header text-center p-6">
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-600 mt-1">Join Farmart today</p>
        </div>
        <div className="card-body p-6">
          {apiError && <ErrorMessage message={apiError} />}
          <form onSubmit={handleSubmit}>
            <Select
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              options={roleOptions}
              required
            />
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={() => handleBlur('name')}
              error={errors.name}
              placeholder="John Doe"
              required
            />
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
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              onBlur={() => handleBlur('phone')}
              error={errors.phone}
              placeholder="+254 700 000 000"
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
              placeholder="At least 6 characters"
              required
            />
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={() => handleBlur('confirmPassword')}
              error={errors.confirmPassword}
              placeholder="Repeat your password"
              required
            />
            <Button type="submit" loading={loading} className="w-full mt-2">
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <button
              type="button"
              className="text-green-600 font-semibold hover:text-green-700"
              onClick={() => navigate('/login')}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
