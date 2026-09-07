import { useNavigate } from 'react-router-dom'
import { FiShoppingBag, FiX } from 'react-icons/fi'

import { useCart } from '../../context/CartContext'

function CartToast() {
  const navigate = useNavigate()
  const { toast, dismissToast } = useCart()

  if (!toast) {
    return null
  }

  return (
    <div
      className="
        fixed bottom-7 left-1/2 z-[1400]
        flex w-[calc(100vw-32px)] max-w-[360px]
        -translate-x-1/2
        items-center gap-3
        rounded-xl
        bg-[var(--farm-green-dark)]
        p-3 pl-3.5
        shadow-[0_10px_24px_rgba(0,0,0,0.22)]
        font-[var(--farm-body-font)]
        animate-[cart-toast-in_220ms_ease]
      "
      role="status"
      aria-live="polite"
    >
      {/* Icon */}
      <div
        className="
          flex h-[30px] w-[30px] shrink-0
          items-center justify-center
          rounded-full
          bg-[var(--farm-green)]
          text-white
        "
      >
        <FiShoppingBag size={15} />
      </div>

      {/* Message */}
      <div className="flex min-w-0 flex-1 flex-col gap-px">
        <span className="text-[13px] font-bold text-white">
          {toast.message}
        </span>

        {toast.name && (
          <span className="truncate text-[11px] text-[#b8c9bc]">
            {toast.name}
            {toast.price != null &&
              ` · KSh ${Number(toast.price).toLocaleString()}`}
          </span>
        )}
      </div>

      {/* View cart */}
      <button
        type="button"
        className="
          shrink-0
          border-0
          bg-transparent
          px-0 py-0.5
          text-[11px]
          font-bold
          text-[var(--farm-green-soft)]
          border-b
          border-[var(--farm-green-soft)]
          cursor-pointer
        "
        onClick={() => {
          dismissToast()
          navigate('/buyer/cart')
        }}
      >
        View cart
      </button>

      {/* Close */}
      <button
        type="button"
        className="
          flex h-[22px] w-[22px] shrink-0
          items-center justify-center
          rounded-full
          border-0
          bg-transparent
          text-[#8fa598]
          cursor-pointer
          transition-colors
          hover:bg-white/10
          hover:text-white
        "
        onClick={dismissToast}
        aria-label="Dismiss"
      >
        <FiX size={14} />
      </button>
    </div>
  )
}

export default CartToast
