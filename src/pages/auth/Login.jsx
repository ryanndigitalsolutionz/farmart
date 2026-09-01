import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
} from 'react-icons/fa'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()

  const selectedRole = location.state?.role || 'farmer'

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

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!formData.email || !formData.password) {
      setError('Please enter your email and password.')
      return
    }

    localStorage.setItem(
      'farmartUser',
      JSON.stringify({
        email: formData.email,
        role: selectedRole,
        isLoggedIn: true,
      }),
    )

    if (selectedRole === 'farmer') {
      navigate('/farm-setup')
    } else if (selectedRole === 'buyer') {
      navigate('/buyer/marketplace')
    } else if (selectedRole === 'admin') {
      navigate('/admin/dashboard')
    }
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

.login-logo {
  width: min(100%, 300px);
  min-height: 100px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 14px 22px;
  margin: 0 auto 30px;

  border: 1px solid var(--farm-green-border);
  border-radius: 20px;

  background: var(--auth-logo-bg);
}

.login-logo img {
  width: 100%;
  height: 100px;
  object-fit: contain;
}

  .login-heading {
    text-align: center;
  }

  .login-heading h1 {
    margin: 0;

    color: var(--farm-text);

    font-family: "IBM Plex Serif", serif;
    font-size: clamp(38px, 7vw, 48px);
    font-weight: 700;
    line-height: 1.08;
    letter-spacing: -1px;
  }

  .login-heading p {
    max-width: 390px;
    margin: 18px auto 38px;

    color: var(--farm-muted);

    font-family: "Modern Antiqua", serif;
    font-size: 16px;
    line-height: 1.75;
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
    font-family: "Modern Antiqua", serif;
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

    font-family: "Modern Antiqua", serif;
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

    font-family: "Modern Antiqua", serif;
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

    font-family: "Modern Antiqua", serif;
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

    font-family: "Modern Antiqua", serif;
    font-size: 16px;
    font-weight: 600;

    cursor: pointer;

    transition:
      background 180ms ease,
      box-shadow 180ms ease;
  }

  .login-submit:hover {
    background: #216b3b;
    box-shadow: 0 12px 28px var(--farm-green-glow);
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

    font-family: "Modern Antiqua", serif;
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

    font-family: "Modern Antiqua", serif;
    font-size: 12px;
    text-align: center;
  }

  .login-register {
    margin: 30px 0 0;

    color: var(--farm-muted);

    font-family: "Modern Antiqua", serif;
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

    font-family: "Modern Antiqua", serif;
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

    font-family: "Modern Antiqua", serif;
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

  [data-theme="dark"] {
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

    .login-logo {
      min-height: 82px;
      padding: 10px 18px;
    }

    .login-logo img {
      height: 82px;
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
        <section className="login-card">
          <div className="login-content">

            <div className="login-logo">
              <img
                src="/logo/farmart_full_logo_testing.png"
                alt="Farmart"
              />
            </div>

            <div className="login-heading">
              <h1>Welcome back</h1>

              <p>
                Log in to manage your farm, browse livestock,
                and keep track of your orders.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">

              <label className="login-field">
                <span>Email</span>

                <div className="login-input">
                  <FaEnvelope size={17} />

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
                  <FaLock size={17} />

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
                      <FaEyeSlash size={17} />
                    ) : (
                      <FaEye size={17} />
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
              >
                Log in
              </button>

              <button
                type="button"
                className="google-button"
                disabled
              >
                <FaGoogle size={17} />
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
                Register
              </Link>
            </p>

            <div className="login-divider" />

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