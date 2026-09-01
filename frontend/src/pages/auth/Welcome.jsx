import { useNavigate } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

function Welcome() {
  const navigate = useNavigate()

  const handleRoleSelect = (role) => {
    navigate('/login', {
      state: { role },
    })
  }

  return (
    <>
      <style>{`
        .welcome-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 64px 24px;
          box-sizing: border-box;
          background:
            radial-gradient(
              circle at 50% 30%,
              var(--farm-green-glow),
              transparent 45%
            ),
            var(--farm-background);
          color: var(--farm-text);
          transition:
            background 180ms ease,
            color 180ms ease;
        }

        .welcome-card {
          width: min(100%, 580px);
          padding: 68px 64px 58px;
          border: 1px solid var(--farm-green-border);
          border-radius: 30px;
          background: var(--farm-green-soft);
          box-shadow:
            0 28px 80px var(--farm-green-glow),
            0 6px 20px var(--farm-green-glow);
          transition:
            background 180ms ease,
            border-color 180ms ease,
            box-shadow 180ms ease;
        }

        .welcome-content {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .farmart-logo {
          width: min(220px, 70%);
          height: auto;
          display: block;
          margin-bottom: 32px;
        }

        .welcome-heading {
          margin: 0;
          color: var(--farm-text);
          font-family: "IBM Plex Serif", serif;
          font-size: clamp(32px, 6vw, 42px);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.8px;
        }

        .welcome-description {
          max-width: 440px;
          margin: 20px auto 46px;
          color: var(--farm-muted);
          font-family: "Modern Antiqua", serif;
          font-size: 16px;
          line-height: 1.8;
        }

        .marketplace-highlight {
          color: var(--farm-green);
          font-weight: 600;
        }

        .role-actions {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .role-button {
          width: 100%;
          min-height: 66px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 0 24px;
          border-radius: 16px;
          font-family: "Modern Antiqua", serif;
          font-size: 15px;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            background 180ms ease,
            border-color 180ms ease,
            color 180ms ease;
        }

        .role-button:hover {
          transform: translateY(-2px);
        }

        .role-button-primary {
          border: 1px solid var(--farm-green);
          background: var(--farm-green);
          color: #ffffff;
          box-shadow: 0 8px 20px var(--farm-green-glow);
        }

        .role-button-primary:hover {
          background: var(--farm-green-dark);
          box-shadow: 0 12px 28px var(--farm-green-glow);
        }

        .role-button-secondary {
          border: 1px solid var(--farm-green-border);
          background: var(--farm-white);
          color: var(--farm-green);
        }

        .role-button-secondary:hover {
          border-color: var(--farm-green);
          background: var(--farm-green-soft);
          box-shadow: 0 8px 22px var(--farm-green-glow);
        }

        .role-button svg {
          flex-shrink: 0;
        }

        .admin-link {
          margin-top: 32px;
          padding: 8px 10px;
          border: none;
          background: transparent;
          color: var(--farm-muted);
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          line-height: 1.7;
          cursor: pointer;
          transition: color 160ms ease;
        }

        .admin-link span {
          margin-left: 6px;
          color: var(--farm-green);
          font-weight: 600;
        }

        .admin-link:hover {
          color: var(--farm-text);
        }

        @media (max-width: 600px) {
          .welcome-page {
            padding: 36px 16px;
          }

          .welcome-card {
            padding: 54px 28px 46px;
            border-radius: 25px;
          }

          .farmart-logo {
            width: min(190px, 75%);
            margin-bottom: 28px;
          }

          .welcome-description {
            margin-bottom: 40px;
          }

          .role-button {
            min-height: 62px;
            padding: 0 18px;
          }
        }

        @media (max-width: 400px) {
          .welcome-page {
            padding: 24px 12px;
          }

          .welcome-card {
            padding: 46px 20px 40px;
          }

          .welcome-description {
            font-size: 15px;
          }

          .role-button {
            font-size: 14px;
          }
        }
      `}</style>

      <main className="welcome-page">
        <section className="welcome-card">
          <div className="welcome-content">

            <div className="farmart-logo-frame">
              <img
                src="/logo/farmart_full_logo_testing.png"
                alt="Farmart"
                className="farmart-logo"
              />
            </div>

            <h1 className="welcome-heading">
              Welcome to Farmart
            </h1>

            <p className="welcome-description">
              A direct marketplace for{' '}
              <span className="marketplace-highlight">
                livestock and farm products
              </span>
              , connecting farmers with buyers without unnecessary
              middlemen.
            </p>

            <div className="role-actions">

              <button
                type="button"
                className="role-button role-button-primary"
                onClick={() => handleRoleSelect('farmer')}
              >
                <span>
                  I'm a Farmer — sell directly
                </span>

                <FaArrowRight size={16} />
              </button>

              <button
                type="button"
                className="role-button role-button-secondary"
                onClick={() => handleRoleSelect('buyer')}
              >
                <span>
                  I'm a Buyer — browse & order
                </span>

                <FaArrowRight size={16} />
              </button>

            </div>

            <button
              type="button"
              className="admin-link"
              onClick={() => handleRoleSelect('admin')}
            >
              Platform administrator?
              <span>Continue as Admin</span>
            </button>

          </div>
        </section>
      </main>
    </>
  )
}

export default Welcome
