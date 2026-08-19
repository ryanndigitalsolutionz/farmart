import { Heart } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-logo">Farmart</span>
          <p>Quality livestock. Fair prices. Trusted farmers. No middlemen.</p>
        </div>
        <div className="footer-bottom">
          <p> Made with <Heart size={14} /> for Kenyan Farmers & Buyers</p>
          <p>© {new Date().getFullYear()} Farmart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
