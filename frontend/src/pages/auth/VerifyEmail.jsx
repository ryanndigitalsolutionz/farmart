// VerifyEmail.jsx
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiArrowRight } from 'react-icons/fi'

function VerifyEmail() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)

  useEffect(() => {
    const savedEmail = sessionStorage.getItem(
      'farmartResetEmail',
    )

    if (!savedEmail) {
      navigate('/forgot-password', {
        replace: true,
      })
      return
    }

    setEmail(savedEmail)
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const trimmedCode = code.trim()

    if (!trimmedCode) {
      setError('Please enter the verification code.')
      return
    }

    if (!/^\d{6}$/.test(trimmedCode)) {
      setError('Please enter the 6-digit verification code.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        'http://localhost:5000/auth/verify-password-reset-otp',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            email: email.trim(),
            otp: trimmedCode,
          }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        setError(
          data.error ||
          'Unable to verify the code.',
        )
        return
      }

      sessionStorage.setItem(
        'farmartEmailVerified',
        'true',
      )

      navigate('/reset-password')
    } catch (error) {
      console.error(
        'Email verification error:',
        error,
      )

      setError(
        'Unable to connect to the Farmart server.',
      )
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setError('')
    setCode('')
    setResending(true)

    try {
      const response = await fetch(
        'http://localhost:5000/auth/forgot-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            email: email.trim(),
          }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        setError(
          data.error ||
          'Unable to resend the verification code.',
        )
        return
      }
    } catch (error) {
      console.error(
        'Resend verification error:',
        error,
      )

      setError(
        'Unable to connect to the Farmart server.',
      )
    } finally {
      setResending(false)
    }
  }

  return (
    <>
      <style>{`
  .verify-page {
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
  }

  .verify-card {
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

  .verify-card::before {
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

  .verify-content {
    position: relative;
    z-index: 1;

    display: flex;
    flex-direction: column;
    align-items: center;

    text-align: center;
  }

  .verify-icon {
    width: 46px;
    height: 46px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-bottom: 20px;

    border-radius: 50%;

    background: var(--farm-green-soft);
    color: var(--farm-green);
  }

  .verify-heading h1 {
    margin: 0;

    color: var(--farm-text);

    font-family: "IBM Plex Serif", serif;
    font-size: clamp(34px, 6vw, 44px);
    font-weight: 700;
    line-height: 1.1;
  }

  .verify-heading p {
    max-width: 390px;
    margin: 18px auto 34px;

    color: var(--farm-muted);

    font-family: "Modern Antiqua", serif;
    font-size: 16px;
    line-height: 1.7;
  }

  .verify-email {
    margin: 0 0 28px;

    color: var(--farm-green);

    font-family: "Modern Antiqua", serif;
    font-size: 15px;
    font-weight: 600;

    overflow-wrap: anywhere;
  }

  .verify-form {
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .verify-field {
    width: 100%;
    text-align: left;
  }

  .verify-field > span {
    display: block;
    margin-bottom: 9px;

    color: var(--farm-text);

    font-family: "Modern Antiqua", serif;
    font-size: 14px;
  }

  .verify-input {
    width: 100%;
    height: 60px;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0 18px;
    box-sizing: border-box;

    border: 1px solid var(--farm-green-border);
    border-radius: 14px;

    background: var(--auth-input);

    transition:
      border-color 180ms ease,
      background 180ms ease,
      box-shadow 180ms ease;
  }

  .verify-input:focus-within {
    border-color: var(--farm-green);
    background: var(--auth-input-focus);

    box-shadow:
      0 0 0 4px var(--farm-green-glow);
  }

  .verify-input input {
    width: 100%;
    height: 100%;

    border: none;
    outline: none;

    background: transparent;
    color: var(--farm-text);

    font-family: "Modern Antiqua", serif;
    font-size: 22px;
    font-weight: 600;

    letter-spacing: 7px;
    text-align: center;
  }

  .verify-input input::placeholder {
    color: var(--farm-muted);
    letter-spacing: 6px;
  }

  .verify-error {
    margin: 0;

    color: var(--farm-error);

    font-family: "Modern Antiqua", serif;
    font-size: 13px;
  }

  .verify-submit {
    width: 100%;
    height: 60px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    margin-top: 4px;

    border: 1px solid var(--farm-green);
    border-radius: 14px;

    background: var(--farm-green);
    color: #ffffff;

    font-family: "Modern Antiqua", serif;
    font-size: 15px;
    font-weight: 600;

    cursor: pointer;

    transition:
      background 180ms ease,
      box-shadow 180ms ease,
      opacity 180ms ease;
  }

  .verify-submit:hover:not(:disabled) {
    background: #236b3d;
    box-shadow: 0 10px 24px var(--farm-green-glow);
  }

  .verify-submit:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .verify-resend {
    margin: 22px 0 0;

    color: var(--farm-muted);

    font-family: "Modern Antiqua", serif;
    font-size: 14px;
  }

  .verify-resend button {
    padding: 0;

    border: none;
    background: transparent;

    color: var(--farm-green);

    font-family: "Modern Antiqua", serif;
    font-size: inherit;
    font-weight: 600;

    cursor: pointer;
  }

  .verify-resend button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .verify-resend button:hover:not(:disabled) {
    color: var(--farm-text);
  }

  .verify-back {
    margin: 26px 0 0;

    font-family: "Modern Antiqua", serif;
    font-size: 14px;
  }

  .verify-back a {
    color: var(--farm-muted);
  }

  .verify-back a:hover {
    color: var(--farm-green);
  }

  @media (max-width: 600px) {
    .verify-page {
      padding: 28px 16px;
    }

    .verify-card {
      padding: 48px 28px 40px;
      border-radius: 24px;
    }
  }

  @media (max-width: 430px) {
    .verify-page {
      padding: 16px;
    }

    .verify-card {
      padding: 42px 22px 34px;
    }
  }
`}</style>

      <main className="verify-page">
        <section className="verify-card">
          <div className="verify-content">
            <div className="login-logo">
              <img
                src="/favicon/farm.png"
                alt="Farmart"
              />
            </div>

            <div className="verify-icon">
              <FiMail size={24} />
            </div>

            <div className="verify-heading">
              <h1>Verify your email</h1>

              <p>
                Enter the verification code we sent to your email
                address to continue resetting your password.
              </p>
            </div>

            <p className="verify-email">
              {email}
            </p>

            <form
              onSubmit={handleSubmit}
              className="verify-form"
            >
              <label className="verify-field">
                <span>Verification code</span>

                <div className="verify-input">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength="6"
                    placeholder="000000"
                    value={code}
                    onChange={(e) =>
                      setCode(
                        e.target.value.replace(/\D/g, ''),
                      )
                    }
                    autoComplete="one-time-code"
                    disabled={loading}
                  />
                </div>
              </label>

              {error && (
                <p className="verify-error">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="verify-submit"
                disabled={loading}
              >
                {loading
                  ? 'Verifying...'
                  : 'Verify & continue'}

                {!loading && (
                  <FiArrowRight size={18} />
                )}
              </button>
            </form>

            <p className="verify-resend">
              Didn't receive a code?{' '}
              <button
                type="button"
                onClick={handleResend}
                disabled={resending || loading}
              >
                {resending
                  ? 'Sending...'
                  : 'Resend code'}
              </button>
            </p>

            <p className="verify-back">
              <Link to="/forgot-password">
                Change email address
              </Link>
            </p>
          </div>
        </section>
      </main>
    </>
  )
}

export default VerifyEmail
