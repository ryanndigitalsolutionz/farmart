import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

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
          padding: 72px 28px;
          background:
            radial-gradient(
              circle at 50% 35%,
              rgba(39, 122, 68, 0.09),
              transparent 46%
            ),
            #f7faf7;
          color: #17351f;
        }

        .welcome-card {
          width: min(100%, 560px);
          padding: 76px 68px 64px;
          border: 1px solid #d8e5da;
          border-radius: 30px;
          background: #ffffff;
          box-shadow:
            0 28px 80px rgba(29, 78, 42, 0.11),
            0 6px 20px rgba(29, 78, 42, 0.05);
        }

        .welcome-content {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .farmart-mark {
          width: 82px;
          height: 82px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 30px;
          border-radius: 23px;
          background: #277a44;
          color: #ffffff;
          font-family: "IBM Plex Serif", serif;
          font-size: 44px;
          font-weight: 700;
          line-height: 1;
          box-shadow:
            0 0 0 9px rgba(39, 122, 68, 0.07),
            0 14px 30px rgba(39, 122, 68, 0.16);
        }

        .farmart-title {
          margin: 0;
          color: #17351f;
          font-family: "IBM Plex Serif", serif;
          font-size: clamp(46px, 8vw, 58px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -1.5px;
        }

        .farmart-tagline {
          max-width: 410px;
          margin: 24px auto 50px;
          color: #65766a;
          font-family: "Modern Antiqua", serif;
          font-size: 16px;
          line-height: 1.85;
        }

        .role-actions {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 18px;
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
          cursor: pointer;
          transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            background 180ms ease;
        }

        .role-button-primary {
          border: 1px solid #277a44;
          background: #277a44;
          color: #ffffff;
          box-shadow: 0 8px 20px rgba(39, 122, 68, 0.12);
        }

        .role-button-primary:hover {
          background: #216b3b;
          box-shadow: 0 12px 28px rgba(39, 122, 68, 0.19);
        }

        .role-button-secondary {
          border: 1px solid #cbd9ce;
          background: #ffffff;
          color: #277a44;
        }

        .role-button-secondary:hover {
          border-color: #277a44;
          background: #f7fbf7;
          box-shadow: 0 8px 22px rgba(39, 122, 68, 0.08);
        }

        .role-button:active {
          transform: translateY(0);
        }

        .role-button svg {
          flex-shrink: 0;
        }

        .admin-link {
          margin-top: 36px;
          padding: 8px 10px;
          border: none;
          background: transparent;
          color: #78857b;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          line-height: 1.7;
          cursor: pointer;
        }

        .admin-link span {
          margin-left: 6px;
          color: #277a44;
          font-weight: 600;
        }

        .admin-link:hover {
          color: #526157;
        }

        @media (max-width: 600px) {
          .welcome-page {
            padding: 36px 16px;
          }

          .welcome-card {
            padding: 58px 28px 50px;
            border-radius: 25px;
          }

          .farmart-mark {
            width: 74px;
            height: 74px;
            margin-bottom: 26px;
            font-size: 40px;
          }

          .farmart-title {
            font-size: 44px;
          }

          .farmart-tagline {
            margin-top: 20px;
            margin-bottom: 42px;
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
            padding: 48px 20px 42px;
          }

          .farmart-tagline {
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
            <div className="farmart-mark">
              F
            </div>

            <h1 className="farmart-title">
              Farmart
            </h1>

            <p className="farmart-tagline">
              Livestock, sold straight from the farm — no
              <br />
              middlemen, fair prices.
            </p>

            <div className="role-actions">
              <button
                className="role-button role-button-primary"
                onClick={() => handleRoleSelect('farmer')}
              >
                <span>I'm a Farmer — sell livestock</span>
                <ArrowRight size={19} />
              </button>

              <button
                className="role-button role-button-secondary"
                onClick={() => handleRoleSelect('buyer')}
              >
                <span>I'm a Buyer — browse & order</span>
                <ArrowRight size={19} />
              </button>
            </div>

            <button
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
