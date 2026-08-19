import { Loader2 } from 'lucide-react'

const Spinner = ({ size = 24, className = '' }) => {
  return (
    <div className={`spinner ${className}`}>
      <Loader2 size={size} className="spinner-icon" />
    </div>
  )
}

export default Spinner
