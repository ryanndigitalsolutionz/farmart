import React, { useState } from 'react'
import { farmerProfileData } from '../../data/farmerMockData'

export default function FarmerProfile() {
  const [profile, setProfile] = useState(farmerProfileData)
  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleSave = (e) => {
    e.preventDefault()
    setIsEditing(false)
    alert("Profile updated successfully!")
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border border-[var(--farm-green-border)] shadow-sm max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold font-[IBM_Plex_Serif] text-[var(--farm-green-dark)]">Profile Management</h3>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-[var(--farm-green-soft)] text-[var(--farm-green-dark)] text-xs font-bold rounded-xl hover:bg-emerald-100 transition-colors"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[var(--farm-green-dark)] mb-1">Full Name</label>
            <input type="text" name="name" value={profile.name} onChange={handleChange} className="w-full px-4 py-2 bg-[var(--farm-background)] border border-[var(--farm-green-border)] rounded-xl text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--farm-green-dark)] mb-1">Farm Name</label>
            <input type="text" name="farmName" value={profile.farmName} onChange={handleChange} className="w-full px-4 py-2 bg-[var(--farm-background)] border border-[var(--farm-green-border)] rounded-xl text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--farm-green-dark)] mb-1">Phone Number</label>
            <input type="text" name="phone" value={profile.phone} onChange={handleChange} className="w-full px-4 py-2 bg-[var(--farm-background)] border border-[var(--farm-green-border)] rounded-xl text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--farm-green-dark)] mb-1">Bio</label>
            <textarea name="bio" rows="3" value={profile.bio} onChange={handleChange} className="w-full px-4 py-2 bg-[var(--farm-background)] border border-[var(--farm-green-border)] rounded-xl text-sm"></textarea>
          </div>
          <button type="submit" className="px-6 py-2.5 bg-[var(--farm-green)] text-white text-xs font-bold rounded-xl hover:bg-[var(--farm-green-dark)] transition-colors">
            Save Changes
          </button>
        </form>
      ) : (
        <div className="space-y-4 text-sm">
          <div>
            <p className="text-xs text-[var(--farm-muted)]">Full Name</p>
            <p className="font-semibold text-[var(--farm-green-dark)]">{profile.name}</p>
          </div>
          <div>
            <p className="text-xs text-[var(--farm-muted)]">Farm Name</p>
            <p className="font-semibold text-[var(--farm-green-dark)]">{profile.farmName}</p>
          </div>
          <div>
            <p className="text-xs text-[var(--farm-muted)]">Phone Number</p>
            <p className="font-semibold text-[var(--farm-green-dark)]">{profile.phone}</p>
          </div>
          <div>
            <p className="text-xs text-[var(--farm-muted)]">Biography</p>
            <p className="font-semibold text-[var(--farm-green-dark)]">{profile.bio}</p>
          </div>
        </div>
      )}
    </div>
  )
}