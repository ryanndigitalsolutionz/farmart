import React from 'react'

export default function FarmerCard({ farmer = {} }) {
  const data = {
    name: farmer.name || "Kiprono Arap Koech",
    farm: farmer.farmName || "Green Rift Livestock Farm",
    location: farmer.location || "Eldoret, Kenya",
    rating: farmer.rating || 4.8,
    verified: farmer.verified ?? true
  }

  return (
    <div className="bg-white p-5 rounded-xl border border-[var(--farm-green-border)] shadow-sm flex items-center space-x-4">
      <div className="w-14 h-14 rounded-full bg-[var(--farm-green-soft)] flex items-center justify-center text-[var(--farm-green-dark)] font-bold text-lg">
        {data.name.split(' ').map(n => n[0]).join('')}
      </div>
      <div>
        <div className="flex items-center space-x-2">
          <h4 className="font-bold text-[var(--farm-green-dark)]">{data.name}</h4>
          {data.verified && (
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full">Verified</span>
          )}
        </div>
        <p className="text-xs text-[var(--farm-muted)]">{data.farm} • {data.location}</p>
        <p className="text-xs font-semibold text-[var(--farm-green)] mt-1">Rating: {data.rating} / 5.0</p>
      </div>
    </div>
  )
}