import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaGoogle,
} from 'react-icons/fa'

function Register() {
  const navigate = useNavigate()
  const location = useLocation()

  const selectedRole = location.state?.role || ''

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
      !formData.name.trim() ||
      !formData.email.trim() ||
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

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        'http://localhost:5000/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
            role: selectedRole,
          }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        setError(
          data.error ||
            'Unable to create your Farmart account.',
        )
        return
      }

      /*
       * The Flask backend has already created the account
       * and established the session.
       *
       * We do NOT create a fake localStorage account here.
       */

      if (selectedRole === 'farmer') {
        navigate('/farm-setup')
        return
      }

      if (selectedRole === 'buyer') {
        navigate('/buyer/marketplace')
        return
      }
    } catch (error) {
      console.error('Registration error:', error)

      setError(
        'Unable to connect to the Farmart server.',
      )
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleRegister = () => {
    if (!selectedRole) {
      setError('Please select a registration role first.')
      return
    }

    if (selectedRole === 'admin') {
      setError('Administrator accounts cannot be created here.')
      return
    }

    window.location.href =
    `http://localhost:5000/auth/google?role=${selectedRole}`
  }

  const roleLabel =
    selectedRole === 'farmer'
      ? 'Farmer'
      : selectedRole === 'buyer'
        ? 'Buyer'
        : 'Farmart'

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

  .register-logo {
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

  .register-logo img {
    width: 100%;
    height: 100px;
    object-fit: contain;
  }

  .register-heading {
    text-align: center;
  }

  .register-heading h1 {
    margin: 0;

    color: var(--farm-text);

    font-family: "IBM Plex Serif", serif;
    font-size: clamp(36px, 7vw, 47px);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -1px;
  }

  .register-heading p {
    max-width: 410px;
    margin: 18px auto 38px;

    color: var(--farm-muted);

    font-family: "Modern Antiqua", serif;
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

    font-family: "Modern Antiqua", serif;
    font-size: 13px;
    font-weight: 600;
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

    font-family: "Modern Antiqua", serif;
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

    font-family: "Modern Antiqua", serif;
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

    font-family: "Modern Antiqua", serif;
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
    cursor: not-allowed;
    opacity: 0.65;
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

    cursor: pointer;

    transition:
      background 180ms ease,
      box-shadow 180ms ease;
  }

  .google-button:hover {
    box-shadow: 0 10px 24px rgba(66, 133, 244, 0.25);
  }

  .google-note {
    margin: -8px 0 0;

    color: var(--farm-muted);

    font-family: "Modern Antiqua", serif;
    font-size: 12px;
    text-align: center;
  }

  .register-switch {
    margin: 30px 0 0;

    color: var(--farm-muted);

    font-family: "Modern Antiqua", serif;
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

    font-family: "Modern Antiqua", serif;
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

  [data-theme="dark"] {
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

    .register-logo {
      min-height: 82px;
      padding: 10px 18px;
    }

    .register-logo img {
      height: 82px;
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
        <section className="register-card">
          <div className="register-content">

            <div className="register-logo">
              <img
                src="/logo/farmart_full_logo_testing.png"
                alt="Farmart"
              />
            </div>

            <div className="register-heading">
              <h1>Create your account</h1>

              <p>
                Join Farmart and connect directly with farmers,
                buyers and the livestock marketplace.
              </p>
            </div>

            {selectedRole && (
              <div className="register-role">
                Registering as {roleLabel}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="register-form"
            >

              <div className="register-field">
                <label htmlFor="name">
                  Full name
                </label>

                <div className="register-input">
                  <FaUser size={17} />

                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="register-field">
                <label htmlFor="email">
                  Email address
                </label>

                <div className="register-input">
                  <FaEnvelope size={17} />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="register-field">
                <label htmlFor="password">
                  Create password
                </label>

                <div className="register-input">
                  <FaLock size={17} />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    disabled={loading}
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
                    disabled={loading}
                  >
                    {showPassword ? (
                      <FaEyeSlash size={17} />
                    ) : (
                      <FaEye size={17} />
                    )}
                  </button>
                </div>
              </div>

              <div className="register-field">
                <label htmlFor="confirmPassword">
                  Confirm password
                </label>

                <div className="register-input">
                  <FaLock size={17} />

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
                    disabled={loading}
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
                    disabled={loading}
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash size={17} />
                    ) : (
                      <FaEye size={17} />
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
                {loading
                  ? 'Creating account...'
                  : 'Create account'}
              </button>

              <button
                type="button"
                className="google-button"
                onClick={handleGoogleRegister}
                disabled={loading}
              >
                <FaGoogle size={17} />
                Continue with Google
              </button>

              <p className="google-note">
                Continue securely with your Google account.
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

          </div>
        </section>
      </main>
    </>
  )
}

export default Register
