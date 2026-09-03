import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FiMapPin,
  FiPhone,
  FiHome,
  FiEdit3,
  FiShield,
} from 'react-icons/fi'
import { addPendingFarmer, getFarmerById } from '../../data/farmersStore'

function FarmSetup() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    farmName: '',
    location: '',
    contact: '',
    description: '',
  })

  const [isSaving, setIsSaving] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [pendingFarmerId, setPendingFarmerId] = useState(null)
  const [rejected, setRejected] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSaving(true)

    const newFarmer = addPendingFarmer({
      farm_name: formData.farmName,
      location: formData.location,
      phone_number: formData.contact,
      description: formData.description,
    })

    localStorage.setItem(
      'farmartFarmProfile',
      JSON.stringify({
        ...formData,
        verificationStatus: 'pending',
      }),
    )

    setTimeout(() => {
      setIsSaving(false)
      setPendingFarmerId(newFarmer.id)
      setSubmitted(true)
    }, 700)
  }

  const handleTryAgain = () => {
    setSubmitted(false)
    setRejected(false)
    setPendingFarmerId(null)
    setRejectionReason('')
  }

  // Poll for admin approval while the farmer waits, and redirect automatically.
  useEffect(() => {
    if (!submitted || !pendingFarmerId) return

    const interval = setInterval(() => {
      const farmer = getFarmerById(pendingFarmerId)

      if (!farmer) return

      if (farmer.status === 'verified') {
        clearInterval(interval)
        navigate('/farmer/dashboard')
      }

      if (farmer.status === 'rejected') {
        setRejectionReason(farmer.rejection_reason || '')
        setRejected(true)
        clearInterval(interval)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [submitted, pendingFarmerId, navigate])

  return (
    <>
      <style>{`
        .farm-setup-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 64px 28px;
          box-sizing: border-box;

          background:
            radial-gradient(
              circle at 50% 35%,
              var(--farm-green-glow),
              transparent 45%
            ),
            var(--farm-background);

          color: var(--farm-text);
          font-family: "Modern Antiqua", serif;

          transition:
            background 180ms ease,
            color 180ms ease;
        }

        .farm-setup-frame {
          width: min(100%, 560px);
          position: relative;
          overflow: hidden;

          background: var(--auth-card);
          border: 1px solid var(--farm-green-border);
          border-radius: 30px;

          box-shadow:
            0 28px 75px var(--farm-green-glow),
            0 5px 18px var(--farm-green-glow);

          transition:
            background 180ms ease,
            border-color 180ms ease,
            box-shadow 180ms ease;
        }

        .farm-setup-frame::before {
          content: "";
          position: absolute;
          top: 0;
          left: 50%;

          width: 120px;
          height: 5px;

          transform: translateX(-50%);
          border-radius: 0 0 8px 8px;

          background: var(--farm-green);
        }

        .farm-setup-content {
          padding: 62px 60px 54px;
        }

        /* Farmart logo */

        .farm-setup-logo {
          width: min(100%, 300px);
          min-height: 100px;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 14px 22px;
          margin: 0 auto 30px;

          box-sizing: border-box;

          border: 1px solid var(--farm-green-border);
          border-radius: 20px;

          background: var(--auth-logo-bg);

          transition:
            background 180ms ease,
            border-color 180ms ease;
        }

        .farm-setup-logo img {
          width: 100%;
          height: 100px;
          object-fit: contain;
          display: block;
        }

        /* Heading */

        .farm-setup-heading {
          margin: 0;

          text-align: center;

          color: var(--farm-text);

          font-family: "IBM Plex Serif", serif;
          font-size: clamp(32px, 5vw, 42px);
          font-weight: 700;
          line-height: 1.15;

          transition: color 180ms ease;
        }

        .farm-setup-subtitle {
          max-width: 410px;

          margin: 18px auto 42px;

          text-align: center;

          color: var(--farm-muted);

          font-size: 16px;
          line-height: 1.7;

          transition: color 180ms ease;
        }

        /* Form */

        .farm-setup-form {
          display: flex;
          flex-direction: column;
          gap: 19px;
        }

        .farm-setup-field {
          width: 100%;

          display: flex;
          align-items: flex-start;

          gap: 15px;
          padding: 17px 18px;

          box-sizing: border-box;

          border: 1px solid var(--farm-green-border);
          border-radius: 16px;

          background: var(--auth-input);

          transition:
            border-color 180ms ease,
            background 180ms ease,
            box-shadow 180ms ease;
        }

        .farm-setup-field:focus-within {
          border-color: var(--farm-green);
          background: var(--auth-input-focus);

          box-shadow:
            0 0 0 4px var(--farm-green-glow);
        }

        .farm-setup-field-icon {
          width: 23px;
          height: 23px;

          flex-shrink: 0;

          margin-top: 4px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: var(--farm-green);
        }

        .farm-setup-field-content {
          min-width: 0;
          flex: 1;

          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .farm-setup-field-label {
          color: var(--farm-text);

          font-size: 12px;
          font-weight: 700;

          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .farm-setup-field input,
        .farm-setup-field textarea {
          width: 100%;
          min-width: 0;

          box-sizing: border-box;

          border: none;
          outline: none;

          padding: 0;

          background: transparent;

          color: var(--farm-text);

          font-family: "Modern Antiqua", serif;
          font-size: 15px;
          line-height: 1.6;
        }

        .farm-setup-field input::placeholder,
        .farm-setup-field textarea::placeholder {
          color: var(--farm-muted);
        }

        .farm-setup-field textarea {
          min-height: 78px;
          resize: vertical;
        }

        /* Divider */

        .farm-setup-divider {
          width: 100%;
          height: 1px;

          margin: 8px 0 2px;

          background: var(--farm-green-border);
        }

        /* Verification */

        .farm-setup-verification {
          display: flex;
          align-items: center;

          gap: 14px;
          padding: 16px;

          border: 1px solid var(--farm-green-border);
          border-radius: 15px;

          background: var(--farm-green-soft);

          transition:
            background 180ms ease,
            border-color 180ms ease;
        }

        .farm-setup-verification-icon {
          width: 40px;
          height: 40px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 11px;

          background: var(--farm-green-glow);
          color: var(--farm-green);
        }

        .farm-setup-verification-copy {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .farm-setup-verification-copy strong {
          color: var(--farm-text);

          font-size: 14px;
          font-weight: 700;
        }

        .farm-setup-verification-copy span {
          color: var(--farm-muted);

          font-size: 13px;
          line-height: 1.5;
        }

        /* Submit */

        .farm-setup-submit {
          width: 100%;
          min-height: 58px;

          margin-top: 5px;

          border: none;
          border-radius: 15px;

          background: var(--farm-green);
          color: #ffffff;

          font-family: "Modern Antiqua", serif;
          font-size: 16px;
          font-weight: 700;

          cursor: pointer;

          box-shadow:
            0 9px 22px var(--farm-green-glow);

          transition:
            transform 180ms ease,
            background 180ms ease,
            box-shadow 180ms ease;
        }

        .farm-setup-submit:hover:not(:disabled) {
          background: var(--farm-green-dark);

          transform: translateY(-2px);

          box-shadow:
            0 13px 28px var(--farm-green-glow);
        }

        .farm-setup-submit:active:not(:disabled) {
          transform: translateY(0);
        }

        .farm-setup-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        /* Pending / waiting screen */

        .farm-setup-pending {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 6px;
          padding: 12px 0 4px;
        }

        .farm-setup-pending-orb {
          position: relative;
          width: 92px;
          height: 92px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }

        .farm-setup-pending-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid var(--farm-green);
          opacity: 0;
          animation: farm-pending-pulse 2.4s ease-out infinite;
        }

        .farm-setup-pending-ring:nth-child(2) {
          animation-delay: 0.8s;
        }

        .farm-setup-pending-ring:nth-child(3) {
          animation-delay: 1.6s;
        }

        @keyframes farm-pending-pulse {
          0% {
            transform: scale(0.55);
            opacity: 0.55;
          }
          100% {
            transform: scale(1.7);
            opacity: 0;
          }
        }

        .farm-setup-pending-icon {
          position: relative;
          z-index: 1;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--farm-green);
          color: #ffffff;
          box-shadow: 0 8px 20px var(--farm-green-glow);
          animation: farm-pending-sway 3s ease-in-out infinite;
        }

        @keyframes farm-pending-sway {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(7deg); }
        }

        .farm-setup-pending-title {
          font-family: "IBM Plex Serif", serif;
          font-size: 24px;
          font-weight: 700;
          color: var(--farm-text);
          margin: 0;
        }

        .farm-setup-pending-copy {
          max-width: 360px;
          color: var(--farm-muted);
          font-size: 14.5px;
          line-height: 1.7;
          margin: 10px 0 0;
        }

        .farm-setup-pending-copy strong {
          color: var(--farm-text);
        }

        .farm-setup-pending-faint {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--farm-muted);
          opacity: 0.65;
          font-size: 12.5px;
          font-style: italic;
          margin: 22px 0 0;
        }

        .farm-setup-pending-dots span {
          display: inline-block;
          width: 5px;
          height: 5px;
          margin-left: 2px;
          border-radius: 50%;
          background: var(--farm-green);
          animation: farm-pending-dot 1.4s ease-in-out infinite both;
        }

        .farm-setup-pending-dots span:nth-child(2) { animation-delay: 0.2s; }
        .farm-setup-pending-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes farm-pending-dot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.35; }
          40% { transform: scale(1); opacity: 1; }
        }

        .farm-setup-rejected-copy {
          max-width: 360px;
          color: var(--farm-muted);
          font-size: 14.5px;
          line-height: 1.7;
          margin: 10px 0 26px;
        }

        /* Responsive */

        @media (max-width: 620px) {
          .farm-setup-page {
            padding: 34px 18px;
          }

          .farm-setup-frame {
            border-radius: 24px;
          }

          .farm-setup-content {
            padding: 48px 28px 40px;
          }

          .farm-setup-logo {
            min-height: 82px;
            padding: 10px 18px;
          }

          .farm-setup-logo img {
            height: 82px;
          }
        }

        @media (max-width: 420px) {
          .farm-setup-page {
            padding: 20px 12px;
          }

          .farm-setup-content {
            padding: 42px 20px 34px;
          }

          .farm-setup-heading {
            font-size: 30px;
          }

          .farm-setup-subtitle {
            font-size: 15px;
            margin-bottom: 32px;
          }

          .farm-setup-field {
            padding: 15px;
          }

          .farm-setup-logo {
            min-height: 76px;
          }

          .farm-setup-logo img {
            height: 76px;
          }
        }
      `}</style>

      <main className="farm-setup-page">
        <section className="farm-setup-frame">
          <div className="farm-setup-content">
            <div className="farm-setup-logo">
              <img
                src="/logo/farmart_full_logo_testing.png"
                alt="Farmart"
              />
            </div>

            {submitted && !rejected && (
              <div className="farm-setup-pending">
                <div className="farm-setup-pending-orb">
                  <span className="farm-setup-pending-ring" />
                  <span className="farm-setup-pending-ring" />
                  <span className="farm-setup-pending-ring" />
                  <span className="farm-setup-pending-icon">
                    <FiShield size={22} />
                  </span>
                </div>

                <h1 className="farm-setup-pending-title">
                  Almost there!
                </h1>

                <p className="farm-setup-pending-copy">
                  <strong>{formData.farmName}</strong> has been submitted for
                  review. You'll be taken to your dashboard automatically
                  once it's approved.
                </p>

                <span className="farm-setup-pending-faint">
                  The admin will approve you soon
                  <span className="farm-setup-pending-dots">
                    <span />
                    <span />
                    <span />
                  </span>
                </span>
              </div>
            )}

            {submitted && rejected && (
              <div className="farm-setup-pending">
                <div className="farm-setup-pending-orb">
                  <span className="farm-setup-pending-icon" style={{ background: '#B2503E' }}>
                    <FiShield size={22} />
                  </span>
                </div>

                <h1 className="farm-setup-pending-title">
                  Not approved this time
                </h1>

                <p className="farm-setup-rejected-copy">
                  Your farm profile wasn't approved.
                  {rejectionReason && (
                    <>
                      <br />
                      <br />
                      <strong>Admin's note:</strong> {rejectionReason}
                    </>
                  )}
                  <br />
                  <br />
                  You can update your details and submit again.
                </p>

                <button
                  type="button"
                  className="farm-setup-submit"
                  onClick={handleTryAgain}
                >
                  Try again
                </button>
              </div>
            )}

            {!submitted && (
              <>
                <h1 className="farm-setup-heading">Set up your farm</h1>

                <p className="farm-setup-subtitle">
                  Tell buyers a little about your farm before you start selling.
                </p>

                <form onSubmit={handleSubmit} className="farm-setup-form">
                  <label className="farm-setup-field">
                    <span className="farm-setup-field-icon">
                      <FiHome size={18} />
                    </span>

                    <span className="farm-setup-field-content">
                      <span className="farm-setup-field-label">Farm name</span>

                      <input
                        type="text"
                        name="farmName"
                        placeholder="e.g. Kiambu Green Pastures"
                        value={formData.farmName}
                        onChange={handleChange}
                        required
                      />
                    </span>
                  </label>

                  <label className="farm-setup-field">
                    <span className="farm-setup-field-icon">
                      <FiMapPin size={18} />
                    </span>

                    <span className="farm-setup-field-content">
                      <span className="farm-setup-field-label">Location</span>

                      <input
                        type="text"
                        name="location"
                        placeholder="e.g. Kiambu County"
                        value={formData.location}
                        onChange={handleChange}
                        required
                      />
                    </span>
                  </label>

                  <label className="farm-setup-field">
                    <span className="farm-setup-field-icon">
                      <FiPhone size={18} />
                    </span>

                    <span className="farm-setup-field-content">
                      <span className="farm-setup-field-label">
                        Contact number
                      </span>

                      <input
                        type="tel"
                        name="contact"
                        placeholder="e.g. 0712 345 678"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                      />
                    </span>
                  </label>

                  <label className="farm-setup-field">
                    <span className="farm-setup-field-icon">
                      <FiEdit3 size={18} />
                    </span>

                    <span className="farm-setup-field-content">
                      <span className="farm-setup-field-label">
                        About your farm
                      </span>

                      <textarea
                        name="description"
                        placeholder="Tell buyers briefly what you farm or sell..."
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        required
                      />
                    </span>
                  </label>

                  <div className="farm-setup-divider" />

                  <div className="farm-setup-verification">
                    <div className="farm-setup-verification-icon">
                      <FiShield size={18} />
                    </div>

                    <div className="farm-setup-verification-copy">
                      <strong>Verification pending</strong>
                      <span>
                        Your farm will be reviewed by Farmart admin.
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="farm-setup-submit"
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving your farm...' : 'Save & continue'}
                  </button>
                </form>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  )
}

export default FarmSetup