import React from 'react'

export default function FarmerRating() {
  const reviews = [
    { id: 1, buyer: "Mercy Chebet", rating: 5, comment: "Healthy Boran cow delivered right on schedule to Nakuru. Excellent seller!", date: "2 May 2026" },
    { id: 2, buyer: "Brian Otieno", rating: 5, comment: "Smooth transaction via M-Pesa. Animal condition matched description precisely.", date: "18 Apr 2026" },
    { id: 3, buyer: "Abdi Rahman", rating: 4, comment: "Good quality Dorper sheep. Communication was very straightforward.", date: "5 Apr 2026" }
  ]

  return (
    <div className="bg-white p-6 rounded-2xl border border-[var(--farm-green-border)] shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold font-[IBM_Plex_Serif] text-[var(--farm-green-dark)]">Buyer Ratings & Reviews</h3>
        <span className="px-3 py-1 bg-amber-50 text-amber-800 text-xs font-bold rounded-full">4.8 / 5.0 Average</span>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="p-4 rounded-xl border border-[var(--farm-green-border)] bg-[var(--farm-background)]">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-sm text-[var(--farm-green-dark)]">{rev.buyer}</span>
              <span className="text-xs text-[var(--farm-muted)]">{rev.date}</span>
            </div>
            <p className="text-xs font-semibold text-amber-600 mb-2">{"★".repeat(rev.rating)}</p>
            <p className="text-xs text-[var(--farm-muted)]">{rev.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}