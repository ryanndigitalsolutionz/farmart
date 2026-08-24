import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, ArrowRight } from 'lucide-react'

function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('Please enter your email address.')
      return
    }

    sessionStorage.setItem('farmartResetEmail', email)

    navigate('/verify-email')
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
            #f7faf7;
          color: #17351f;
        }

        .forgot-card {
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

        .forgot-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          width: 110px;
          height: 4px;
          transform: translateX(-50%);
          background: #277a44;
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

        .forgot-logo {
          width: 68px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 28px;
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

        .forgot-heading h1 {
          margin: 0;
          color: #17351f;
          font-family: "IBM Plex Serif", serif;
          font-size: clamp(36px, 6vw, 46px);
          font-weight: 700;
          line-height: 1.1;
        }

        .forgot-heading p {
          max-width: 390px;
          margin: 18px auto 40px;
          color: #65766a;
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
          color: #36543e;
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
          border: 1px solid #d1e1d3;
          border-radius: 14px;
          background: #f1f7f1;
          color: #277a44;
          transition:
            border-color 180ms ease,
            background 180ms ease,
            box-shadow 180ms ease;
        }

        .forgot-input:focus-within {
          border-color: #277a44;
          background: white;
          box-shadow: 0 0 0 4px rgba(39, 122, 68, 0.10);
        }

        .forgot-input input {
          width: 100%;
          min-width: 0;
          height: 100%;
          border: none;
          outline: none;
          background: transparent;
          color: #17351f;
          font-family: "Modern Antiqua", serif;
          font-size: 15px;
        }

        .forgot-input input::placeholder {
          color: #89968c;
        }

        .forgot-error {
          margin: 0;
          color: #b64444;
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

        .forgot-submit:hover {
          background: #236b3d;
          box-shadow: 0 10px 24px rgba(39, 122, 68, 0.20);
        }

        .forgot-submit:active {
          transform: translateY(0);
        }

        .forgot-switch {
          margin: 30px 0 0;
          color: #748078;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
        }

        .forgot-switch a {
          color: #277a44;
          font-weight: 600;
        }

        .forgot-switch a:hover {
          color: #17351f;
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
            <div className="forgot-logo">
              F
            </div>

            <div className="forgot-heading">
              <h1>Forgot password?</h1>

              <p>
                Enter your email address and we'll guide you through
                securing your Farmart account again.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="forgot-form">
              <label className="forgot-field">
                <span>Email address</span>

                <div className="forgot-input">
                  <Mail size={19} />

                  <input
                    type="email"
                    placeholder="farmer@boranfarm.co.ke"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
              </label>

              {error && (
                <p className="forgot-error">
                  {error}
                </p>
              )}

              <button type="submit" className="forgot-submit">
                Continue
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="forgot-switch">
              Remembered your password?{' '}
              <Link to="/login">Log in</Link>
            </p>
          </div>
        </section>
      </main>
    </>
  )
}

export default ForgotPassword
