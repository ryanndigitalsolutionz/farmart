import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import ErrorMessage from '../../components/common/ErrorMessage'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setSuccess(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="card max-w-md w-full">
        <div className="card-header text-center p-6">
          <h2 className="text-2xl font-bold text-gray-900">Forgot Password</h2>
          <p className="text-gray-600 mt-1">
            Enter your email and we&apos;ll send you a reset link
          </p>
        </div>
        <div className="card-body p-6">
          {success ? (
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Check your email
              </h3>
              <p className="text-gray-600 mb-4">
                We sent a password reset link to <strong>{email}</strong>
              </p>
              <Button onClick={() => navigate('/login')} className="w-full">
                Back to Login
              </Button>
            </div>
          ) : (
            <>
              {error && <ErrorMessage message={error} />}
              <form onSubmit={handleSubmit}>
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  error={error}
                  placeholder="you@example.com"
                  required
                />
                <Button type="submit" loading={loading} className="w-full">
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>
              <p className="text-center text-sm text-gray-600 mt-4">
                Remember your password?{' '}
                <button
                  type="button"
                  className="text-green-600 font-semibold hover:text-green-700"
                  onClick={() => navigate('/login')}
                >
                  Sign in
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
