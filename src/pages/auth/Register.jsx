import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

function Register() {
  const navigate = useNavigate()
  const location = useLocation()
  const { register, loading } = useAuth()

  const roleFromState = location.state?.role || null

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: roleFromState || 'farmer',
    phone: '',
    location: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
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

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please complete all fields.')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      const user = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone,
        location: formData.location,
      })

      if (user.role === 'farmer') {
        navigate('/farm-setup')
      } else if (user.role === 'buyer') {
        navigate('/buyer')
      } else {
        navigate('/')
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    }
  }

  return (
    <>
      <style>{`
        .register-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 70px 28px;
          background:
            radial-gradient(
              circle at 50% 32%,
              rgba(39, 122, 68, 0.09),
              transparent 46%
            ),
            #f7faf7;
          color: #17351f;
        }

        .register-card {
          position: relative;
          width: min(100%, 570px);
          overflow: hidden;
          border: 1px solid #d8e5da;
          border-radius: 30px;
          background: #ffffff;
          box-shadow:
            0 28px 80px rgba(29, 78, 42, 0.11),
            0 6px 20px rgba(29, 78, 42, 0.05);
        }

        .register-card::before {
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

        .register-content {
          position: relative;
          z-index: 1;
          padding: 76px 68px 54px;
        }

        .register-logo {
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

        .register-logo span {
          font-family: "IBM Plex Serif", serif;
          font-size: 40px;
          font-weight: 700;
          line-height: 1;
        }

        .register-heading {
          text-align: center;
        }

        .register-heading h1 {
          margin: 0;
          color: #17351f;
          font-family: "IBM Plex Serif", serif;
          font-size: clamp(36px, 7vw, 47px);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -1px;
        }

        .register-heading p {
          max-width: 410px;
          margin: 20px auto 44px;
          color: #68766c;
          font-family: "Modern Antiqua", serif;
          font-size: 16px;
          line-height: 1.75;
        }

        .register-form {
          display: flex;
          flex-direction: column;
          gap: 21px;
        }

        .register-field {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .register-field > label {
          color: #31553c;
          font-family: "Modern Antiqua", serif;
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
          border: 1px solid #d1dfd4;
          border-radius: 15px;
          background: #f5f9f5;
          color: #438052;
          transition:
            border-color 180ms ease,
            background 180ms ease,
            box-shadow 180ms ease;
        }

        .register-input:focus-within {
          border-color: #277a44;
          background: #ffffff;
          box-shadow:
            0 0 0 4px rgba(39, 122, 68, 0.09);
        }

        .register-input svg {
          flex-shrink: 0;
        }

        .register-input input {
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

        .register-input input::placeholder {
          color: #8a978e;
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
          color: #6c7c70;
          transition:
            background 160ms ease,
            color 160ms ease;
        }

        .register-password-toggle:hover {
          background: rgba(39, 122, 68, 0.08);
          color: #277a44;
        }

        .register-error {
          margin: -2px 0 0;
          color: #b64444;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          line-height: 1.5;
          text-align: center;
        }

        .register-submit {
          width: 100%;
          min-height: 64px;
          margin-top: 7px;
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

        .register-submit:hover {
          transform: translateY(-2px);
          background: #216b3b;
          box-shadow:
            0 12px 28px rgba(39, 122, 68, 0.18);
        }

        .register-submit:active {
          transform: translateY(0);
        }

        .register-switch {
          margin: 34px 0 0;
          color: #718078;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          line-height: 1.7;
          text-align: center;
        }

        .register-switch a {
          color: #277a44;
          font-weight: 700;
        }

        .register-switch a:hover {
          color: #173d28;
        }

        .register-divider {
          width: 100%;
          height: 1px;
          margin: 34px 0 24px;
          background: #dfe8e1;
        }

        .register-terms {
          max-width: 410px;
          margin: 0 auto;
          color: #87948a;
          font-family: "Modern Antiqua", serif;
          font-size: 12px;
          line-height: 1.8;
          text-align: center;
        }

        @media (max-width: 600px) {
          .register-page {
            padding: 36px 16px;
          }

          .register-content {
            padding: 60px 28px 44px;
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
            padding: 52px 20px 38px;
          }

          .register-heading p {
            margin-bottom: 36px;
          }
        }

        [data-theme="dark"] .register-page {
          background:
            radial-gradient(
              circle at 50% 32%,
              rgba(74, 222, 128, 0.08),
              transparent 46%
            ),
            #0f1410;
          color: #e8f0e9;
        }

        [data-theme="dark"] .register-card {
          background: #1a211c;
          border-color: #2f3b32;
          box-shadow:
            0 28px 80px rgba(0, 0, 0, 0.3),
            0 6px 20px rgba(0, 0, 0, 0.15);
        }

        [data-theme="dark"] .register-card::before {
          background: #4ade80;
        }

        [data-theme="dark"] .register-heading h1 {
          color: #e8f0e9;
        }

        [data-theme="dark"] .register-heading p {
          color: #9aa89d;
        }

        [data-theme="dark"] .register-field > label {
          color: #9aa89d;
        }

        [data-theme="dark"] .register-input {
          background: #212922;
          border-color: #2f3b32;
          color: #e8f0e9;
        }

        [data-theme="dark"] .register-input input {
          color: #e8f0e9;
        }

        [data-theme="dark"] .register-input input::placeholder {
          color: #66776a;
        }

        [data-theme="dark"] .register-input:focus-within {
          border-color: #4ade80;
          background: #1a211c;
          box-shadow: 0 0 0 4px rgba(74, 222, 128, 0.1);
        }

        [data-theme="dark"] .register-password-toggle {
          color: #9aa89d;
        }

        [data-theme="dark"] .register-password-toggle:hover {
          background: rgba(74, 222, 128, 0.08);
          color: #4ade80;
        }

        [data-theme="dark"] .register-error {
          color: #f87171;
        }

        [data-theme="dark"] .register-submit {
          background: #277a44;
          border-color: #277a44;
        }

        [data-theme="dark"] .register-submit:hover {
          background: #216b3b;
        }

        [data-theme="dark"] .register-switch {
          color: #9aa89d;
        }

        [data-theme="dark"] .register-switch a {
          color: #4ade80;
        }

        [data-theme="dark"] .register-divider {
          background: #2f3b32;
        }

        [data-theme="dark"] .register-terms {
          color: #66776a;
        }
      `}</style>

      <main className="register-page">
        <section className="register-card">
          <div className="register-content">
            <div className="register-logo">
              <span>F</span>
            </div>

            <div className="register-heading">
              <h1>Create your account</h1>

              <p>
                Join Farmart and connect directly with buyers and farmers.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="register-form">
              <div className="register-field">
                <label htmlFor="name">Full name</label>

                <div className="register-input">
                  <User size={18} />

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
                <label htmlFor="role">I want to</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  style={{ width: "100%", minHeight: 61, padding: "0 17px", borderRadius: 15, border: "1px solid #d1dfd4", background: "#f5f9f5", color: "#17351f", fontSize: 15, fontFamily: "Modern Antiqua, serif" }}
                >
                  <option value="farmer">Sell livestock as a farmer</option>
                  <option value="buyer">Buy livestock as a buyer</option>
                </select>
              </div>

              {formData.role === 'farmer' && (
                <>
                  <div className="register-field">
                    <label htmlFor="phone">Phone number</label>
                    <div className="register-input">
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        placeholder="e.g. 0712 345 678"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="register-field">
                    <label htmlFor="location">Farm location</label>
                    <div className="register-input">
                      <input
                        id="location"
                        type="text"
                        name="location"
                        placeholder="e.g. Kiambu County"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="register-field">
                <label htmlFor="email">Email address</label>

                <div className="register-input">
                  <Mail size={18} />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="farmer@boranfarm.co.ke"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="register-field">
                <label htmlFor="password">Create password</label>

                <div className="register-input">
                  <Lock size={18} />

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
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className="register-field">
                <label htmlFor="confirmPassword">
                  Confirm password
                </label>

                <div className="register-input">
                  <Lock size={18} />

                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
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
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    aria-label={
                      showConfirmPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <p className="register-error">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="register-submit"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </form>

            <p className="register-switch">
              Already have an account?{' '}
              <Link to="/login">
                Log in
              </Link>
            </p>

              <div className="login-divider" />

              <div style={{ maxWidth: 410, margin: "0 auto", color: "#87948a", fontFamily: "Modern Antiqua, serif", fontSize: 12, lineHeight: 1.8, textAlign: "center" }}>
                <p style={{ margin: "0 0 10px", fontWeight: 600 }}>Quick demo accounts</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
                  <span style={{ color: "#277a44", fontWeight: 600 }}>Farmer: jomo@greenpastures.co.ke / demo1234</span>
                  <span style={{ color: "#277a44", fontWeight: 600 }}>Buyer: amina@example.com / demo1234</span>
                  <span style={{ color: "#277a44", fontWeight: 600 }}>Admin: admin@farmart.co.ke / admin123</span>
                </div>
              </div>

              <p className="register-terms">
                By creating an account you agree to Farmart's Terms
                and Conditions of service &amp; Fair-Trade Policy
              </p>
          </div>
        </section>
      </main>
    </>
  )
}

export default Register
