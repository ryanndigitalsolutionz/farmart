import { FaMoon, FaSun } from 'react-icons/fa'
import { useTheme } from '../../context/ThemeContext'

function Header() {
  const { isDark, toggleTheme } = useTheme()


  return (
    <header className="farmart-header">
      <div className="farmart-header-inner">
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
    </header>
  )
}

export default Header
