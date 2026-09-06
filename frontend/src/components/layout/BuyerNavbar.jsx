import { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaMoon, FaSun } from 'react-icons/fa'
import {
  FiHeart,
  FiLogOut,
  FiMenu,
  FiSearch,
  FiShoppingBag,
  FiStar,
  FiUser,
  FiX,
} from 'react-icons/fi'

import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'

const NAV_LINKS = [
  { label: 'Marketplace', path: '/buyer/marketplace' },
  { label: 'Orders', path: '/buyer/orders' },
]


function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function BuyerNavbar() {
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()
  const { cart } = useCart()
  const { wishlist } = useWishlist()
  const { user, logout } = useAuth()

  const buyerName = [
    user?.first_name,
    user?.last_name, 
  ].filter(Boolean).join(' ')

  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [query, setQuery] = useState('')

  const searchRef = useRef(null)
  const profileRef = useRef(null)

  const cartCount = cart?.length ?? 0
  const wishlistCount = wishlist?.length ?? 0

  const [cartBump, setCartBump] = useState(false)
  const isFirstCartRender = useRef(true)

  useEffect(() => {
    if (isFirstCartRender.current) {
      isFirstCartRender.current = false
      return
    }

    setCartBump(true)

    const timer = setTimeout(() => {
      setCartBump(false)
    }, 400)

    return () => clearTimeout(timer)
  }, [cartCount])

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setSearchOpen(false)
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setProfileOpen(false)
  }, [])

  const handleSearchSubmit = (event) => {
    event.preventDefault()

    const trimmed = query.trim()

    navigate(
      trimmed
        ? `/buyer/marketplace?q=${encodeURIComponent(trimmed)}`
        : '/buyer/marketplace',
    )

    setSearchOpen(false)
    setMobileOpen(false)
  }

  const handleLogout = () => {
    logout()
    setProfileOpen(false)
    navigate('/login')
  }

  const navLinkClass = ({ isActive }) =>
    [
      'relative px-0.5 py-1.5',
      'font-[var(--farm-body-font)] text-[15px] font-medium',
      'text-[var(--farm-muted)] no-underline',
      'transition-colors duration-150',
      'after:absolute after:bottom-0 after:left-0 after:right-0',
      'after:h-0.5 after:rounded-full',
      'after:bg-[var(--farm-green)]',
      'after:origin-left after:transition-transform after:duration-200',
      isActive
        ? 'font-bold text-[var(--farm-green-dark)] after:scale-x-100'
        : 'after:scale-x-0 hover:text-[var(--farm-green-dark)]',
    ].join(' ')

  const iconButtonClass = [
    'relative flex h-10 w-10 shrink-0 items-center justify-center',
    'rounded-full border',
    'border-[var(--farm-green-border)]',
    'bg-[var(--farm-white)]',
    'text-[var(--farm-green-dark)]',
    'shadow-[4px_4px_9px_rgba(29,78,42,0.08),-3px_-3px_8px_rgba(255,255,255,0.55)]',
    'transition-all duration-150',
    'hover:border-[var(--farm-green)]',
    'hover:text-[var(--farm-green)]',
    'cursor-pointer no-underline',
    "dark:bg-[var(--farm-green-soft)]",
    "dark:text-[var(--farm-gold)]",
    "dark:shadow-[5px_5px_10px_rgba(0,0,0,0.24),-3px_-3px_8px_rgba(45,66,53,0.12)]",
  ].join(' ')

  const mobileLinkClass = ({ isActive }) =>
    [
      'flex items-center justify-between',
      'rounded-[10px] border-0',
      'bg-transparent px-3.5 py-3',
      'font-[var(--farm-body-font)] text-[15px]',
      'text-[var(--farm-green-dark)] no-underline',
      'text-left',
      'transition-colors duration-150',
      'hover:bg-[var(--farm-green-soft)]',
      isActive && 'bg-[var(--farm-green-soft)] font-bold',
    ]
      .filter(Boolean)
      .join(' ')

  return (
    <header
      className="
        sticky top-0 z-[1000] w-full
        border-b border-[var(--farm-green-border)]
        bg-[rgba(244,248,242,0.88)]
        font-[var(--farm-body-font)]
        backdrop-blur-[16px]
        transition-colors duration-200
        dark:bg-[rgba(20,32,26,0.9)]
      "
    >
      {/* Navbar */}
      <div
        className="
          mx-auto flex min-h-[76px] w-full max-w-[1440px]
          items-center justify-between gap-6
          px-7 py-2.5
          max-[600px]:min-h-[68px]
          max-[600px]:gap-3
          max-[600px]:px-4
        "
      >
        {/* Left */}
        <div className="flex min-w-0 items-center gap-7">
          {/* Burger */}
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="
              hidden h-10 w-10 shrink-0
              items-center justify-center
              rounded-full border
              border-[var(--farm-green-border)]
              bg-[var(--farm-white)]
              text-[var(--farm-green-dark)]
              cursor-pointer
              max-[900px]:flex
              max-[600px]:h-9 max-[600px]:w-9
            "
          >
            {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>

          {/* Logo */}
          <NavLink
            to="/buyer/marketplace"
            aria-label="Farmart buyer home"
            className="
              inline-flex shrink-0 items-center gap-2.5
              font-[var(--farm-heading-font)]
              text-xl font-semibold
              text-[var(--farm-text)]
              no-underline
            "
          >
            <img
              src="/favicon/farm.png"
              alt=""
              className="h-8 w-8 object-contain"
            />

            <span className="max-[600px]:hidden">
              Farmart
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav
            aria-label="Buyer navigation"
            className="
              flex items-center gap-[22px]
              max-[900px]:hidden
            "
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={navLinkClass}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Right */}
        <div className="flex shrink-0 items-center gap-2.5">
          {/* Search */}
          <div
            ref={searchRef}
            className="relative flex items-center max-[860px]:hidden"
          >
            <form
              onSubmit={handleSearchSubmit}
              className={`
                flex items-center gap-2 overflow-hidden
                rounded-full border
                bg-[var(--farm-green-soft)]
                transition-all duration-200
                ${
                  searchOpen
                    ? 'w-[230px] border-[var(--farm-green-border)] px-3'
                    : 'w-0 border-transparent p-0'
                }
              `}
            >
              <FiSearch
                size={16}
                className="shrink-0 text-[var(--farm-muted)]"
              />

              <input
                type="text"
                value={query}
                placeholder="Search livestock & produce"
                onChange={(event) => setQuery(event.target.value)}
                onFocus={() => setSearchOpen(true)}
                aria-label="Search Farmart"
                className="
                  min-w-0 w-full
                  border-0 bg-transparent
                  py-[9px] outline-none
                  font-[var(--farm-body-font)]
                  text-sm 
                  text-[var(--farm-green-dark)]
                  placeholder:text-[var(--farm-muted)]
                "
              />
            </form>

            {!searchOpen && (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Toggle search"
                className={iconButtonClass}
              >
                <FiSearch size={17} />
              </button>
            )}
          </div>

          {/* Wishlist */}
          <NavLink
            to="/buyer/wishlist"
            aria-label={`Wishlist, ${wishlistCount} item${
              wishlistCount === 1 ? '' : 's'
            }`}
            className={iconButtonClass}
          >
            <FiHeart size={17} />

            {wishlistCount > 0 && (
              <span
                className="
                  absolute -right-1 -top-1
                  flex h-[17px] min-w-[17px]
                  items-center justify-center
                  rounded-full
                  bg-[var(--farm-gold)]
                  px-1
                  text-[10px] font-bold leading-none
                  text-[var(--farm-green-dark)]
                "
              >
                {wishlistCount}
              </span>
            )}
          </NavLink>

          {/* Cart */}
          <NavLink
            to="/buyer/cart"
            aria-label={`Cart, ${cartCount} item${
              cartCount === 1 ? '' : 's'
            }`}
            className={`
              ${iconButtonClass}
              ${cartBump ? 'animate-buyer-navbar-bump' : ''}
            `}
          >
            <FiShoppingBag size={17} />

            {cartCount > 0 && (
              <span
                className="
                  absolute -right-1 -top-1
                  flex h-4.25 min-w-4.25
                  items-center justify-center
                  rounded-full
                  bg-[var(--farm-gold)]
                  px-1
                  text-[10px] font-bold leading-none
                  text-[var(--farm-green-dark)]
                "
              >
                {cartCount}
              </span>
            )}
          </NavLink>

          {/* Theme */}
          <button
            type="button"
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
            className={iconButtonClass}
          >
            {isDark ? (
              <FaSun size={16} />
            ) : (
              <FaMoon size={16} />
            )}
          </button>

          {/* Profile */}
          <div
            ref={profileRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() => setProfileOpen((open) => !open)}
              aria-label="Account menu"
              aria-expanded={profileOpen}
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-full border
                border-[var(--farm-green-border)]
                bg-[var(--farm-green)]
                font-[var(--farm-heading-font)]
                text-[13px] font-bold
                text-[var(--farm-white)]
                cursor-pointer
                max-[600px]:h-9 max-[600px]:w-9
              "
            >
              {getInitials(buyerName || 'User')}
            </button>

            {profileOpen && (
              <div
                role="menu"
                className="
                  absolute right-0 top-[50px] z-[1100]
                  flex w-[220px] flex-col
                  overflow-hidden
                  rounded-[14px]
                  border border-[var(--farm-green-border)]
                  bg-[var(--farm-white)]
                  shadow-[0_14px_30px_rgba(23,61,40,0.14)]
                  dark:bg-[var(--farm-background)]
                "
              >
                <div
                  className="
                    flex flex-col gap-0.5
                    border-b border-[var(--farm-green-border)]
                    bg-[var(--farm-green-soft)]
                    px-4 py-3.5
                  "
                >
                  <span
                    className="
                      font-[var(--farm-heading-font)]
                      text-sm font-bold
                      text-[var(--farm-green-dark)]
                    "
                  >
                    {buyerName || 'User'}
                  </span>

                  <span className="text-xs text-[var(--farm-muted)]">
                    {user?.email || ''}
                  </span>
                </div>

                <NavLink
                  to="/buyer/profile"
                  role="menuitem"
                  onClick={() => setProfileOpen(false)}
                  className="
                    flex items-center gap-2.5
                    px-4 py-[11px]
                    text-left text-sm
                    text-[var(--farm-green-dark)]
                    no-underline
                    transition-colors duration-150
                    hover:bg-[var(--farm-green-soft)]
                  "
                >
                  <FiUser size={15} />
                  Profile
                </NavLink>

                <NavLink
                  to="/buyer/orders"
                  role="menuitem"
                  onClick={() => setProfileOpen(false)}
                  className="
                    flex items-center gap-2.5
                    px-4 py-[11px]
                    text-left text-sm
                    text-[var(--farm-green-dark)]
                    no-underline
                    transition-colors duration-150
                    hover:bg-[var(--farm-green-soft)]
                  "
                >
                  <FiShoppingBag size={15} />
                  My orders
                </NavLink>

                <NavLink
                  to="/buyer/reviews"
                  role="menuitem"
                  onClick={() => setProfileOpen(false)}
                  className="
                    flex items-center gap-2.5
                    px-4 py-[11px]
                    text-left text-sm
                    text-[var(--farm-green-dark)]
                    no-underline
                    transition-colors duration-150
                    hover:bg-[var(--farm-green-soft)]
                  "
                >
                  <FiStar size={15} />
                  My reviews
                </NavLink>

                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                  className="
                    flex items-center gap-2.5
                    border-0
                    border-t border-[var(--farm-green-border)]
                    bg-transparent
                    px-4 py-[11px]
                    text-left text-sm
                    text-[var(--farm-error)]
                    cursor-pointer
                    hover:bg-[var(--farm-green-soft)]
                  "
                >
                  <FiLogOut size={15} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="
            flex flex-col gap-1
            border-t border-[var(--farm-green-border)]
            bg-[var(--farm-background)]
            px-5 pb-5 pt-3
            min-[901px]:hidden
          "
        >
          {/* Mobile Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="
              mb-2 flex items-center gap-2
              rounded-[14px]
              border border-[var(--farm-green-border)]
              bg-[var(--farm-green-soft)]
              px-3.5 py-2.5
              text-[var(--farm-muted)]
            "
          >
            <FiSearch size={16} />

            <input
              type="text"
              value={query}
              placeholder="Search livestock & produce"
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search Farmart"
              className="
                w-full border-0 bg-transparent
                text-sm
                text-[var(--farm-green-dark)]
                outline-none
                placeholder:text-[var(--farm-muted)]
              "
            />
          </form>

          {/* Mobile Links */}
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={mobileLinkClass}
            >
              {link.label}
            </NavLink>
          ))}

          <NavLink
            to="/buyer/wishlist"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-between rounded-[10px] px-3.5 py-3 text-[15px] text-[var(--farm-green-dark)] no-underline hover:bg-[var(--farm-green-soft)]"
          >
            Wishlist

            {wishlistCount > 0 && (
              <span
                className="
                  flex h-5 min-w-5
                  items-center justify-center
                  rounded-full
                  bg-[var(--farm-gold)]
                  px-1.5
                  text-[11px] font-bold
                  text-[var(--farm-green-dark)]
                "
              >
                {wishlistCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/buyer/cart"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-between rounded-[10px] px-3.5 py-3 text-[15px] text-[var(--farm-green-dark)] no-underline hover:bg-[var(--farm-green-soft)]"
          >
            Cart

            {cartCount > 0 && (
              <span
                className="
                  flex h-5 min-w-5
                  items-center justify-center
                  rounded-full
                  bg-[var(--farm-gold)]
                  px-1.5
                  text-[11px] font-bold
                  text-[var(--farm-green-dark)]
                "
              >
                {cartCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/buyer/profile"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-between rounded-[10px] px-3.5 py-3 text-[15px] text-[var(--farm-green-dark)] no-underline hover:bg-[var(--farm-green-soft)]"
          >
            Profile
          </NavLink>

          <button
            type="button"
            onClick={handleLogout}
            className="
              mt-1 flex items-center justify-between
              rounded-[10px]
              border-0 bg-transparent
              px-3.5 py-3
              text-left text-[15px]
              text-[var(--farm-error)]
              cursor-pointer
              hover:bg-[var(--farm-green-soft)]
            "
          >
            Sign out
          </button>
        </div>
      )}
    </header>
  )
}

export default BuyerNavbar;