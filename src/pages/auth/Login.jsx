import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { login, loading } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

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

    try {
      const user = await login(formData.email, formData.password)
      if (user.role === 'farmer') {
        navigate('/farmer')
      } else if (user.role === 'buyer') {
        navigate('/buyer')
      } else if (user.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
    }
  }

  const demoAccounts = [
    { label: 'Farmer', email: 'jomo@greenpastures.co.ke', password: 'demo1234', role: 'farmer' },
    { label: 'Buyer', email: 'amina@example.com', password: 'demo1234', role: 'buyer' },
    { label: 'Admin', email: 'admin@farmart.co.ke', password: 'admin123', role: 'admin' },
  ]

  const fillDemo = (email, password) => {
    setFormData({ email, password })
  }

  return (
    <>
      <style>{`
        .login-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 70px 28px;
          background:
            radial-gradient(
              circle at 50% 35%,
              rgba(39, 122, 68, 0.09),
              transparent 46%
            ),
            #f7faf7;
          color: #17351f;
        }

        .login-card {
          position: relative;
          width: min(100%, 560px);
          overflow: hidden;
          border: 1px solid #d8e5da;
          border-radius: 30px;
          background: #ffffff;
          box-shadow:
            0 28px 80px rgba(29, 78, 42, 0.11),
            0 6px 20px rgba(29, 78, 42, 0.05);
        }

        .login-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 50%;
          width: 110px;
          height: 4px;
          transform: translateX(-50%);
          border-radius: 0 0 8px 8px;
          background: #277a44;
        }

        .login-card-glow {
          position: absolute;
          width: 230px;
          height: 230px;
          top: -120px;
          right: -110px;
          border-radius: 50%;
          background: rgba(39, 122, 68, 0.055);
          pointer-events: none;
        }

        .login-content {
          position: relative;
          z-index: 1;
          padding: 76px 68px 52px;
        }

        .login-logo {
          width: 76px;
          height: 76px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 30px;
          border-radius: 22px;
          background: #277a44;
          color: #ffffff;
          box-shadow:
            0 0 0 9px rgba(39, 122, 68, 0.07),
            0 14px 30px rgba(39, 122, 68, 0.16);
        }

        .login-logo span {
          font-family: "IBM Plex Serif", serif;
          font-size: 40px;
          font-weight: 700;
          line-height: 1;
        }

        .login-heading {
          text-align: center;
        }

        .login-heading h1 {
          margin: 0;
          color: #17351f;
          font-family: "IBM Plex Serif", serif;
          font-size: clamp(38px, 7vw, 48px);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -1px;
        }

        .login-heading p {
          max-width: 390px;
          margin: 20px auto 46px;
          color: #68766c;
          font-family: "Modern Antiqua", serif;
          font-size: 16px;
          line-height: 1.75;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .login-field {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .login-field > span {
          color: #31553c;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          font-weight: 600;
        }

        .login-input {
          width: 100%;
          min-height: 62px;
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 0 17px;
          border: 1px solid #d1dfd4;
          border-radius: 15px;
          background: #f5f9f5;
          color: #438052;
          transition:
            border-color 180ms ease,
            background 180ms ease,
            box-shadow 180ms ease;
        }

        .login-input:focus-within {
          border-color: #277a44;
          background: #ffffff;
          box-shadow:
            0 0 0 4px rgba(39, 122, 68, 0.09);
        }

        .login-input svg {
          flex-shrink: 0;
        }

        .login-input input {
          width: 100%;
          min-width: 0;
          height: 100%;
          padding: 0;
          border: 0;
          outline: 0;
          background: transparent;
          color: #17351f;
          font-family: "Modern Antiqua", serif;
          font-size: 15px;
        }

        .login-input input::placeholder {
          color: #8a978e;
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
          color: #6c7c70;
          transition:
            background 160ms ease,
            color 160ms ease;
        }

        .password-toggle:hover {
          background: rgba(39, 122, 68, 0.08);
          color: #277a44;
        }

        .login-options {
          display: flex;
          justify-content: flex-end;
          margin-top: -4px;
        }

        .login-options a {
          color: #277a44;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          font-weight: 600;
        }

        .login-options a:hover {
          color: #173d28;
        }

        .auth-error {
          margin: -4px 0 0;
          color: #b64444;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          line-height: 1.5;
          text-align: center;
        }

        .login-submit {
          width: 100%;
          min-height: 64px;
          margin-top: 6px;
          border: 1px solid #277a44;
          border-radius: 16px;
          background: #277a44;
          color: #ffffff;
          font-family: "Modern Antiqua", serif;
          font-size: 16px;
          font-weight: 600;
          transition:
            transform 180ms ease,
            background 180ms ease,
            box-shadow 180ms ease;
        }

        .login-submit:hover {
          transform: translateY(-2px);
          background: #216b3b;
          box-shadow:
            0 12px 28px rgba(39, 122, 68, 0.18);
        }

        .login-submit:active {
          transform: translateY(0);
        }

        .login-register {
          margin: 34px 0 0;
          color: #718078;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          line-height: 1.7;
          text-align: center;
        }

        .login-register a {
          color: #277a44;
          font-weight: 700;
        }

        .login-register a:hover {
          color: #173d28;
        }

        .login-divider {
          width: 100%;
          height: 1px;
          margin: 34px 0 24px;
          background: #dfe8e1;
        }

        .login-terms {
          max-width: 390px;
          margin: 0 auto;
          color: #87948a;
          font-family: "Modern Antiqua", serif;
          font-size: 12px;
          line-height: 1.8;
          text-align: center;
        }

        .login-footer {
          display: flex;
          justify-content: center;
          gap: 28px;
          padding: 20px 24px;
          border-top: 1px solid #e1e9e2;
          background: #f8fbf8;
          color: #718078;
          font-family: "Modern Antiqua", serif;
          font-size: 12px;
        }

        .login-footer span {
          position: relative;
        }

        .login-footer span:not(:last-child)::after {
          content: "";
          position: absolute;
          top: 50%;
          right: -15px;
          width: 3px;
          height: 3px;
          transform: translateY(-50%);
          border-radius: 50%;
          background: #8ca193;
        }

        @media (max-width: 600px) {
          .login-page {
            padding: 36px 16px;
          }

          .login-content {
            padding: 60px 28px 44px;
          }

          .login-heading h1 {
            font-size: 38px;
          }

          .login-footer {
            gap: 20px;
          }

          .login-footer span:not(:last-child)::after {
            right: -11px;
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
            padding: 52px 20px 38px;
          }

          .login-heading p {
            margin-bottom: 38px;
          }

          .login-footer {
            gap: 12px;
            font-size: 11px;
          }

          .login-footer span:not(:last-child)::after {
            right: -7px;
          }
        }

        [data-theme="dark"] .login-page {
          background:
            radial-gradient(
              circle at 50% 35%,
              rgba(74, 222, 128, 0.08),
              transparent 46%
            ),
            #0f1410;
          color: #e8f0e9;
        }

        [data-theme="dark"] .login-card {
          background: #1a211c;
          border-color: #2f3b32;
          box-shadow:
            0 28px 80px rgba(0, 0, 0, 0.3),
            0 6px 20px rgba(0, 0, 0, 0.15);
        }

        [data-theme="dark"] .login-card::before {
          background: #4ade80;
        }

        [data-theme="dark"] .login-heading h1 {
          color: #e8f0e9;
        }

        [data-theme="dark"] .login-heading p {
          color: #9aa89d;
        }

        [data-theme="dark"] .login-field > span {
          color: #9aa89d;
        }

        [data-theme="dark"] .login-input {
          background: #212922;
          border-color: #2f3b32;
          color: #e8f0e9;
        }

        [data-theme="dark"] .login-input input {
          color: #e8f0e9;
        }

        [data-theme="dark"] .login-input input::placeholder {
          color: #66776a;
        }

        [data-theme="dark"] .login-input:focus-within {
          border-color: #4ade80;
          background: #1a211c;
          box-shadow: 0 0 0 4px rgba(74, 222, 128, 0.1);
        }

        [data-theme="dark"] .password-toggle {
          color: #9aa89d;
        }

        [data-theme="dark"] .password-toggle:hover {
          background: rgba(74, 222, 128, 0.08);
          color: #4ade80;
        }

        [data-theme="dark"] .login-options a {
          color: #4ade80;
        }

        [data-theme="dark"] .auth-error {
          color: #f87171;
        }

        [data-theme="dark"] .login-submit {
          background: #277a44;
          border-color: #277a44;
        }

        [data-theme="dark"] .login-submit:hover {
          background: #216b3b;
        }

        [data-theme="dark"] .login-register {
          color: #9aa89d;
        }

        [data-theme="dark"] .login-register a {
          color: #4ade80;
        }

        [data-theme="dark"] .login-divider {
          background: #2f3b32;
        }

        [data-theme="dark"] .login-terms {
          color: #66776a;
        }

        [data-theme="dark"] .login-footer {
          background: #212922;
          border-top-color: #2f3b32;
          color: #9aa89d;
        }

        [data-theme="dark"] .login-footer span:not(:last-child)::after {
          background: #4ade80;
        }
      `}</style>

      <main className="login-page">
        <section className="login-card">
          <div className="login-card-glow" />

          <div className="login-content">
            <div className="login-logo">
              <span>F</span>
            </div>

            <div className="login-heading">
              <h1>Welcome back</h1>
              <p>
                Log in to manage your farm or your orders.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <label className="login-field">
                <span>Email</span>

                <div className="login-input">
                  <Mail size={19} />

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
                  <Lock size={19} />

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
                      showPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
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
                <p className="auth-error">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="login-submit"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Log in'}
              </button>
            </form>

              <p className="login-register">
                New to Farmart?{' '}
                <Link to="/register">
                  Register
                </Link>
              </p>

              <div className="login-divider" />

              <div style={{ maxWidth: 390, margin: "0 auto", color: "#87948a", fontFamily: "Modern Antiqua, serif", fontSize: 12, lineHeight: 1.8, textAlign: "center" }}>
                <p style={{ margin: "0 0 10px", fontWeight: 600 }}>Demo accounts</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
                  {demoAccounts.map((acct) => (
                    <button key={acct.email} type="button" onClick={() => fillDemo(acct.email, acct.password)} style={{ background: "transparent", border: "none", color: "#277a44", fontWeight: 600, cursor: "pointer", fontSize: 12, fontFamily: "Modern Antiqua, serif", padding: 0 }}>
                      {acct.label}: {acct.email} / {acct.password}
                    </button>
                  ))}
                </div>
              </div>

              <p className="login-terms">
                By continuing you agree to Farmart's Terms and
                Conditions of service &amp; Fair-Trade Policy
              </p>
          </div>

          <div className="login-footer">
            <span>Secure</span>
            <span>Verified</span>
            <span>Fair Trade</span>
          </div>
        </section>
      </main>
    </>
  )
}

export default Login
