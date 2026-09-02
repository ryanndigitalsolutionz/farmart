import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { motion } from 'framer-motion'
import { Leaf, Store, Tractor, HelpCircle, ChevronRight } from 'lucide-react'
import FarmartLogo from '../branding/FarmartLogo'

const FOOTER_COLUMNS = [
  {
    title: 'Marketplace',
    links: [
      { to: '/buyer/marketplace', label: 'Browse Marketplace' },
      { to: '/buyer/marketplace', label: 'Livestock' },
      { to: '/buyer/marketplace', label: 'Farm Produce' },
    ],
  },
  {
    title: 'For Farmers',
    links: [
      { to: '/register', label: 'Become a Farmer' },
      { to: '/farmer/listings/new', label: 'Create Listing' },
      { to: '/farmer', label: 'Farmer Dashboard' },
      { to: '/farm-setup', label: 'Farm Setup' },
    ],
  },
  {
    title: 'Support',
    links: [
      { to: '/help', label: 'Help Center' },
      { to: '/contact', label: 'Contact' },
      { to: '/faqs', label: 'FAQs' },
      { to: '/report', label: 'Report a Problem' },
    ],
  },
  {
    title: 'Account',
    links: [],
  },
]

const SOCIAL_LINKS = []

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export default function Footer() {
  const { isAuthenticated, logout, role } = useAuth()
  const { isDark } = useTheme()
  const location = useLocation()

  const accountLinks = isAuthenticated
    ? [
        { to: role === 'admin' ? '/admin' : role === 'farmer' ? '/farmer' : '/buyer', label: 'Dashboard' },
        { to: '/buyer/profile', label: 'Profile' },
        { to: '/buyer/orders', label: 'Orders' },
        { to: '/buyer/settings', label: 'Settings' },
      ]
    : [
        { to: '/login', label: 'Sign In' },
        { to: '/register', label: 'Create Account' },
      ]

  return (
    <footer className={`farmart-footer ${isDark ? 'farmart-footer--dark' : ''}`} role="contentinfo">
      <div className="farmart-footer-inner">
        <div className="farmart-footer-grid">
          <motion.div
            className="farmart-footer-brand"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={itemVariants}
          >
            <FarmartLogo size="md" />
            <p>
              A digital marketplace connecting farmers and buyers across Kenya. Safe,
              transparent, and community-first.
            </p>
            {SOCIAL_LINKS.length > 0 && (
              <div className="farmart-footer-socials">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="farmart-footer-social-link"
                      aria-label={social.label}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <Icon size={18} strokeWidth={2} />
                    </a>
                  )
                })}
              </div>
            )}
          </motion.div>

          {FOOTER_COLUMNS.map((column, colIndex) => {
            const links =
              column.title === 'Account' ? accountLinks : column.links
            return (
              <motion.div
                key={column.title}
                className="farmart-footer-column"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={itemVariants}
                custom={colIndex + 1}
              >
                <h3>{column.title}</h3>
                <ul>
                  {links.map((link) => (
                    <li key={link.to + link.label}>
                      <Link
                        to={link.to}
                        className="farmart-footer-link"
                        state={{ scroll: true }}
                      >
                        <span>{link.label}</span>
                        <ChevronRight size={14} strokeWidth={2} className="farmart-footer-link-arrow" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        <div className="farmart-footer-bottom">
          <span>© {new Date().getFullYear()} Farmart. All rights reserved.</span>
          <div className="farmart-footer-legal">
            <Link to="/privacy" className="farmart-footer-legal-link">Privacy Policy</Link>
            <Link to="/terms" className="farmart-footer-legal-link">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
