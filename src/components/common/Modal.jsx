function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
}) {
  if (!isOpen) {
    return null
  }

  return (
    <>
      <div
        className="fixed inset-0 z-[1000] flex items-center justify-center bg-[rgba(20,35,26,0.40)] p-3 backdrop-blur-[7px] sm:p-5"
        onMouseDown={onClose}
      >
        <section
          className={`flex max-h-[calc(100vh-24px)] w-full flex-col overflow-hidden rounded-[18px] border border-white/65 bg-white/94 shadow-[0_25px_75px_rgba(25,52,34,0.22),inset_0_1px_0_rgba(255,255,255,0.85)] sm:max-h-[calc(100vh-40px)] sm:rounded-[22px] ${size === 'small' ? 'max-w-[380px]' : size === 'large' ? 'max-w-[820px]' : 'max-w-[560px]'}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="farmart-modal-title"
          onMouseDown={(event) => event.stopPropagation()}
        >
          <header className="flex items-center justify-between gap-5 border-b border-[#e0e8e2] px-[18px] py-[17px] sm:px-[22px] sm:py-5">

            <h2
              id="farmart-modal-title"
              className="m-0 font-serif text-[22px] font-bold text-[#17351f]"
            >
              {title}
            </h2>

            <button
              type="button"
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-[#d6e1d8] bg-[#f5f8f5] text-xl leading-none text-[#55705e] transition-colors hover:border-[#b8ccb9] hover:bg-white hover:text-[#277a44]"
              onClick={onClose}
              aria-label="Close modal"
            >
              ×
            </button>

          </header>

          <div className="overflow-y-auto p-5 font-serif text-[#405448] sm:p-6">
            {children}
          </div>

        </section>
      </div>
    </>
  )
}

export default Modal
