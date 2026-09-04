import { useEffect, useState } from 'react'
import { getAnnouncements } from '../../services/announcementsApi'
import { LuMegaphone } from 'react-icons/lu'

function Announcements() {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getAnnouncements()
      .then(setAnnouncements)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <style>{`
        .farmer-dashboard {
          min-height: 100vh;
          padding: 42px 36px 70px;
          background: #0d130f;
          box-sizing: border-box;
        }

        .farmer-dashboard-container {
          width: min(100%, 1450px);
          margin: 0 auto;
        }

        .farmer-dashboard-title {
          margin: 0;
          color: #edf4ee;
          font-family: "IBM Plex Serif", serif;
          font-size: clamp(30px, 4vw, 34px);
          line-height: 1.2;
        }

        .farmer-dashboard-subtitle {
          margin: 10px 0 0;
          color: #91a198;
          font-family: "Modern Antiqua", serif;
          font-size: 16px;
        }

        .farmer-announcement-list {
          margin-top: 30px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .farmer-announcement-card {
          padding: 20px 25px;
          border: 1px solid #718078;
          border-radius: 17px;
          background: #172019;
        }

        .farmer-announcement-title {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0 0 8px;
          color: #edf4ee;
          font-family: "IBM Plex Serif", serif;
          font-size: 18px;
          font-weight: 600;
        }

        .farmer-announcement-message {
          margin: 0;
          color: #91a198;
          font-family: "Modern Antiqua", serif;
          font-size: 14.5px;
          line-height: 1.6;
        }
      `}</style>

      <div className="farmer-dashboard">
        <div className="farmer-dashboard-container">
          <header>
            <h1 className="farmer-dashboard-title">Announcements</h1>
            <p className="farmer-dashboard-subtitle">Messages from the Farmart team</p>
          </header>

          {loading && <p className="farmer-dashboard-subtitle">Loading…</p>}
          {error && <p style={{ color: '#e07856' }}>{error}</p>}

          {!loading && !error && announcements.length === 0 && (
            <p className="farmer-dashboard-subtitle" style={{ marginTop: 30 }}>
              No announcements yet.
            </p>
          )}

          <div className="farmer-announcement-list">
            {announcements.map((a) => (
              <article key={a.id} className="farmer-announcement-card">
                <h2 className="farmer-announcement-title">
                  <LuMegaphone size={18} />
                  {a.title}
                </h2>
                <p className="farmer-announcement-message">{a.message}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Announcements