import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import Button from '../../components/common/Button'
import ErrorMessage from '../../components/common/ErrorMessage'

const VerifyEmail = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || ''

  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [resending, setResending] = useState(false)

  useEffect(() => {
    if (!email) {
      navigate('/register', { replace: true })
    }
  }, [email, navigate])

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return
    const newCode = [...code]
    newCode[index] = value.slice(-1)
    setCode(newCode)
    if (error) setError('')
    if (value && index < 5) {
      const nextInput = document.getElementById(`verify-code-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`verify-code-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('')
    const newCode = [...code]
    pastedData.forEach((char, index) => {
      if (index < 6 && /^\d$/.test(char)) {
        newCode[index] = char
      }
    })
    setCode(newCode)
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const fullCode = code.join('')

    if (fullCode.length !== 6) {
      setError('Please enter the complete 6-digit code')
      return
    }

    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSuccess(true)
    setLoading(false)
  }

  const handleResend = async () => {
    setResending(true)
    await new Promise((r) => setTimeout(r, 1000))
    setResending(false)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="card max-w-md w-full">
          <div className="card-body p-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Email Verified
            </h3>
            <p className="text-gray-600 mb-4">
              Your email has been verified successfully. You can now sign in.
            </p>
            <Button onClick={() => navigate('/login')} className="w-full">
              Continue to Login
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
          <h2 className="text-2xl font-bold text-gray-900">Verify Your Email</h2>
          <p className="text-gray-600 mt-1">
            Enter the 6-digit code sent to <strong>{email}</strong>
          </p>
        </div>
        <div className="card-body p-6">
          {error && <ErrorMessage message={error} />}
          <form onSubmit={handleSubmit}>
            <div
              className="flex justify-center gap-2 mb-6"
              onPaste={handlePaste}
            >
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`verify-code-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="form-input text-center text-xl w-12 h-14"
                />
              ))}
            </div>
            <Button type="submit" loading={loading} className="w-full">
              {loading ? 'Verifying...' : 'Verify Email'}
            </Button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Didn&apos;t receive the code?{' '}
            <button
              type="button"
              className="text-green-600 font-semibold hover:text-green-700"
              onClick={handleResend}
              disabled={resending}
            >
              {resending ? 'Sending...' : 'Resend'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail
