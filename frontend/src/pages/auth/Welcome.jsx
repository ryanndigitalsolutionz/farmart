import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'

function Welcome() {
  const navigate = useNavigate()

  const handleRoleSelect = (role) => {
    if (role === 'admin') return
    navigate('/login', {
      state: { role },
    })
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.15 * i,
        duration: 0.45,
        ease: "easeOut",
      },
    }),
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

        .welcome-content {
          width: 100%;
          max-width: 580px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .farmart-logo-frame {
          margin-bottom: 28px;
        }

        .farmart-logo {
          width: min(180px, 55%);
          height: auto;
          display: block;
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

        @media (max-width: 600px) {
          .welcome-page {
            padding: 36px 16px;
          }

          .farmart-logo {
            width: min(150px, 65%);
            margin-bottom: 24px;
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

          .welcome-description {
            font-size: 15px;
          }

          .role-button {
            font-size: 14px;
          }
        }
      `}</style>

      <main className="welcome-page">
        <div className="welcome-content">

          <motion.div
            className="farmart-logo-frame"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <img
              src="/favicon/farm.png"
              alt="Farmart"
              className="farmart-logo"
            />
          </motion.div>

          <motion.h1
            className="welcome-heading"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
          >
            Welcome to Farmart
          </motion.h1>

          <motion.p
            className="welcome-description"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.4, ease: "easeOut" }}
          >
            A direct marketplace for{' '}
            <span className="marketplace-highlight">
              livestock and farm products
            </span>
            , connecting farmers with buyers without unnecessary
            middlemen.
          </motion.p>

          <motion.div
            className="role-actions"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
          >
            <motion.button
              type="button"
              className="role-button role-button-primary"
              variants={cardVariants}
              custom={0}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              onClick={() => handleRoleSelect('farmer')}
            >
              <span>
                I'm a Farmer — sell directly
              </span>

              <FaArrowRight size={16} />
            </motion.button>

            <motion.button
              type="button"
              className="role-button role-button-secondary"
              variants={cardVariants}
              custom={1}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              onClick={() => handleRoleSelect('buyer')}
            >
              <span>
                I'm a Buyer — browse & order
              </span>

              <FaArrowRight size={16} />
            </motion.button>

          </motion.div>

        </div>
      </main>
    </>
  )
}

export default Welcome