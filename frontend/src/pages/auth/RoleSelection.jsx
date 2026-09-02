import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Tractor, Store, ChevronRight } from 'lucide-react'

const ROLES = [
  {
    key: 'farmer',
    title: 'Farmer',
    description: 'Manage your farm, sell your produce and grow your business on Farmart.',
    cta: 'Sign in as Farmer',
    icon: Tractor,
  },
  {
    key: 'buyer',
    title: 'Buyer',
    description: 'Discover fresh products and buy directly from farmers on Farmart.',
    cta: 'Sign in as Buyer',
    icon: Store,
  },
]

export default function RoleSelection({ selectedRole, onSelect }) {
  const navigate = useNavigate()

  const handleSelect = (role) => {
    if (onSelect) {
      onSelect(role)
    } else {
      navigate('/login', { state: { role } })
    }
  }

  return (
    <>
      <style>{`
        .role-selection-page {
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

        .role-selection-card {
          width: min(100%, 580px);
          padding: 68px 64px 58px;
          box-sizing: border-box;
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

        .role-selection-content {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .role-selection-logo {
          width: min(220px, 70%);
          height: auto;
          display: block;
          margin-bottom: 32px;
        }

        .role-selection-heading {
          margin: 0;
          color: var(--farm-text);
          font-family: 'IBM Plex Serif', serif;
          font-size: clamp(32px, 6vw, 42px);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.8px;
        }

        .role-selection-subtitle {
          max-width: 440px;
          margin: 20px auto 46px;
          color: var(--farm-muted);
          font-family: 'Modern Antiqua', serif;
          font-size: 16px;
          line-height: 1.8;
        }

        .role-selection-grid {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .role-selection-card-btn {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 14px;
          padding: 24px;
          border-radius: 18px;
          border: 1px solid var(--farm-green-border);
          background: var(--farm-white);
          color: var(--farm-text);
          font-family: 'Modern Antiqua', serif;
          text-align: left;
          cursor: pointer;
          transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            background 180ms ease,
            border-color 180ms ease,
            color 180ms ease;
        }

        [data-theme='dark'] .role-selection-card-btn {
          background: var(--farm-green-soft);
        }

        .role-selection-card-btn:hover {
          transform: translateY(-2px);
          border-color: var(--farm-green);
          box-shadow: 0 10px 24px var(--farm-green-glow);
        }

        .role-selection-card-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: var(--farm-green-soft);
          color: var(--farm-green);
        }

        [data-theme='dark'] .role-selection-card-icon {
          background: rgba(111, 201, 138, 0.12);
          color: var(--farm-mint);
        }

        .role-selection-card-title {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
          color: var(--farm-text);
        }

        .role-selection-card-desc {
          margin: 0;
          font-size: 13px;
          line-height: 1.6;
          color: var(--farm-muted);
        }

        .role-selection-card-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 4px;
          font-size: 13px;
          font-weight: 700;
          color: var(--farm-green);
        }

        @media (max-width: 600px) {
          .role-selection-page {
            padding: 36px 16px;
          }

          .role-selection-card {
            padding: 54px 28px 46px;
            border-radius: 25px;
          }

          .role-selection-logo {
            width: min(190px, 75%);
            margin-bottom: 28px;
          }

          .role-selection-subtitle {
            margin-bottom: 40px;
          }

          .role-selection-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 400px) {
          .role-selection-page {
            padding: 24px 12px;
          }

          .role-selection-card {
            padding: 46px 20px 40px;
          }

          .role-selection-subtitle {
            font-size: 15px;
          }
        }
      `}</style>

      <main className="role-selection-page">
        <motion.section
          className="role-selection-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="role-selection-content">
            <img
              src="/favicon/farm.png"
              alt="Farmart"
              className="role-selection-logo"
            />

            <h1 className="role-selection-heading">
              Welcome back to Farmart
            </h1>

            <p className="role-selection-subtitle">
              How would you like to continue?
            </p>

            <div className="role-selection-grid">
              {ROLES.map((role) => {
                const Icon = role.icon
                return (
                  <motion.button
                    key={role.key}
                    type="button"
                    className="role-selection-card-btn"
                    onClick={() => handleSelect(role.key)}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div className="role-selection-card-icon">
                      <Icon size={20} strokeWidth={2} />
                    </div>

                    <div>
                      <h2 className="role-selection-card-title">
                        {role.title}
                      </h2>

                      <p className="role-selection-card-desc">
                        {role.description}
                      </p>

                      <span className="role-selection-card-cta">
                        {role.cta}
                        <ChevronRight size={14} strokeWidth={2} />
                      </span>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>
        </motion.section>
      </main>
    </>
  )
}
