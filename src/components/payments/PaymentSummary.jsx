function PaymentSummary({
  items = [],
  subtotal = 0,
  total = subtotal,
}) {
  return (
    <section className="box-border w-full rounded-[18px] border border-[#d5e1d8] bg-[#f7faf7] p-6 shadow-[5px_5px_12px_rgba(47,72,55,0.08),-5px_-5px_12px_rgba(255,255,255,0.85)]">

        <h2 className="mb-5 mt-0 font-serif text-[21px] font-bold text-[#284533]">
          Order Summary
        </h2>

        {items.length > 0 ? (
          <div className="flex flex-col gap-[13px]">
            {items.map((item) => (
              <div
                className="flex justify-between gap-4 font-serif text-sm text-[#617268]"
                key={item.id}
              >
                <span className="min-w-0 truncate">
                  {item.name}
                  {item.quantity
                    ? ` × ${item.quantity}`
                    : ''}
                </span>

                <span className="shrink-0 font-semibold text-[#3e5647]">
                  KES {Number(item.subtotal ?? item.price ?? 0).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="font-serif text-sm text-[#7b8980]">
            No items in this order.
          </p>
        )}

        <div className="my-5 mb-4 h-px bg-[#d5e1d8]" />

        <div className="flex justify-between gap-4 font-serif text-sm text-[#68796f]">
          <span>Subtotal</span>
          <span>
            KES {Number(subtotal).toLocaleString()}
          </span>
        </div>

        <div className="mt-3 flex justify-between gap-4 font-serif text-[22px] font-bold text-[#277a44]">
          <span>Total</span>
          <span>
            KES {Number(total).toLocaleString()}
          </span>
        </div>

    </section>
  )
}

export default PaymentSummary
