import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { validators, validate } from '../../utils/validation'
import { CheckCircle } from 'lucide-react'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import ErrorMessage from '../../components/common/ErrorMessage'

const ResetPassword = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const [formData, setFormData] = useState({ password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
    setApiError('')
  }

  const handleBlur = (name) => {
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
      password: [validators.required, validators.password],
      confirmPassword: [validators.confirmPassword.bind(null, formData.password)],
    }

    const validationErrors = validate(formData, validationRules)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setSuccess(true)
    setLoading(false)
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="card max-w-md w-full">
          <div className="card-body p-6 text-center">
            <ErrorMessage message="Invalid or expired reset token" />
            <Button onClick={() => navigate('/forgot-password')} className="mt-4">
              Request New Link
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="card max-w-md w-full">
        <div className="card-header text-center p-6">
          <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
          <p className="text-gray-600 mt-1">Enter your new password below</p>
        </div>
        <div className="card-body p-6">
          {success ? (
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Password updated
              </h3>
              <p className="text-gray-600 mb-4">
                Your password has been reset successfully.
              </p>
              <Button onClick={() => navigate('/login')} className="w-full">
                Sign In
              </Button>
            </div>
          ) : (
            <>
              {apiError && <ErrorMessage message={apiError} />}
              <form onSubmit={handleSubmit}>
                <Input
                  label="New Password"
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
                  {loading ? 'Updating...' : 'Reset Password'}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
