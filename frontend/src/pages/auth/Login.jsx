import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { getPostLoginRedirect } from '../../utils/authRedirect'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Tractor,
  Store,
  ChevronRight,
} from 'lucide-react'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated, user } = useAuth()

  const preselectedRole = location.state?.role === 'admin'
    ? null
    : (location.state?.role || null)
  const [selectedRole, setSelectedRole] = useState(preselectedRole)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isAuthenticated && user) {
      const redirect = getPostLoginRedirect(user)
      navigate(redirect, { replace: true })
    }
  }, [isAuthenticated, user, navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.email || !formData.password) {
      setError('Please enter your email and password.')
      return
    }

    setIsSubmitting(true)

    try {
      const userData = await login(formData.email, formData.password)

      if (selectedRole && userData.role !== selectedRole) {
        setError(
          `This account is registered as a ${userData.role}. Please continue using the ${userData.role} sign-in option.`
        )
        return
      }

      const redirect = getPostLoginRedirect(userData)
      navigate(redirect, { replace: true })
    } catch (err) {
      setError(err.message || 'The email or password you entered is incorrect.')
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
        .login-page {
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

        .login-card {
          width: min(100%, 560px);
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

        .login-content {
          padding: 64px 68px 50px;
        }

        .login-heading {
          text-align: center;
        }

        .login-heading h1 {
          margin: 0;
          color: var(--farm-text);
          font-family: 'IBM Plex Serif', serif;
          font-size: clamp(38px, 7vw, 48px);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -1px;
        }

        .login-heading p {
          max-width: 390px;
          margin: 18px auto 38px;
          color: var(--farm-muted);
          font-family: 'Modern Antiqua', serif;
          font-size: 16px;
          line-height: 1.75;
        }

        .login-role-indicator {
          width: fit-content;
          margin: -12px auto 26px;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid var(--farm-green-border);
          background: var(--farm-green-soft);
          color: var(--farm-green);
          font-family: 'Modern Antiqua', serif;
          font-size: 13px;
          font-weight: 600;
        }

        .login-back {
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

        .login-back:hover {
          color: var(--farm-green);
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .login-field {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .login-field > span {
          color: var(--farm-text);
          font-family: 'Modern Antiqua', serif;
          font-size: 14px;
          font-weight: 600;
        }

        .login-input {
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

        .login-input:focus-within {
          border-color: var(--farm-green);
          background: var(--auth-input-focus);
          box-shadow:
            0 0 0 4px var(--farm-green-glow);
        }

        .login-input input {
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

        .login-input input::placeholder {
          color: var(--farm-muted);
        }

        .password-toggle {
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

        .password-toggle:hover {
          background: var(--farm-green-glow);
          color: var(--farm-green);
        }

        .login-options {
          display: flex;
          justify-content: flex-end;
          margin-top: -2px;
        }

        .login-options a {
          color: var(--farm-green);
          font-family: 'Modern Antiqua', serif;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
        }

        .login-options a:hover {
          color: var(--farm-text);
        }

        .auth-error {
          margin: 0;
          color: var(--farm-error);
          font-family: 'Modern Antiqua', serif;
          font-size: 14px;
          line-height: 1.5;
          text-align: center;
        }

        .login-submit {
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

        .login-submit:hover:not(:disabled) {
          background: #216b3b;
          box-shadow: 0 12px 28px var(--farm-green-glow);
        }

        .login-submit:disabled {
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

        .login-register {
          margin: 30px 0 0;
          color: var(--farm-muted);
          font-family: 'Modern Antiqua', serif;
          font-size: 14px;
          line-height: 1.7;
          text-align: center;
        }

        .login-register a {
          color: var(--farm-green);
          font-weight: 700;
          text-decoration: none;
        }

        .login-register a:hover {
          color: var(--farm-text);
        }

        .login-divider {
          width: 100%;
          height: 1px;
          margin: 30px 0 22px;
          background: var(--farm-green-border);
        }

        .login-terms {
          max-width: 390px;
          margin: 0 auto;
          color: var(--farm-muted);
          font-family: 'Modern Antiqua', serif;
          font-size: 12px;
          line-height: 1.8;
          text-align: center;
        }

        .login-footer {
          display: flex;
          justify-content: center;
          gap: 28px;
          padding: 19px 24px;
          border-top: 1px solid var(--farm-green-border);
          background: var(--auth-footer);
          color: var(--farm-muted);
          font-family: 'Modern Antiqua', serif;
          font-size: 12px;
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
          .login-page {
            padding: 32px 16px;
          }

          .login-content {
            padding: 54px 28px 42px;
          }

          .login-heading h1 {
            font-size: 38px;
          }

          .login-footer {
            gap: 20px;
          }
        }

        @media (max-width: 400px) {
          .login-page {
            padding: 20px 10px;
          }

          .login-card {
            border-radius: 24px;
          }

          .login-content {
            padding: 46px 20px 36px;
          }

          .login-footer {
            gap: 12px;
            font-size: 11px;
          }
        }
      `}</style>

      <main className="login-page">
        <motion.section
          className="login-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="login-content">
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
                  <div className="login-heading">
                    <h1>Welcome back to Farmart</h1>
                    <p>
                      How would you like to continue?
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
                          Manage your farm, sell your produce and grow your business on Farmart.
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
                          Sign in as Farmer
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
                          Discover fresh products and buy directly from farmers on Farmart.
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
                          Sign in as Buyer
                          <ChevronRight size={14} strokeWidth={2} />
                        </div>
                      </div>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="login-form"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ width: '100%' }}
                >
                  <button
                    type="button"
                    className="login-back"
                    onClick={handleBack}
                  >
                    <ArrowLeft size={16} strokeWidth={2} />
                    Change account type
                  </button>

                  <div className="login-heading">
                    <h1>Sign in as a {roleLabel}</h1>
                    <p>
                      {selectedRole === 'farmer'
                        ? 'Welcome back. Manage your farm and continue growing on Farmart.'
                        : 'Welcome back. Discover fresh products from farmers on Farmart.'}
                    </p>
                  </div>

                  <div className="login-role-indicator">
                    {selectedRole === 'farmer' ? 'Farmer account' : 'Buyer account'}
                  </div>

                  <form onSubmit={handleSubmit} className="login-form">
                    <label className="login-field">
                      <span>Email</span>
                      <div className="login-input">
                        <Mail size={17} strokeWidth={2} />
                        <input
                          type="email"
                          name="email"
                          placeholder="farmer@boranfarm.co.ke"
                          value={formData.email}
                          onChange={handleChange}
                          autoComplete="email"
                        />
                      </div>
                    </label>

                    <label className="login-field">
                      <span>Password</span>
                      <div className="login-input">
                        <Lock size={17} strokeWidth={2} />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleChange}
                          autoComplete="current-password"
                        />
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={
                            showPassword ? 'Hide password' : 'Show password'
                          }
                        >
                          {showPassword ? (
                            <EyeOff size={17} strokeWidth={2} />
                          ) : (
                            <Eye size={17} strokeWidth={2} />
                          )}
                        </button>
                      </div>
                    </label>

                    <div className="login-options">
                      <Link to="/forgot-password">
                        Forgot password?
                      </Link>
                    </div>

                    {error && (
                      <motion.p
                        className="auth-error"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {error}
                      </motion.p>
                    )}

                    <button
                      type="submit"
                      className="login-submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? 'Signing in...'
                        : `Sign in as ${roleLabel}`}
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

                  <p className="login-register">
                    New to Farmart?{' '}
                    <Link
                      to="/register"
                      state={{ role: selectedRole }}
                    >
                      Create a {roleLabel} account
                    </Link>
                  </p>

                  <div className="login-divider" />

                  <p className="login-terms">
                    By continuing you agree to Farmart's Terms and
                    Conditions of service &amp; Fair-Trade Policy
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="login-footer">
            <span>Secure</span>
            <span>Verified</span>
            <span>Fair Trade</span>
          </div>
        </motion.section>
      </main>
    </>
  )
}

export default Login
