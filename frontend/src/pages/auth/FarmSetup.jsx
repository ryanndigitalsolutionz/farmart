import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt as MapPin,
  FaPhone as Phone,
  FaHome as House,
  FaPen as PenLine,
  FaShieldAlt as ShieldCheck,
} from "react-icons/fa";

const API_BASE_URL = "../../api/api";

function FarmSetup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    farmName: "",
    location: "",
    contact: "",
    description: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setIsSaving(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/farmers`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          farm_name: formData.farmName.trim(),
          location: formData.location.trim(),
          phone: formData.contact.trim(),
          description: formData.description.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Unable to submit your farm application."
        );
      }

      setSubmitted(true);
    } catch (requestError) {
      setError(
        requestError.message ||
          "Unable to connect to the Farmart server."
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (submitted) {
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
            background: var(--auth-card);
            border: 1px solid var(--farm-green-border);
            border-radius: 30px;
            box-shadow:
              0 28px 75px var(--farm-green-glow),
              0 5px 18px var(--farm-green-glow);
            overflow: hidden;
            transition:
              background 180ms ease,
              border-color 180ms ease,
              box-shadow 180ms ease;
          }

          .farm-setup-content {
            padding: 58px 60px 54px;
            text-align: center;
          }

          .farm-setup-logo-frame {
            width: min(100%, 250px);
            min-height: 78px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 12px 18px;
            margin: 0 auto 30px;
            box-sizing: border-box;
            border: 1px solid var(--farm-green-border);
            border-radius: 18px;
            background: var(--auth-logo-bg);
          }

          .farm-setup-logo {
            width: 100%;
            max-width: 220px;
            height: auto;
            display: block;
            object-fit: contain;
          }

          .farm-setup-heading {
            margin: 0;
            color: var(--farm-text);
            font-family: "IBM Plex Serif", serif;
            font-size: clamp(32px, 5vw, 42px);
            font-weight: 700;
            line-height: 1.15;
          }

          .farm-setup-subtitle {
            max-width: 420px;
            margin: 18px auto 34px;
            color: var(--farm-muted);
            font-size: 16px;
            line-height: 1.7;
          }

          .farm-setup-verification {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 18px;
            text-align: left;
            border: 1px solid var(--farm-green-border);
            border-radius: 15px;
            background: var(--farm-green-soft);
          }

          .farm-setup-verification-icon {
            width: 44px;
            height: 44px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
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
          }

          .farm-setup-verification-copy span {
            color: var(--farm-muted);
            font-size: 13px;
            line-height: 1.5;
          }

          .farm-setup-back {
            width: 100%;
            min-height: 56px;
            margin-top: 18px;
            border: 1px solid var(--farm-green);
            border-radius: 15px;
            background: var(--farm-green);
            color: var(--farm-white);
            font-family: "Modern Antiqua", serif;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            transition:
              background 180ms ease,
              box-shadow 180ms ease;
          }

          .farm-setup-back:hover {
            background: var(--green-700);
            box-shadow: 0 9px 22px var(--farm-green-glow);
          }

          @media (max-width: 620px) {
            .farm-setup-page {
              padding: 34px 18px;
            }

            .farm-setup-content {
              padding: 48px 28px 40px;
            }
          }

          @media (max-width: 420px) {
            .farm-setup-content {
              padding: 42px 20px 34px;
            }

            .farm-setup-logo-frame {
              width: min(100%, 220px);
            }
          }
        `}</style>

        <main className="farm-setup-page">
          <section className="farm-setup-frame">
            <div className="farm-setup-content">
              <div className="farm-setup-logo-frame">
                <img
                  className="farm-setup-logo"
                  src="/logo/farmart_full_logo_testing.png"
                  alt="Farmart"
                />
              </div>

              <h1 className="farm-setup-heading">
                Application submitted
              </h1>

              <p className="farm-setup-subtitle">
                Your farm application has been sent to Farmart for review.
              </p>

              <div className="farm-setup-verification">
                <div className="farm-setup-verification-icon">
                  <ShieldCheck size={20} />
                </div>

                <div className="farm-setup-verification-copy">
                  <strong>Verification pending</strong>
                  <span>
                    You'll receive an email when an admin makes a decision.
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="farm-setup-back"
                onClick={() => navigate("/farmer/dashboard")}
              >
                Continue
              </button>
            </div>
          </section>
        </main>
      </>
    );
  }

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
          background: var(--auth-card);
          border: 1px solid var(--farm-green-border);
          border-radius: 30px;
          box-shadow:
            0 28px 75px var(--farm-green-glow),
            0 5px 18px var(--farm-green-glow);
          overflow: hidden;
          position: relative;
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
          padding: 58px 60px 54px;
        }

        .farm-setup-logo-frame {
          width: min(100%, 250px);
          min-height: 78px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px 18px;
          margin: 0 auto 30px;
          box-sizing: border-box;
          border: 1px solid var(--farm-green-border);
          border-radius: 18px;
          background: var(--auth-logo-bg);
        }

        .farm-setup-logo {
          width: 100%;
          max-width: 220px;
          height: auto;
          display: block;
          object-fit: contain;
        }

        .farm-setup-heading {
          margin: 0;
          text-align: center;
          color: var(--farm-text);
          font-family: "IBM Plex Serif", serif;
          font-size: clamp(32px, 5vw, 42px);
          font-weight: 700;
          line-height: 1.15;
        }

        .farm-setup-subtitle {
          max-width: 410px;
          margin: 18px auto 42px;
          text-align: center;
          color: var(--farm-muted);
          font-size: 16px;
          line-height: 1.7;
        }

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
          background: var(--farm-green-soft);
          transition:
            background 180ms ease,
            border-color 180ms ease,
            box-shadow 180ms ease;
        }

        .farm-setup-field:focus-within {
          border-color: var(--farm-green);
          background: var(--auth-input-focus);
          box-shadow: 0 0 0 4px var(--farm-green-glow);
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

        .farm-setup-divider {
          width: 100%;
          height: 1px;
          margin: 8px 0 2px;
          background: var(--farm-green-border);
        }

        .farm-setup-verification {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px;
          border: 1px solid var(--farm-green-border);
          border-radius: 15px;
          background: var(--farm-green-soft);
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

        .farm-setup-error {
          margin: 0;
          color: #b2503e;
          font-size: 13px;
          line-height: 1.5;
          text-align: center;
        }

        .farm-setup-submit {
          width: 100%;
          min-height: 58px;
          margin-top: 5px;
          border: 1px solid var(--farm-green);
          border-radius: 15px;
          background: var(--farm-green);
          color: var(--farm-white);
          font-family: "Modern Antiqua", serif;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 9px 22px var(--farm-green-glow);
          transition:
            background 180ms ease,
            box-shadow 180ms ease,
            opacity 180ms ease;
        }

        .farm-setup-submit:hover:not(:disabled) {
          background: var(--green-700);
          box-shadow: 0 11px 26px var(--farm-green-glow);
        }

        .farm-setup-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

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
        }

        @media (max-width: 420px) {
          .farm-setup-page {
            padding: 20px 12px;
          }

          .farm-setup-content {
            padding: 42px 20px 34px;
          }

          .farm-setup-logo-frame {
            width: min(100%, 220px);
          }
        }
      `}</style>

      <main className="farm-setup-page">
        <section className="farm-setup-frame">
          <div className="farm-setup-content">
            <div className="farm-setup-logo-frame">
              <img
                className="farm-setup-logo"
                src="/logo/farmart_full_logo_testing.png"
                alt="Farmart"
              />
            </div>

            <h1 className="farm-setup-heading">
              Set up your farm
            </h1>

            <p className="farm-setup-subtitle">
              Tell buyers a little about your farm before you start selling.
            </p>

            <form
              onSubmit={handleSubmit}
              className="farm-setup-form"
            >
              <label className="farm-setup-field">
                <span className="farm-setup-field-icon">
                  <House size={18} />
                </span>

                <span className="farm-setup-field-content">
                  <span className="farm-setup-field-label">
                    Farm name
                  </span>

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
                  <MapPin size={18} />
                </span>

                <span className="farm-setup-field-content">
                  <span className="farm-setup-field-label">
                    Location
                  </span>

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
                  <Phone size={18} />
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
                  <PenLine size={18} />
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
                  <ShieldCheck size={18} />
                </div>

                <div className="farm-setup-verification-copy">
                  <strong>Verification pending</strong>
                  <span>
                    Your farm will be reviewed by Farmart admin.
                  </span>
                </div>
              </div>

              {error && (
                <p className="farm-setup-error">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="farm-setup-submit"
                disabled={isSaving}
              >
                {isSaving
                  ? "Submitting your application..."
                  : "Submit for verification"}
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default FarmSetup;
