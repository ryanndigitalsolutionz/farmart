import React from 'react'

export default function FarmerInfo({ info = {} }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-[var(--farm-green-border)] shadow-sm">
      <h3 className="text-lg font-bold font-[IBM_Plex_Serif] text-[var(--farm-green-dark)] mb-4">Farmer Details</h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between py-2 border-b border-gray-100">
          <span className="text-[var(--farm-muted)]">Phone Number</span>
          <span className="font-semibold text-[var(--farm-green-dark)]">{info.phone || "+254 712 345 678"}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-100">
          <span className="text-[var(--farm-muted)]">Email Address</span>
          <span className="font-semibold text-[var(--farm-green-dark)]">{info.email || "kiprono.koech@farmart.co.ke"}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-100">
          <span className="text-[var(--farm-muted)]">Primary Location</span>
          <span className="font-semibold text-[var(--farm-green-dark)]">{info.location || "Eldoret, Kenya"}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-[var(--farm-muted)]">Member Since</span>
          <span className="font-semibold text-[var(--farm-green-dark)]">{info.joinedDate || "January 2026"}</span>
        </div>
      </div>
    </div>
  )
}