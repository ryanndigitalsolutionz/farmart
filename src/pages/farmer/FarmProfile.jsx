import React, { useState } from 'react'
import { 
  Store, 
  MapPin, 
  Phone, 
  Mail, 
  Edit3, 
  Save, 
  Camera, 
  CheckCircle2, 
  Sprout, 
  ShieldCheck, 
  Award,
  ArrowLeft
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function FarmProfile() {
  // State for editable farm profile information
  const [isEditing, setIsEditing] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const [profile, setProfile] = useState({
    farmName: "GreenVibe Organic Farms",
    ownerName: "Martin Waraho",
    email: "martin.waraho@farmart.co.ke",
    phone: "+254 712 345 678",
    location: "Kiambu County, Limuru Ward",
    farmSize: "12 Acres",
    primaryProduce: "Organic Vegetables, Hass Avocados, Tomatoes",
    bio: "Passionate about sustainable, chemical-free farming and supplying fresh, high-quality agricultural produce directly to buyers across Nairobi and surrounding regions.",
    certifications: ["Kephis Certified Organic", "Kenya National Farmers Federation Member"],
    establishedYear: "2022"
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    setIsEditing(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen bg-[var(--farm-background)] text-[var(--farm-text)] p-6 md:p-10 font-[Modern_Antiqua]">
      {/* Top Navigation / Header bar */}
      <div className="max-w-5xl mx-auto mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link 
            to="/farmer/dashboard" 
            className="inline-flex items-center text-sm font-semibold text-[var(--farm-green)] hover:underline mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold font-[IBM_Plex_Serif] text-[var(--farm-green-dark)]">
            Farm Profile & Settings
          </h1>
          <p className="text-sm text-[var(--farm-muted)]">
            Manage your farm identity, contact details, and public store presentation.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[var(--farm-green)] text-white font-medium hover:bg-[var(--farm-green-dark)] transition-colors shadow-sm"
        >
          {isEditing ? (
            <>Cancel Editing</>
          ) : (
            <>
              <Edit3 className="w-4 h-4 mr-2" /> Edit Profile
            </>
          )}
        </button>
      </div>

      {/* Success Banner */}
      {saveSuccess && (
        <div className="max-w-5xl mx-auto mb-6 p-4 rounded-xl bg-[var(--farm-green-soft)] border border-[var(--farm-green-border)] flex items-center space-x-3 text-[var(--farm-green-dark)] animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-[var(--farm-green)] flex-shrink-0" />
          <span className="font-medium">Farm profile updated successfully!</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-[var(--farm-green-border)] shadow-sm overflow-hidden">
        
        {/* Banner & Avatar Header */}
        <div className="relative h-48 bg-gradient-to-r from-[var(--farm-green)] to-[var(--farm-green-dark)]">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div className="absolute -bottom-10 left-8 flex items-end space-x-4">
            <div className="relative w-28 h-28 rounded-2xl bg-white border-4 border-white shadow-md overflow-hidden flex items-center justify-center bg-[var(--farm-green-soft)]">
              <Store className="w-12 h-12 text-[var(--farm-green)]" />
              {isEditing && (
                <button className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-90 hover:opacity-100 transition-opacity">
                  <Camera className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Profile Content Body */}
        <div className="pt-14 px-8 pb-10">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[var(--farm-green-border)] pb-6 mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold font-[IBM_Plex_Serif] text-[var(--farm-green-dark)]">
                {profile.farmName}
              </h2>
              <p className="text-sm text-[var(--farm-muted)] flex items-center mt-1">
                <MapPin className="w-4 h-4 mr-1 text-[var(--farm-green)]" /> {profile.location} • Established {profile.establishedYear}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[var(--farm-green-soft)] text-[var(--farm-green-dark)] border border-[var(--farm-green-border)]">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[var(--farm-green)]" /> Verified Producer
              </span>
            </div>
          </div>

          {/* Form / Details View */}
          <form onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              
              <div>
                <label className="block text-sm font-semibold text-[var(--farm-green-dark)] mb-2">
                  Farm Name
                </label>
                <input
                  type="text"
                  name="farmName"
                  value={profile.farmName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--farm-green-border)] bg-[var(--farm-background)] disabled:bg-white text-[var(--farm-text)] focus:outline-none focus:ring-2 focus:ring-[var(--farm-green)] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--farm-green-dark)] mb-2">
                  Owner / Manager Name
                </label>
                <input
                  type="text"
                  name="ownerName"
                  value={profile.ownerName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--farm-green-border)] bg-[var(--farm-background)] disabled:bg-white text-[var(--farm-text)] focus:outline-none focus:ring-2 focus:ring-[var(--farm-green)] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--farm-green-dark)] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[var(--farm-muted)]" />
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--farm-green-border)] bg-[var(--farm-background)] disabled:bg-white text-[var(--farm-text)] focus:outline-none focus:ring-2 focus:ring-[var(--farm-green)] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--farm-green-dark)] mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 w-4 h-4 text-[var(--farm-muted)]" />
                  <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--farm-green-border)] bg-[var(--farm-background)] disabled:bg-white text-[var(--farm-text)] focus:outline-none focus:ring-2 focus:ring-[var(--farm-green)] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--farm-green-dark)] mb-2">
                  Farm Location / Region
                </label>
                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--farm-green-border)] bg-[var(--farm-background)] disabled:bg-white text-[var(--farm-text)] focus:outline-none focus:ring-2 focus:ring-[var(--farm-green)] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--farm-green-dark)] mb-2">
                  Farm Size / Acreage
                </label>
                <input
                  type="text"
                  name="farmSize"
                  value={profile.farmSize}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--farm-green-border)] bg-[var(--farm-background)] disabled:bg-white text-[var(--farm-text)] focus:outline-none focus:ring-2 focus:ring-[var(--farm-green)] transition-all"
                />
              </div>

            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-[var(--farm-green-dark)] mb-2">
                Primary Produce & Specialties
              </label>
              <input
                type="text"
                name="primaryProduce"
                value={profile.primaryProduce}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--farm-green-border)] bg-[var(--farm-background)] disabled:bg-white text-[var(--farm-text)] focus:outline-none focus:ring-2 focus:ring-[var(--farm-green)] transition-all"
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-[var(--farm-green-dark)] mb-2">
                About Your Farm
              </label>
              <textarea
                name="bio"
                rows="4"
                value={profile.bio}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-xl border border-[var(--farm-green-border)] bg-[var(--farm-background)] disabled:bg-white text-[var(--farm-text)] focus:outline-none focus:ring-2 focus:ring-[var(--farm-green)] transition-all resize-none"
              />
            </div>

            {/* Certifications Section */}
            <div className="mb-8 p-5 rounded-xl bg-[var(--farm-green-soft)] border border-[var(--farm-green-border)]">
              <h3 className="text-md font-bold font-[IBM_Plex_Serif] text-[var(--farm-green-dark)] mb-3 flex items-center">
                <Award className="w-4 h-4 mr-2 text-[var(--farm-green)]" /> Certifications & Quality Badges
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.certifications.map((cert, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white text-xs font-semibold text-[var(--farm-green-dark)] border border-[var(--farm-green-border)] shadow-xs"
                  >
                    <Sprout className="w-3.5 h-3.5 mr-1.5 text-[var(--farm-green)]" /> {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Save Changes Button (Only visible when editing) */}
            {isEditing && (
              <div className="flex justify-end space-x-4 border-t border-[var(--farm-green-border)] pt-6">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2.5 rounded-xl border border-[var(--farm-green-border)] text-[var(--farm-green-dark)] font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-2.5 rounded-xl bg-[var(--farm-green)] text-white font-medium hover:bg-[var(--farm-green-dark)] transition-colors shadow-sm"
                >
                  <Save className="w-4 h-4 mr-2" /> Save Changes
                </button>
              </div>
            )}
          </form>

        </div>
      </div>
    </div>
  )
}