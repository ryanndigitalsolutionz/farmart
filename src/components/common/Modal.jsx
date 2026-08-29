function Modal({ isOpen, onClose, title, children}) {
    if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black/50 flex 
                    items-center justify-center z-50 p-4"
        onClick={onClose}
    >
        <div 
            className="bg-white rounded-2xl shadow-lg p-5 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex justify-between items-center mb-3">
                {title && (
                    <h2 className="font-bold text-lg text-green-900">{title}</h2>
                )}
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="text-gray-400 hover:text-gray-700 font-bold 
                    text-xl leading-none cursor-pointer"
                >
                    &times;
                </button>

            </div>

            {children}
        </div>
    </div>
  )
}

export default Modal;