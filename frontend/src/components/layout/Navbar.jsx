import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import {
  Menu,
  X,
  Sun,
  Moon,
  Search,
  ShoppingCart,
  Heart,
  ChevronDown,
  ArrowRight,
  User,
  LayoutDashboard,
  ClipboardList,
  Package,
  Settings,
} from 'lucide-react'
import { api } from '../../api'

const FARMER_MENU_ITEMS = [
  { to: '/farmer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/farmer/farm-profile', label: 'Farm Profile', icon: User },
  { to: '/farmer/orders', label: 'Orders', icon: ClipboardList },
  { to: '/farmer/listings', label: 'Create Listing', icon: Package },
]

const BUYER_MENU_ITEMS = [
  { to: '/buyer/marketplace', label: 'Marketplace', icon: null },
  { to: '/buyer/orders', label: 'Orders', icon: ClipboardList },
  { to: '/buyer/wishlist', label: 'Saved Items', icon: Heart },
  { to: '/buyer/profile', label: 'Profile', icon: User },
]

const ADMIN_MENU_ITEMS = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

function useScrollSpy() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrolled
}

function useDebouncedValue(value, delay) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}

const TYPE_LABEL = {
  cattle: 'Cattle',
  goat: 'Goat',
  sheep: 'Sheep',
  poultry: 'Poultry',
  dairy: 'Dairy',
  product: 'Product',
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const { isAuthenticated, role, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  const scrolled = useScrollSpy()
  const userMenuRef = useRef(null)
  const searchInputRef = useRef(null)
  const searchDropdownRef = useRef(null)
  const debouncedQuery = useDebouncedValue(query, 300)

  useEffect(() => {
    setMobileOpen(false)
    setUserMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!mobileOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [mobileOpen])

  useEffect(() => {
    if (!userMenuOpen) return
    const handleClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [userMenuOpen])

  useEffect(() => {
    if (!searchOpen) return
    const timer = setTimeout(() => searchInputRef.current?.focus(), 50)
    return () => clearTimeout(timer)
  }, [searchOpen])

  useEffect(() => {
    if (!searchOpen) return
    const trimmed = debouncedQuery.trim()
    if (trimmed.length < 2) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults([])
      setLoading(false)
      setError('')
      setHasSearched(false)
      setActiveIndex(-1)
      return
    }
    let cancelled = false
    setLoading(true)
    setHasSearched(true)
    setError('')
    setActiveIndex(-1)
    api.getListings({ search: trimmed, status: 'active' })
      .then((data) => {
        if (!cancelled) {
          setResults(data)
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError('Something went wrong. Please try again.')
          setLoading(false)
          setResults([])
        }
      })
    return () => { cancelled = true }
  }, [debouncedQuery, searchOpen])

  const handleSelect = useCallback(() => {
    setQuery('')
    setResults([])
    setHasSearched(false)
    setActiveIndex(-1)
    setSearchOpen(false)
    window.location.href = '/buyer/marketplace'
  }, [])

  useEffect(() => {
    if (!searchOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setSearchOpen(false)
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((prev) => Math.min(prev + 1, results.length - 1))
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((prev) => Math.max(prev - 1, 0))
        return
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        if (activeIndex >= 0 && results[activeIndex]) {
          handleSelect()
        }
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [searchOpen, results, activeIndex, handleSelect])

  const handleSearchClick = () => {
    setSearchOpen(true)
  }

  const handleCloseSearch = () => {
    setSearchOpen(false)
    setQuery('')
    setResults([])
    setHasSearched(false)
    setActiveIndex(-1)
  }

  const userMenuItems = role === 'farmer'
    ? FARMER_MENU_ITEMS
    : role === 'buyer'
      ? BUYER_MENU_ITEMS
      : role === 'admin'
        ? ADMIN_MENU_ITEMS
        : []

  const roleLabel =
    role === 'admin'
      ? 'Admin'
      : role === 'farmer'
        ? 'Farmer'
        : role === 'buyer'
          ? 'Buyer'
          : 'Account'

  const fmt = (n) => 'KES ' + Number(n).toLocaleString()

  return (
    <>
      <style>{`
        .farmart-navbar-search-inline {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 10px;
          border-radius: 10px;
          border: 1px solid var(--farm-green-border);
          background: var(--auth-input, var(--farm-green-soft));
          flex: 1;
          max-width: 420px;
          min-width: 180px;
          transition: border-color 180ms ease, box-shadow 180ms ease;
        }

        .farmart-navbar-search-inline:focus-within {
          border-color: var(--farm-green);
          box-shadow: 0 0 0 3px var(--farm-green-glow);
        }

        .farmart-navbar-search-input {
          flex: 1;
          border: 0;
          outline: 0;
          background: transparent;
          color: var(--farm-text);
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          min-width: 0;
        }

        .farmart-navbar-search-input::placeholder {
          color: var(--farm-muted);
        }

        .farmart-navbar-search-close {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          border: 1px solid var(--farm-green-border);
          background: var(--farm-green-soft);
          color: var(--farm-muted);
          cursor: pointer;
          flex-shrink: 0;
          transition: background 160ms ease, color 160ms ease;
        }

        .farmart-navbar-search-close:hover {
          background: var(--farm-green-border);
          color: var(--farm-text);
        }

        .farmart-search-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          z-index: 2000;
          background: var(--auth-card, var(--farm-white));
          border: 1px solid var(--farm-green-border);
          border-top: 0;
          max-height: 65vh;
          overflow-y: auto;
          box-shadow: 0 20px 50px var(--farm-green-glow);
        }

        .farmart-search-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 22px 18px;
          color: var(--farm-muted);
          font-family: "Modern Antiqua", serif;
          font-size: 13px;
        }

        .farmart-search-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid var(--farm-green-border);
          border-top-color: var(--farm-green);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .farmart-search-error {
          margin: 0;
          padding: 12px 18px;
          color: var(--farm-error);
          font-family: "Modern Antiqua", serif;
          font-size: 13px;
          text-align: center;
        }

        .farmart-search-empty {
          padding: 26px 18px;
          text-align: center;
          color: var(--farm-muted);
          font-family: "Modern Antiqua", serif;
          font-size: 13px;
        }

        .farmart-search-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 18px;
          border: 0;
          border-bottom: 1px solid var(--farm-green-border);
          background: transparent;
          color: var(--farm-text);
          width: 100%;
          text-align: left;
          cursor: pointer;
          transition: background 160ms ease;
          font-family: "Modern Antiqua", serif;
        }

        .farmart-search-item:last-child {
          border-bottom: 0;
        }

        .farmart-search-item:hover,
        .farmart-search-item--active {
          background: var(--farm-green-soft);
        }

        .farmart-search-item-icon {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: var(--farm-green-soft);
          color: var(--farm-green);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
          flex-shrink: 0;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }

        .farmart-search-item-body {
          flex: 1;
          min-width: 0;
        }

        .farmart-search-item-title {
          margin: 0 0 2px;
          font-size: 13px;
          font-weight: 600;
          color: var(--farm-text);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .farmart-search-item-meta {
          margin: 0;
          font-size: 11px;
          color: var(--farm-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .farmart-search-item-price {
          margin: 0;
          font-size: 13px;
          font-weight: 700;
          color: var(--farm-green);
          flex-shrink: 0;
          text-align: right;
        }

        @media (max-width: 600px) {
          .farmart-navbar-search-inline {
            max-width: 100%;
          }

          .farmart-navbar-search-input {
            font-size: 13px;
          }

          .farmart-search-dropdown {
            max-height: 55vh;
          }
        }
      `}</style>

      <header
      className={`farmart-navbar ${scrolled ? 'farmart-navbar--scrolled' : ''}`}
      role="banner"
      style={{ position: 'relative' }}
    >
      <div className="farmart-navbar-inner">
        <Link to="/" className="farmart-navbar-logo" aria-label="Farmart home">
          <img src="/favicon/farm.png" alt="Farmart" className="farmart-navbar-logo-img" />
        </Link>

        <div className="farmart-navbar-actions">
          {searchOpen ? (
            <div className="farmart-navbar-search-inline">
              <Search size={16} strokeWidth={2} style={{ color: 'var(--farm-muted)', flexShrink: 0 }} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
                className="farmart-navbar-search-input"
              />
              <button
                type="button"
                className="farmart-navbar-search-close"
                onClick={handleCloseSearch}
                aria-label="Close search"
              >
                <X size={15} strokeWidth={2} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="farmart-navbar-icon-button"
              onClick={handleSearchClick}
              aria-label="Search"
              title="Search"
            >
              <Search size={18} strokeWidth={2} />
            </button>
          )}

          {isAuthenticated && role === 'buyer' && !searchOpen && (
            <>
              <Link
                to="/buyer/cart"
                className="farmart-navbar-icon-button"
                aria-label="Shopping cart"
                title="Cart"
              >
                <ShoppingCart size={18} strokeWidth={2} />
              </Link>
              <Link
                to="/buyer/wishlist"
                className="farmart-navbar-icon-button"
                aria-label="Saved items"
                title="Wishlist"
              >
                <Heart size={18} strokeWidth={2} />
              </Link>
            </>
          )}

          {!searchOpen && (
            <button
              type="button"
              className="farmart-navbar-icon-button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              title="Toggle theme"
            >
              {isDark ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
            </button>
          )}

          {isAuthenticated && !searchOpen && (
            <div className="farmart-navbar-user" ref={userMenuRef}>
              <button
                type="button"
                className="farmart-navbar-user-button"
                onClick={() => setUserMenuOpen((prev) => !prev)}
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
              >
                <div className="farmart-navbar-avatar">
                  <User size={16} strokeWidth={2} />
                </div>
                <span className="farmart-navbar-user-label">{roleLabel}</span>
                <ChevronDown
                  size={14}
                  strokeWidth={2}
                  className={`farmart-navbar-chevron ${userMenuOpen ? 'farmart-navbar-chevron--open' : ''}`}
                />
              </button>

              {userMenuOpen && (
                <div className="farmart-navbar-dropdown" role="menu">
                  {userMenuItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="farmart-navbar-dropdown-item"
                        role="menuitem"
                      >
                        {Icon && <Icon size={16} strokeWidth={2} />}
                        <span>{item.label}</span>
                        <ArrowRight size={14} strokeWidth={2} className="farmart-navbar-dropdown-arrow" />
                      </Link>
                    )
                  })}
                  <div className="farmart-navbar-dropdown-divider" />
                  <button
                    type="button"
                    className="farmart-navbar-dropdown-item farmart-navbar-dropdown-item--danger"
                    onClick={() => {
                      logout()
                      setUserMenuOpen(false)
                    }}
                    role="menuitem"
                  >
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {!searchOpen && (
            <button
              type="button"
              className="farmart-navbar-mobile-toggle"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
            </button>
          )}
        </div>
      </div>

      {searchOpen && (
        <div className="farmart-search-dropdown" ref={searchDropdownRef}>
          {loading && (
            <div className="farmart-search-loading">
              <div className="farmart-search-spinner" />
              Searching...
            </div>
          )}

          {!loading && error && (
            <p className="farmart-search-error">{error}</p>
          )}

          {!loading && !error && hasSearched && results.length === 0 && (
            <div className="farmart-search-empty">No results found</div>
          )}

          {!loading && !error && results.length > 0 && (
            results.map((item, index) => {
              const label = TYPE_LABEL[item.type] || item.type || 'Listing'
              return (
                <button
                  key={item.id}
                  id={`search-result-${index}`}
                  type="button"
                  className={`farmart-search-item ${activeIndex === index ? 'farmart-search-item--active' : ''}`}
                  onClick={handleSelect}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <div className="farmart-search-item-icon">
                    {label.slice(0, 2)}
                  </div>
                  <div className="farmart-search-item-body">
                    <p className="farmart-search-item-title">{item.title}</p>
                    <p className="farmart-search-item-meta">
                      {label} • {item.location} • {item.farmerName}
                    </p>
                  </div>
                  <p className="farmart-search-item-price">{fmt(item.price)}</p>
                </button>
              )
            })
          )}
        </div>
      )}

      {mobileOpen && (
        <div className="farmart-navbar-mobile-backdrop" onClick={() => setMobileOpen(false)} aria-hidden="true" />
      )}

      {!searchOpen && (
        <div className={`farmart-navbar-mobile ${mobileOpen ? 'farmart-navbar-mobile--open' : ''}`}>
          <div className="farmart-navbar-mobile-inner">
            <nav className="farmart-navbar-mobile-links" aria-label="Mobile primary">

              {isAuthenticated && role === 'buyer' && (
                <>
                  <Link
                    to="/buyer/cart"
                    className="farmart-navbar-mobile-link"
                    onClick={() => setMobileOpen(false)}
                  >
                    <ShoppingCart size={18} strokeWidth={2} />
                    <span>Cart</span>
                  </Link>
                  <Link
                    to="/buyer/wishlist"
                    className="farmart-navbar-mobile-link"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Heart size={18} strokeWidth={2} />
                    <span>Saved Items</span>
                  </Link>
                </>
              )}
            </nav>

            <div className="farmart-navbar-mobile-actions">
              <button
                type="button"
                className="farmart-navbar-mobile-theme"
                onClick={() => {
                  toggleTheme()
                }}
              >
                {isDark ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
                <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
              </button>

              {isAuthenticated && (
                <>
                  {userMenuItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="farmart-navbar-mobile-link"
                        onClick={() => setMobileOpen(false)}
                      >
                        {Icon && <Icon size={18} strokeWidth={2} />}
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                  <button
                    type="button"
                    className="farmart-navbar-mobile-link farmart-navbar-mobile-link--danger"
                    onClick={() => {
                      logout()
                      setMobileOpen(false)
                    }}
                  >
                    <span>Sign Out</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
    </>
  )
}