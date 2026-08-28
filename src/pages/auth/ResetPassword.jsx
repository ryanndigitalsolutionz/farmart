import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react'

function ResetPassword() {
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!password || !confirmPassword) {
      setError('Please enter your new password.')
      return
    }

    if (password.length < 8) {
      setError('Your password must be at least 8 characters.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    sessionStorage.removeItem('farmartResetEmail')
    sessionStorage.removeItem('farmartEmailVerified')

    navigate('/login')
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
            #f7faf7;
          color: #17351f;
        }

        .reset-card {
          width: min(100%, 520px);
          padding: 58px 56px 48px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          border: 1px solid #d8e5da;
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.97);
          box-shadow:
            0 24px 70px rgba(29, 78, 42, 0.10),
            0 4px 16px rgba(29, 78, 42, 0.05);
        }

        .reset-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          width: 110px;
          height: 4px;
          background: #277a44;
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

        .reset-logo {
          width: 68px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          border-radius: 20px;
          background: #277a44;
          color: white;
          font-family: "IBM Plex Serif", serif;
          font-size: 36px;
          font-weight: 700;
          box-shadow:
            0 0 0 8px rgba(39, 122, 68, 0.07),
            0 10px 28px rgba(39, 122, 68, 0.16);
        }

        .reset-icon {
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          border-radius: 50%;
          background: #eef6ef;
          color: #277a44;
        }

        .reset-heading h1 {
          margin: 0;
          color: #17351f;
          font-family: "IBM Plex Serif", serif;
          font-size: clamp(36px, 6vw, 46px);
          font-weight: 700;
          line-height: 1.1;
        }

        .reset-heading p {
          max-width: 390px;
          margin: 18px auto 38px;
          color: #65766a;
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
          color: #36543e;
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
          border: 1px solid #d1e1d3;
          border-radius: 14px;
          background: #f1f7f1;
          color: #277a44;
          transition:
            border-color 180ms ease,
            background 180ms ease,
            box-shadow 180ms ease;
        }

        .reset-input:focus-within {
          border-color: #277a44;
          background: white;
          box-shadow: 0 0 0 4px rgba(39, 122, 68, 0.10);
        }

        .reset-input input {
          width: 100%;
          min-width: 0;
          height: 100%;
          padding: 0;
          border: none;
          outline: none;
          background: transparent;
          color: #17351f;
          font-family: "Modern Antiqua", serif;
          font-size: 15px;
        }

        .reset-input input::placeholder {
          color: #89968c;
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
          color: #718078;
          cursor: pointer;
          transition:
            color 180ms ease,
            background 180ms ease;
        }

        .password-toggle:hover {
          color: #277a44;
          background: rgba(39, 122, 68, 0.08);
        }

        .reset-security {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 2px 0 2px;
          color: #748078;
          font-family: "Modern Antiqua", serif;
          font-size: 13px;
        }

        .reset-security svg {
          color: #277a44;
          flex-shrink: 0;
        }

        .reset-error {
          margin: 0;
          color: #b64444;
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
          border: 1px solid #277a44;
          border-radius: 14px;
          background: #277a44;
          color: white;
          font-family: "Modern Antiqua", serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition:
            transform 180ms ease,
            background 180ms ease,
            box-shadow 180ms ease;
        }

        .reset-submit:hover {
          background: #236b3d;
          box-shadow: 0 10px 24px rgba(39, 122, 68, 0.20);
        }

        .reset-submit:active {
          transform: translateY(0);
        }

        .reset-back {
          margin: 28px 0 0;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
        }

        .reset-back a {
          color: #748078;
        }

        .reset-back a:hover {
          color: #277a44;
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
            <div className="reset-logo">
              F
            </div>

            <div className="reset-icon">
              <Lock size={23} />
            </div>

            <div className="reset-heading">
              <h1>Reset password</h1>

              <p>
                Create a new password for your Farmart account.
                Make it something secure and memorable.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="reset-form">
              <label className="reset-field">
                <span>New password</span>

                <div className="reset-input">
                  <Lock size={19} />

                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
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
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </label>

              <label className="reset-field">
                <span>Confirm new password</span>

                <div className="reset-input">
                  <Lock size={19} />

                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
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
              </label>

              <div className="reset-security">
                <ShieldCheck size={17} />
                <span>Your new password must be at least 8 characters.</span>
              </div>

              {error && (
                <p className="reset-error">
                  {error}
                </p>
              )}

              <button type="submit" className="reset-submit">
                Reset Password
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="reset-back">
              <Link to="/login">Back to login</Link>
            </p>
          </div>
        </section>
      </main>
    </>
  )
}

export default ResetPassword
