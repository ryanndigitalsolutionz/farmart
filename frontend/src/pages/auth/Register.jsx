import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Tractor,
  Store,
  ChevronRight,
} from 'lucide-react'

function Register() {
  const navigate = useNavigate()
  const location = useLocation()
  const { register, isAuthenticated } = useAuth()

  const preselectedRole = location.state?.role
  const [selectedRole, setSelectedRole] = useState(preselectedRole || null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!selectedRole) {
      setError('Please select a registration role first.')
      return
    }

    if (selectedRole === 'admin') {
      setError('Administrator accounts cannot be created here.')
      return
    }

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError('Please complete all fields.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setIsSubmitting(true)

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: selectedRole,
      })

      if (selectedRole === 'farmer') {
        navigate('/farm-setup')
        return
      }

      if (selectedRole === 'buyer') {
        navigate('/buyer/marketplace')
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    setSelectedRole(null)
    setError('')
  }

  const roleLabel = selectedRole === 'farmer' ? 'Farmer' : selectedRole === 'buyer' ? 'Buyer' : ''

  return (
    <>
      <style>{`
        .register-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 24px;
          background:
            radial-gradient(
              circle at 50% 30%,
              rgba(39, 122, 68, 0.09),
              transparent 46%
            ),
            var(--farm-background);
          color: var(--farm-text);
          transition:
            background 180ms ease,
            color 180ms ease;
        }

        .register-card {
          width: min(100%, 570px);
          overflow: hidden;
          border: 1px solid var(--farm-green-border);
          border-radius: 30px;
          background: var(--auth-card);
          box-shadow:
            0 28px 80px var(--farm-green-glow),
            0 6px 20px var(--farm-green-glow);
          transition:
            background 180ms ease,
            border-color 180ms ease,
            box-shadow 180ms ease;
        }

        .register-content {
          padding: 64px 68px 48px;
        }

        .register-heading {
          text-align: center;
        }

        .register-heading h1 {
          margin: 0;
          color: var(--farm-text);
          font-family: 'IBM Plex Serif', serif;
          font-size: clamp(36px, 7vw, 47px);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -1px;
        }

        .register-heading p {
          max-width: 410px;
          margin: 18px auto 38px;
          color: var(--farm-muted);
          font-family: 'Modern Antiqua', serif;
          font-size: 16px;
          line-height: 1.75;
        }

        .register-role {
          width: fit-content;
          margin: -18px auto 28px;
          padding: 8px 15px;
          border: 1px solid var(--farm-green-border);
          border-radius: 999px;
          background: var(--farm-green-soft);
          color: var(--farm-green);
          font-family: 'Modern Antiqua', serif;
          font-size: 13px;
          font-weight: 600;
        }

        .register-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 18px;
          padding: 8px 10px;
          border: none;
          background: transparent;
          color: var(--farm-muted);
          font-family: 'Modern Antiqua', serif;
          font-size: 14px;
          cursor: pointer;
          transition: color 160ms ease;
        }

        .register-back:hover {
          color: var(--farm-green);
        }

        .register-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .register-field {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .register-field > label {
          color: var(--farm-text);
          font-family: 'Modern Antiqua', serif;
          font-size: 14px;
          font-weight: 600;
        }

        .register-input {
          width: 100%;
          min-height: 61px;
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 0 17px;
          border: 1px solid var(--farm-green-border);
          border-radius: 15px;
          background: var(--auth-input);
          color: var(--farm-green);
          box-sizing: border-box;
          transition:
            border-color 180ms ease,
            background 180ms ease,
            box-shadow 180ms ease;
        }

        .register-input:focus-within {
          border-color: var(--farm-green);
          background: var(--auth-input-focus);
          box-shadow:
            0 0 0 4px var(--farm-green-glow);
        }

        .register-input input {
          width: 100%;
          min-width: 0;
          height: 100%;
          padding: 0;
          border: 0;
          outline: 0;
          background: transparent;
          color: var(--farm-text);
          font-family: 'Modern Antiqua', serif;
          font-size: 15px;
        }

        .register-input input::placeholder {
          color: var(--farm-muted);
        }

        .register-password-toggle {
          width: 34px;
          height: 34px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          border: 0;
          border-radius: 9px;
          background: transparent;
          color: var(--farm-muted);
          cursor: pointer;
          transition:
            background 160ms ease,
            color 160ms ease;
        }

        .register-password-toggle:hover {
          background: var(--farm-green-glow);
          color: var(--farm-green);
        }

        .register-error {
          margin: 0;
          color: var(--farm-error);
          font-family: 'Modern Antiqua', serif;
          font-size: 14px;
          line-height: 1.5;
          text-align: center;
        }

        .register-submit {
          width: 100%;
          min-height: 62px;
          margin-top: 4px;
          border: 1px solid var(--farm-green);
          border-radius: 16px;
          background: var(--farm-green);
          color: #ffffff;
          font-family: 'Modern Antiqua', serif;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition:
            background 180ms ease,
            box-shadow 180ms ease,
            opacity 180ms ease;
        }

        .register-submit:hover:not(:disabled) {
          background: #216b3b;
          box-shadow: 0 12px 28px var(--farm-green-glow);
        }

        .register-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .google-button {
          width: 100%;
          min-height: 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          border: 1px solid #4285f4;
          border-radius: 15px;
          background: #4285f4;
          color: #ffffff;
          font-family: 'Modern Antiqua', serif;
          font-size: 15px;
          font-weight: 600;
          cursor: not-allowed;
          opacity: 0.55;
        }

        .google-button:disabled {
          cursor: not-allowed;
        }

        .google-note {
          margin: -8px 0 0;
          color: var(--farm-muted);
          font-family: 'Modern Antiqua', serif;
          font-size: 12px;
          text-align: center;
        }

        .register-switch {
          margin: 30px 0 0;
          color: var(--farm-muted);
          font-family: 'Modern Antiqua', serif;
          font-size: 14px;
          line-height: 1.7;
          text-align: center;
        }

        .register-switch a {
          color: var(--farm-green);
          font-weight: 700;
          text-decoration: none;
        }

        .register-switch a:hover {
          color: var(--farm-text);
        }

        .register-divider {
          width: 100%;
          height: 1px;
          margin: 30px 0 22px;
          background: var(--farm-green-border);
        }

        .register-terms {
          max-width: 410px;
          margin: 0 auto;
          color: var(--farm-muted);
          font-family: 'Modern Antiqua', serif;
          font-size: 12px;
          line-height: 1.8;
          text-align: center;
        }

        /* AUTH THEME SURFACES */

        :root {
          --auth-card: #ffffff;
          --auth-logo-bg: #f4f8f2;
          --auth-input: #f5f9f5;
          --auth-input-focus: #ffffff;
          --auth-footer: #f8fbf8;
        }

        [data-theme='dark'] {
          --auth-card: #1c2b22;
          --auth-logo-bg: #14201a;
          --auth-input: #17241d;
          --auth-input-focus: #1c2b22;
          --auth-footer: #17241d;
        }

        @media (max-width: 600px) {
          .register-page {
            padding: 32px 16px;
          }

          .register-content {
            padding: 54px 28px 42px;
          }

          .register-heading h1 {
            font-size: 37px;
          }
        }

        @media (max-width: 400px) {
          .register-page {
            padding: 20px 10px;
          }

          .register-card {
            border-radius: 24px;
          }

          .register-content {
            padding: 46px 20px 36px;
          }
        }
      `}</style>

      <main className="register-page">
        <motion.section
          className="register-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="register-content">
            <AnimatePresence mode="wait">
              {!selectedRole ? (
                <motion.div
                  key="role-selection"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  <div className="register-heading">
                    <h1>Join Farmart</h1>
                    <p>
                      Choose how you want to join Farmart.
                    </p>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '16px',
                    textAlign: 'left',
                  }}>
                    <button
                      type="button"
                      onClick={() => setSelectedRole('farmer')}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '14px',
                        padding: '24px',
                        borderRadius: '18px',
                        border: '1px solid var(--farm-green-border)',
                        background: 'var(--farm-white)',
                        color: 'var(--farm-text)',
                        fontFamily: 'var(--font-body, "Modern Antiqua", serif)',
                        cursor: 'pointer',
                        transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
                      }}
                    >
                      <div style={{
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '10px',
                        background: 'var(--farm-green-soft)',
                        color: 'var(--farm-green)',
                      }}>
                        <Tractor size={20} strokeWidth={2} />
                      </div>

                      <div>
                        <div style={{ fontWeight: 700, fontSize: '18px' }}>Farmer</div>
                        <div style={{ color: 'var(--farm-muted)', fontSize: '13px', lineHeight: 1.6 }}>
                          Start selling your farm products on Farmart.
                        </div>
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          marginTop: '4px',
                          fontSize: '13px',
                          fontWeight: 700,
                          color: 'var(--farm-green)',
                        }}>
                          Create Farmer account
                          <ChevronRight size={14} strokeWidth={2} />
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedRole('buyer')}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '14px',
                        padding: '24px',
                        borderRadius: '18px',
                        border: '1px solid var(--farm-green-border)',
                        background: 'var(--farm-white)',
                        color: 'var(--farm-text)',
                        fontFamily: 'var(--font-body, "Modern Antiqua", serif)',
                        cursor: 'pointer',
                        transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
                      }}
                    >
                      <div style={{
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '10px',
                        background: 'var(--farm-green-soft)',
                        color: 'var(--farm-green)',
                      }}>
                        <Store size={20} strokeWidth={2} />
                      </div>

                      <div>
                        <div style={{ fontWeight: 700, fontSize: '18px' }}>Buyer</div>
                        <div style={{ color: 'var(--farm-muted)', fontSize: '13px', lineHeight: 1.6 }}>
                          Discover and buy fresh products from farmers on Farmart.
                        </div>
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          marginTop: '4px',
                          fontSize: '13px',
                          fontWeight: 700,
                          color: 'var(--farm-green)',
                        }}>
                          Create Buyer account
                          <ChevronRight size={14} strokeWidth={2} />
                        </div>
                      </div>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="register-form"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ width: '100%' }}
                >
                  <button
                    type="button"
                    className="register-back"
                    onClick={handleBack}
                  >
                    <ArrowLeft size={16} strokeWidth={2} />
                    Change account type
                  </button>

                  <div className="register-heading">
                    <h1>Create your {roleLabel} account</h1>
                    <p>
                      {selectedRole === 'farmer'
                        ? 'Start selling your farm products on Farmart.'
                        : 'Discover and buy fresh products from farmers on Farmart.'}
                    </p>
                  </div>

                  <div className="register-role">
                    Registering as {roleLabel}
                  </div>

                  <form onSubmit={handleSubmit} className="register-form">
                    <div className="register-field">
                      <label htmlFor="name">Full name</label>
                      <div className="register-input">
                        <User size={17} strokeWidth={2} />
                        <input
                          id="name"
                          type="text"
                          name="name"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={handleChange}
                          autoComplete="name"
                        />
                      </div>
                    </div>

                    <div className="register-field">
                      <label htmlFor="email">Email address</label>
                      <div className="register-input">
                        <Mail size={17} strokeWidth={2} />
                        <input
                          id="email"
                          type="email"
                          name="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    <div className="register-field">
                      <label htmlFor="password">Create password</label>
                      <div className="register-input">
                        <Lock size={17} strokeWidth={2} />
                        <input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          placeholder="Create a password"
                          value={formData.password}
                          onChange={handleChange}
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          className="register-password-toggle"
                          onClick={() =>
                            setShowPassword(!showPassword)
                          }
                          aria-label={
                            showPassword
                              ? 'Hide password'
                              : 'Show password'
                          }
                        >
                          {showPassword ? (
                            <EyeOff size={17} strokeWidth={2} />
                          ) : (
                            <Eye size={17} strokeWidth={2} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="register-field">
                      <label htmlFor="confirmPassword">
                        Confirm password
                      </label>
                      <div className="register-input">
                        <Lock size={17} strokeWidth={2} />
                        <input
                          id="confirmPassword"
                          type={
                            showConfirmPassword
                              ? 'text'
                              : 'password'
                          }
                          name="confirmPassword"
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          className="register-password-toggle"
                          onClick={() =>
                            setShowConfirmPassword(
                              !showConfirmPassword,
                            )
                          }
                          aria-label={
                            showConfirmPassword
                              ? 'Hide password'
                              : 'Show password'
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={17} strokeWidth={2} />
                          ) : (
                            <Eye size={17} strokeWidth={2} />
                          )}
                        </button>
                      </div>
                    </div>

                    {error && (
                      <motion.p
                        className="register-error"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {error}
                      </motion.p>
                    )}

                    <button
                      type="submit"
                      className="register-submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? 'Creating account...'
                        : `Create ${roleLabel} account`}
                    </button>

                    <button
                      type="button"
                      className="google-button"
                      disabled
                    >
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Continue with Google
                    </button>

                    <p className="google-note">
                      Google sign-in will be available soon.
                    </p>
                  </form>

                  <p className="register-switch">
                    Already have an account?{' '}
                    <Link
                      to="/login"
                      state={{ role: selectedRole }}
                    >
                      Log in
                    </Link>
                  </p>

                  <div className="register-divider" />

                  <p className="register-terms">
                    By creating an account you agree to Farmart's
                    Terms and Conditions of service &amp; Fair-Trade
                    Policy
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>
      </main>
    </>
  )
}

export default Register
