// ForgotPassword.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiArrowRight } from 'react-icons/fi'

function ForgotPassword() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    const normalizedEmail = email.trim().toLowerCase()

    if (!normalizedEmail) {
      setError('Please enter your email address.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/forgot-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            email: normalizedEmail,
          }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        setError(
          data.error ||
          'Unable to send the verification code.',
        )
        return
      }

      sessionStorage.setItem(
        'farmartResetEmail',
        normalizedEmail,
      )

      sessionStorage.removeItem(
        'farmartEmailVerified',
      )

      navigate('/verify-email')
    } catch (error) {
      console.error(
        'Forgot password error:',
        error,
      )

      setError(
        'Unable to connect to the Farmart server.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
<style>{`
  .forgot-page {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 24px;
    box-sizing: border-box;

    background:
      radial-gradient(
        circle at 50% 35%,
        rgba(39, 122, 68, 0.11),
        transparent 43%
      ),
      var(--farm-background);

    color: var(--farm-text);
    transition: background 180ms ease, color 180ms ease;
  }

  .forgot-card {
    width: min(100%, 520px);
    padding: 58px 56px 48px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;

    border: 1px solid var(--farm-green-border);
    border-radius: 28px;

    background: var(--auth-card);

    box-shadow:
      0 24px 70px var(--farm-green-glow),
      0 4px 16px var(--farm-green-glow);
  }

  .forgot-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 110px;
    height: 4px;
    transform: translateX(-50%);

    background: var(--farm-green);
    border-radius: 0 0 8px 8px;
  }

  .forgot-content {
    position: relative;
    z-index: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .forgot-heading h1 {
    margin: 0;

    color: var(--farm-text);

    font-family: "IBM Plex Serif", serif;
    font-size: clamp(36px, 6vw, 46px);
    font-weight: 700;
    line-height: 1.1;
  }

  .forgot-heading p {
    max-width: 390px;
    margin: 18px auto 40px;

    color: var(--farm-muted);

    font-family: "Modern Antiqua", serif;
    font-size: 16px;
    line-height: 1.7;
  }

  .forgot-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .forgot-field {
    width: 100%;
    text-align: left;
  }

  .forgot-field > span {
    display: block;
    margin-bottom: 9px;

    color: var(--farm-text);

    font-family: "Modern Antiqua", serif;
    font-size: 14px;
  }

  .forgot-input {
    width: 100%;
    height: 60px;

    display: flex;
    align-items: center;
    gap: 12px;

    padding: 0 17px;
    box-sizing: border-box;

    border: 1px solid var(--farm-green-border);
    border-radius: 14px;

    background: var(--auth-input);
    color: var(--farm-green);

    transition:
      border-color 180ms ease,
      background 180ms ease,
      box-shadow 180ms ease;
  }

  .forgot-input:focus-within {
    border-color: var(--farm-green);
    background: var(--auth-input-focus);

    box-shadow:
      0 0 0 4px var(--farm-green-glow);
  }

  .forgot-input input {
    width: 100%;
    min-width: 0;
    height: 100%;

    border: none;
    outline: none;

    background: transparent;
    color: var(--farm-text);

    font-family: "Modern Antiqua", serif;
    font-size: 15px;
  }

  .forgot-input input::placeholder {
    color: var(--farm-muted);
  }

  .forgot-error {
    margin: 0;

    color: var(--farm-error);

    font-family: "Modern Antiqua", serif;
    font-size: 13px;
  }

  .forgot-submit {
    width: 100%;
    height: 60px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    margin-top: 6px;

    border: 1px solid var(--farm-green);
    border-radius: 14px;

    background: var(--farm-green);
    color: #ffffff;

    font-family: "Modern Antiqua", serif;
    font-size: 15px;
    font-weight: 600;

    cursor: pointer;

    transition:
      transform 180ms ease,
      background 180ms ease,
      box-shadow 180ms ease,
      opacity 180ms ease;
  }

  .forgot-submit:hover:not(:disabled) {
    background: #236b3d;
    box-shadow: 0 10px 24px var(--farm-green-glow);
  }

  .forgot-submit:active {
    transform: translateY(0);
  }

  .forgot-submit:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .forgot-switch {
    margin: 30px 0 0;

    color: var(--farm-muted);

    font-family: "Modern Antiqua", serif;
    font-size: 14px;
  }

  .forgot-switch a {
    color: var(--farm-green);
    font-weight: 600;
  }

  .forgot-switch a:hover {
    color: var(--farm-text);
  }

  @media (max-width: 600px) {
    .forgot-page {
      padding: 28px 16px;
    }

    .forgot-card {
      padding: 48px 28px 40px;
      border-radius: 24px;
    }
  }

  @media (max-width: 430px) {
    .forgot-page {
      padding: 16px;
    }

    .forgot-card {
      padding: 42px 22px 34px;
    }
  }
`}</style>

      <main className="forgot-page">
        <section className="forgot-card">
          <div className="forgot-content">

            <div className="login-logo">
              <img
                src="/logo/farmart_full_logo_testing.png"
                alt="Farmart"
              />
            </div>

            <div className="forgot-heading">
              <h1>Forgot password?</h1>

              <p>
                Enter your email address and we'll guide you
                through securing your Farmart account again.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="forgot-form"
            >
              <label className="forgot-field">
                <span>Email address</span>

                <div className="forgot-input">
                  <FiMail size={19} />

                  <input
                    type="email"
                    placeholder="farmer@boranfarm.co.ke"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    autoComplete="email"
                    disabled={loading}
                  />
                </div>
              </label>

              {error && (
                <p className="forgot-error">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="forgot-submit"
                disabled={loading}
              >
                {loading
                  ? 'Sending code...'
                  : 'Continue'}

                {!loading && (
                  <FiArrowRight size={18} />
                )}
              </button>
            </form>

            <p className="forgot-switch">
              Remembered your password?{' '}
              <Link to="/login">
                Log in
              </Link>
            </p>

          </div>
        </section>
      </main>
    </>
  )
}

export default ForgotPassword
