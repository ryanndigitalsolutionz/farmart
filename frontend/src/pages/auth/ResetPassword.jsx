import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi'
import { FaShieldAlt } from 'react-icons/fa'

function ResetPassword() {
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const savedEmail = sessionStorage.getItem(
      'farmartResetEmail',
    )

    const verified = sessionStorage.getItem(
      'farmartEmailVerified',
    )

    if (!savedEmail || verified !== 'true') {
      navigate('/forgot-password', {
        replace: true,
      })
    }
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!password || !confirmPassword) {
      setError('Please enter your new password.')
      return
    }

    if (password.length < 8) {
      setError(
        'Your password must be at least 8 characters.',
      )
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        'http://localhost:5000/auth/reset-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            password,
          }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        setError(
          data.error ||
          'Unable to reset your password.',
        )
        return
      }

      sessionStorage.removeItem(
        'farmartResetEmail',
      )

      sessionStorage.removeItem(
        'farmartEmailVerified',
      )

      navigate('/login', {
        replace: true,
        state: {
          message: 'Your password has been reset successfully.',
        },
      })
    } catch (error) {
      console.error(
        'Reset password error:',
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
  .reset-page {
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

  .reset-card {
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

  .reset-card::before {
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

  .reset-content {
    position: relative;
    z-index: 1;

    display: flex;
    flex-direction: column;
    align-items: center;

    text-align: center;
  }

  .reset-icon {
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

  .reset-heading h1 {
    margin: 0;

    color: var(--farm-text);

    font-family: "IBM Plex Serif", serif;
    font-size: clamp(36px, 6vw, 46px);
    font-weight: 700;
    line-height: 1.1;
  }

  .reset-heading p {
    max-width: 390px;
    margin: 18px auto 38px;

    color: var(--farm-muted);

    font-family: "Modern Antiqua", serif;
    font-size: 16px;
    line-height: 1.7;
  }

  .reset-form {
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .reset-field {
    width: 100%;
    text-align: left;
  }

  .reset-field > span {
    display: block;
    margin-bottom: 9px;

    color: var(--farm-text);

    font-family: "Modern Antiqua", serif;
    font-size: 14px;
  }

  .reset-input {
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

  .reset-input:focus-within {
    border-color: var(--farm-green);
    background: var(--auth-input-focus);

    box-shadow:
      0 0 0 4px var(--farm-green-glow);
  }

  .reset-input input {
    width: 100%;
    min-width: 0;
    height: 100%;

    padding: 0;

    border: none;
    outline: none;

    background: transparent;
    color: var(--farm-text);

    font-family: "Modern Antiqua", serif;
    font-size: 15px;
  }

  .reset-input input::placeholder {
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

    border: none;
    border-radius: 8px;

    background: transparent;
    color: var(--farm-muted);

    cursor: pointer;

    transition:
      color 180ms ease,
      background 180ms ease;
  }

  .password-toggle:hover {
    color: var(--farm-green);
    background: var(--farm-green-glow);
  }

  .reset-security {
    display: flex;
    align-items: center;
    gap: 8px;

    margin: 2px 0;

    color: var(--farm-muted);

    font-family: "Modern Antiqua", serif;
    font-size: 13px;
  }

  .reset-security svg {
    color: var(--farm-green);
    flex-shrink: 0;
  }

  .reset-error {
    margin: 0;

    color: var(--farm-error);

    font-family: "Modern Antiqua", serif;
    font-size: 13px;
  }

  .reset-submit {
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

  .reset-submit:hover:not(:disabled) {
    background: #236b3d;
    box-shadow: 0 10px 24px var(--farm-green-glow);
  }

  .reset-submit:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .reset-back {
    margin: 28px 0 0;

    font-family: "Modern Antiqua", serif;
    font-size: 14px;
  }

  .reset-back a {
    color: var(--farm-muted);
  }

  .reset-back a:hover {
    color: var(--farm-green);
  }

  @media (max-width: 600px) {
    .reset-page {
      padding: 28px 16px;
    }

    .reset-card {
      padding: 48px 28px 40px;
      border-radius: 24px;
    }
  }

  @media (max-width: 430px) {
    .reset-page {
      padding: 16px;
    }

    .reset-card {
      padding: 42px 22px 34px;
    }
  }
`}</style>

      <main className="reset-page">
        <section className="reset-card">
          <div className="reset-content">

            <div className="login-logo">
              <img
                src="/logo/farmart_full_logo_testing.png"
                alt="Farmart"
              />
            </div>

            <div className="reset-icon">
              <FiLock size={23} />
            </div>

            <div className="reset-heading">
              <h1>Reset password</h1>

              <p>
                Create a new password for your Farmart account.
                Make it something secure and memorable.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="reset-form"
            >
              <label className="reset-field">
                <span>New password</span>

                <div className="reset-input">
                  <FiLock size={19} />

                  <input
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    placeholder="Create a new password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    autoComplete="new-password"
                    disabled={loading}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(
                        !showPassword,
                      )
                    }
                    aria-label={
                      showPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
              </label>

              <label className="reset-field">
                <span>Confirm new password</span>

                <div className="reset-input">
                  <FiLock size={19} />

                  <input
                    type={
                      showConfirmPassword
                        ? 'text'
                        : 'password'
                    }
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value,
                      )
                    }
                    autoComplete="new-password"
                    disabled={loading}
                  />

                  <button
                    type="button"
                    className="password-toggle"
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
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
              </label>

              <div className="reset-security">
                <FaShieldAlt size={17} />

                <span>
                  Your new password must be at least
                  8 characters.
                </span>
              </div>

              {error && (
                <p className="reset-error">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="reset-submit"
                disabled={loading}
              >
                {loading
                  ? 'Resetting password...'
                  : 'Reset Password'}

                {!loading && (
                  <FiArrowRight size={18} />
                )}
              </button>
            </form>

            <p className="reset-back">
              <Link to="/login">
                Back to login
              </Link>
            </p>

          </div>
        </section>
      </main>
    </>
  )
}

export default ResetPassword
