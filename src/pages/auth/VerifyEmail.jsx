import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MailCheck, ArrowRight } from 'lucide-react'

function VerifyEmail() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const savedEmail = sessionStorage.getItem('farmartResetEmail')

    if (!savedEmail) {
      navigate('/forgot-password', { replace: true })
      return
    }

    setEmail(savedEmail)
  }, [navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!code.trim()) {
      setError('Please enter the verification code.')
      return
    }

    sessionStorage.setItem('farmartEmailVerified', 'true')

    navigate('/reset-password')
  }

  const handleResend = () => {
    setError('')
    setCode('')
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
            #f7faf7;
          color: #17351f;
        }

        .verify-card {
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

        .verify-card::before {
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

        .verify-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .verify-logo {
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

        .verify-icon {
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

        .verify-heading h1 {
          margin: 0;
          color: #17351f;
          font-family: "IBM Plex Serif", serif;
          font-size: clamp(34px, 6vw, 44px);
          font-weight: 700;
          line-height: 1.1;
        }

        .verify-heading p {
          max-width: 390px;
          margin: 18px auto 34px;
          color: #65766a;
          font-family: "Modern Antiqua", serif;
          font-size: 16px;
          line-height: 1.7;
        }

        .verify-email {
          margin: 0 0 28px;
          color: #277a44;
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
          color: #36543e;
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
          border: 1px solid #d1e1d3;
          border-radius: 14px;
          background: #f1f7f1;
          transition:
            border-color 180ms ease,
            background 180ms ease,
            box-shadow 180ms ease;
        }

        .verify-input:focus-within {
          border-color: #277a44;
          background: white;
          box-shadow: 0 0 0 4px rgba(39, 122, 68, 0.10);
        }

        .verify-input input {
          width: 100%;
          height: 100%;
          border: none;
          outline: none;
          background: transparent;
          color: #17351f;
          font-family: "Modern Antiqua", serif;
          font-size: 22px;
          font-weight: 600;
          letter-spacing: 7px;
          text-align: center;
        }

        .verify-input input::placeholder {
          color: #a1aca4;
          letter-spacing: 6px;
        }

        .verify-error {
          margin: 0;
          color: #b64444;
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

        .verify-submit:hover {
          transform: translateY(-2px);
          background: #236b3d;
          box-shadow: 0 10px 24px rgba(39, 122, 68, 0.20);
        }

        .verify-submit:active {
          transform: translateY(0);
        }

        .verify-resend {
          margin: 22px 0 0;
          color: #748078;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
        }

        .verify-resend button {
          padding: 0;
          border: none;
          background: transparent;
          color: #277a44;
          font-family: "Modern Antiqua", serif;
          font-size: inherit;
          font-weight: 600;
          cursor: pointer;
        }

        .verify-resend button:hover {
          color: #17351f;
        }

        .verify-back {
          margin: 26px 0 0;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
        }

        .verify-back a {
          color: #748078;
        }

        .verify-back a:hover {
          color: #277a44;
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
            <div className="verify-logo">
              F
            </div>

            <div className="verify-icon">
              <MailCheck size={24} />
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

            <form onSubmit={handleSubmit} className="verify-form">
              <label className="verify-field">
                <span>Verification code</span>

                <div className="verify-input">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength="6"
                    placeholder="000000"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    autoComplete="one-time-code"
                  />
                </div>
              </label>

              {error && (
                <p className="verify-error">
                  {error}
                </p>
              )}

              <button type="submit" className="verify-submit">
                Verify & continue
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="verify-resend">
              Didn't receive a code?{' '}
              <button type="button" onClick={handleResend}>
                Resend code
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
