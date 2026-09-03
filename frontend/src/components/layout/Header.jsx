import { FaMoon, FaSun, FaUserShield } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

function Header() {
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  return (
    <header className="farmart-header">
      <div
        className="farmart-header-inner"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          className="farmart-header-left"
          style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
        >
          <a
            href="/"
            className="farmart-header-logo-link"
            aria-label="Farmart home"
        >  
            <img
              src="/favicon/farm.png"
              alt="Farmart"
              className="farmart-header-logo"
            />
          </a>

          <button
            type="button"
            className="farmart-header-faq-link"
            onClick={() => navigate('/faqs')}
          >
            FAQs
          </button>
        </div>

        <div
          className="farmart-header-actions"
          style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <button
            type="button"
            className="farmart-header-admin-link"
            onClick={() => navigate('/login', { state: { role: 'admin' } })}
            aria-label="Continue as Admin"
            title="Continue as Admin"
          >
            <FaUserShield size={18} />
          </button>

          <button
            type="button"
            className="farmart-theme-toggle"
            onClick={toggleTheme}
            aria-label={
              isDark
                ? 'Switch to light theme'
                : 'Switch to dark theme'
            }
            title={
              isDark
                ? 'Switch to light theme'
                : 'Switch to dark theme'
            }
          >
            {isDark ? (
              <FaSun size={18} />
            ) : (
              <FaMoon size={18} />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header