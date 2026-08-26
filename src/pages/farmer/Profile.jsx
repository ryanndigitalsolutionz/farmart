import React, { useState } from 'react'
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Bell, 
  ShieldCheck, 
  Save, 
  Edit3, 
  CheckCircle2, 
  ArrowLeft,
  KeyRound
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  
  // State for user personal account settings
  const [userData, setUserData] = useState({
    fullName: "Martin Waraho",
    email: "martin.waraho@farmart.co.ke",
    phone: "+254 712 345 678",
    role: "Registered Farmer",
    language: "English (Kenya)",
    notifications: {
      emailAlerts: true,
      smsAlerts: true,
      orderUpdates: true,
      marketing: false
    }
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData(prev => ({ ...prev, [name]: value }))
  }

  const handleToggleNotification = (key) => {
    if (!isEditing) return
    setUserData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    setIsEditing(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen bg-[var(--farm-background)] text-[var(--farm-text)] p-6 md:p-10 font-[Modern_Antiqua]">
      
      {/* Top Header */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link 
            to="/farmer/dashboard" 
            className="inline-flex items-center text-sm font-semibold text-[var(--farm-green)] hover:underline mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold font-[IBM_Plex_Serif] text-[var(--farm-green-dark)]">
            Personal Account Profile
          </h1>
          <p className="text-sm text-[var(--farm-muted)]">
            Manage your login details, personal security preferences, and notification channels.
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
              <Edit3 className="w-4 h-4 mr-2" /> Edit Personal Info
            </>
          )}
        </button>
      </div>

      {/* Success Notification Banner */}
      {saveSuccess && (
        <div className="max-w-4xl mx-auto mb-6 p-4 rounded-xl bg-[var(--farm-green-soft)] border border-[var(--farm-green-border)] flex items-center space-x-3 text-[var(--farm-green-dark)] animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-[var(--farm-green)] flex-shrink-0" />
          <span className="font-medium">Personal account details updated successfully!</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-[var(--farm-green-border)] shadow-sm overflow-hidden p-8">
        
        {/* User Identity Header Card */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pb-8 border-b border-[var(--farm-green-border)]">
          <div className="w-24 h-24 rounded-full bg-[var(--farm-green-soft)] border-2 border-[var(--farm-green)] flex items-center justify-center text-[var(--farm-green-dark)] shadow-inner">
            <User className="w-12 h-12" />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold font-[IBM_Plex_Serif] text-[var(--farm-green-dark)]">
              {userData.fullName}
            </h2>
            <p className="text-sm text-[var(--farm-muted)] mt-0.5">{userData.email}</p>
            <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[var(--farm-green-soft)] text-[var(--farm-green-dark)] border border-[var(--farm-green-border)]">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[var(--farm-green)]" /> {userData.role}
            </div>
          </div>
        </div>

        {/* Editable Form */}
        <form onSubmit={handleSave} className="pt-8 space-y-6">
          
          <h3 className="text-lg font-bold font-[IBM_Plex_Serif] text-[var(--farm-green-dark)]">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-[var(--farm-green-dark)] mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-[var(--farm-muted)]" />
                <input
                  type="text"
                  name="fullName"
                  value={userData.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--farm-green-border)] bg-[var(--farm-background)] disabled:bg-white text-[var(--farm-text)] focus:outline-none focus:ring-2 focus:ring-[var(--farm-green)] transition-all"
                />
              </div>
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
                  value={userData.email}
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
                  value={userData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--farm-green-border)] bg-[var(--farm-background)] disabled:bg-white text-[var(--farm-text)] focus:outline-none focus:ring-2 focus:ring-[var(--farm-green)] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--farm-green-dark)] mb-2">
                Preferred Language
              </label>
              <input
                type="text"
                name="language"
                value={userData.language}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--farm-green-border)] bg-[var(--farm-background)] disabled:bg-white text-[var(--farm-text)] focus:outline-none focus:ring-2 focus:ring-[var(--farm-green)] transition-all"
              />
            </div>
          </div>

          {/* Notifications Preferences */}
          <div className="pt-6 border-t border-[var(--farm-green-border)]">
            <h3 className="text-lg font-bold font-[IBM_Plex_Serif] text-[var(--farm-green-dark)] mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-[var(--farm-green)]" /> Notification Preferences
            </h3>

            <div className="space-y-3 bg-[var(--farm-green-soft)] p-5 rounded-xl border border-[var(--farm-green-border)]">
              
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium text-[var(--farm-green-dark)]">Email Notifications (System & Reports)</span>
                <input 
                  type="checkbox" 
                  checked={userData.notifications.emailAlerts}
                  onChange={() => handleToggleNotification('emailAlerts')}
                  disabled={!isEditing}
                  className="w-4 h-4 accent-[var(--farm-green)] rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium text-[var(--farm-green-dark)]">SMS Alerts (Order Confirmations)</span>
                <input 
                  type="checkbox" 
                  checked={userData.notifications.smsAlerts}
                  onChange={() => handleToggleNotification('smsAlerts')}
                  disabled={!isEditing}
                  className="w-4 h-4 accent-[var(--farm-green)] rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium text-[var(--farm-green-dark)]">Real-time Order Status Updates</span>
                <input 
                  type="checkbox" 
                  checked={userData.notifications.orderUpdates}
                  onChange={() => handleToggleNotification('orderUpdates')}
                  disabled={!isEditing}
                  className="w-4 h-4 accent-[var(--farm-green)] rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium text-[var(--farm-green-dark)]">Marketplace News & Promotional Offers</span>
                <input 
                  type="checkbox" 
                  checked={userData.notifications.marketing}
                  onChange={() => handleToggleNotification('marketing')}
                  disabled={!isEditing}
                  className="w-4 h-4 accent-[var(--farm-green)] rounded cursor-pointer"
                />
              </label>

            </div>
          </div>

          {/* Security Box */}
          <div className="pt-6 border-t border-[var(--farm-green-border)] flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-[var(--farm-green-soft)] text-[var(--farm-green)]">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--farm-green-dark)]">Password Security</h4>
                <p className="text-xs text-[var(--farm-muted)]">Last changed 3 months ago</p>
              </div>
            </div>
            
            <button
              type="button"
              className="px-4 py-2 rounded-xl border border-[var(--farm-green-border)] text-xs font-semibold text-[var(--farm-green-dark)] hover:bg-[var(--farm-green-soft)] transition-colors"
            >
              Update Password
            </button>
          </div>

          {/* Save Action Buttons (Visible during edit mode) */}
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
                <Save className="w-4 h-4 mr-2" /> Save Account Changes
              </button>
            </div>
          )}

        </form>

      </div>
    </div>
  )
}