import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { 
  Package, 
  Upload, 
  ArrowLeft, 
  LayoutDashboard, 
  ShoppingCart, 
  PlusCircle, 
  DollarSign, 
  FileText, 
  User, 
  LogOut 
} from 'lucide-react'

export default function CreateListings() {
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    animalType: 'Cattle',
    breed: 'Angus',
    age: '',
    weight: '',
    price: '',
    location: 'Nakuru, Kenya',
    healthInfo: 'Vaccinated, healthy and free from diseases',
    description: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock submission - save to state or mock API
    alert('Livestock listing created successfully!')
    navigate('/farmer/dashboard')
  }

  return (
    <div className="min-h-screen bg-[var(--farm-background)] text-[var(--farm-text)] flex font-[Modern_Antiqua]">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-[var(--farm-green-border)] hidden lg:flex flex-col justify-between p-6">
        <div>
          <div className="flex items-center space-x-2 mb-10">
            <div className="p-2 rounded-xl bg-[var(--farm-green)] text-white">
              <Package className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold font-[IBM_Plex_Serif] text-[var(--farm-green-dark)]">Farmart</span>
          </div>

          <nav className="space-y-1.5">
            <Link to="/farmer/dashboard" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-[var(--farm-muted)] hover:bg-gray-50 hover:text-[var(--farm-green-dark)] transition-colors">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link to="/farmer/listings" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-[var(--farm-muted)] hover:bg-gray-50 hover:text-[var(--farm-green-dark)] transition-colors">
              <Package className="w-5 h-5" />
              <span>My Livestock</span>
            </Link>
            <Link to="/farmer/orders" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-[var(--farm-muted)] hover:bg-gray-50 hover:text-[var(--farm-green-dark)] transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span>Orders</span>
            </Link>
            <Link to="/farmer/create-listing" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl bg-[var(--farm-green-soft)] text-[var(--farm-green-dark)] font-semibold">
              <PlusCircle className="w-5 h-5 text-[var(--farm-green)]" />
              <span>Add Livestock</span>
            </Link>
            <Link to="/farmer/analytics" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-[var(--farm-muted)] hover:bg-gray-50 hover:text-[var(--farm-green-dark)] transition-colors">
              <DollarSign className="w-5 h-5" />
              <span>Earnings</span>
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-[var(--farm-green-border)]">
          <Link to="/login" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 rounded-xl bg-white border border-[var(--farm-green-border)] text-[var(--farm-green-dark)] hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold font-[IBM_Plex_Serif] text-[var(--farm-green-dark)]">Add New Livestock</h1>
            <p className="text-sm text-[var(--farm-muted)]">List your animal directly to buyers across Kenya with no middlemen.</p>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-[var(--farm-green-border)] shadow-sm max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Image Upload Box */}
            <div>
              <label className="block text-sm font-bold text-[var(--farm-green-dark)] mb-2">Upload Photos (Up to 6 photos)</label>
              <div className="border-2 border-dashed border-[var(--farm-green-border)] bg-[var(--farm-background)] rounded-2xl p-8 text-center hover:border-[var(--farm-green)] transition-colors cursor-pointer">
                <Upload className="w-10 h-10 text-[var(--farm-green)] mx-auto mb-3" />
                <p className="text-sm font-semibold text-[var(--farm-green-dark)]">Click to upload or drag and drop</p>
                <p className="text-xs text-[var(--farm-muted)] mt-1">SVG, PNG, JPG or GIF (max. 800x800px)</p>
              </div>
            </div>

            {/* Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[var(--farm-green-dark)] mb-2">Animal Type</label>
                <select 
                  name="animalType" 
                  value={formData.animalType} 
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-[var(--farm-background)] border border-[var(--farm-green-border)] rounded-xl text-sm font-semibold text-[var(--farm-green-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--farm-green)]"
                >
                  <option>Cattle</option>
                  <option>Goats</option>
                  <option>Sheep</option>
                  <option>Pigs</option>
                  <option>Poultry</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-[var(--farm-green-dark)] mb-2">Breed</label>
                <input 
                  type="text" 
                  name="breed" 
                  value={formData.breed} 
                  onChange={handleChange}
                  placeholder="e.g. Angus, Boer, Dorper" 
                  className="w-full px-4 py-2.5 bg-[var(--farm-background)] border border-[var(--farm-green-border)] rounded-xl text-sm font-semibold text-[var(--farm-green-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--farm-green)]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[var(--farm-green-dark)] mb-2">Age</label>
                <input 
                  type="text" 
                  name="age" 
                  value={formData.age} 
                  onChange={handleChange}
                  placeholder="e.g. 3 years / 18 months" 
                  className="w-full px-4 py-2.5 bg-[var(--farm-background)] border border-[var(--farm-green-border)] rounded-xl text-sm font-semibold text-[var(--farm-green-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--farm-green)]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[var(--farm-green-dark)] mb-2">Weight (kg)</label>
                <input 
                  type="text" 
                  name="weight" 
                  value={formData.weight} 
                  onChange={handleChange}
                  placeholder="e.g. 420 kg" 
                  className="w-full px-4 py-2.5 bg-[var(--farm-background)] border border-[var(--farm-green-border)] rounded-xl text-sm font-semibold text-[var(--farm-green-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--farm-green)]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[var(--farm-green-dark)] mb-2">Price (KSh)</label>
                <input 
                  type="text" 
                  name="price" 
                  value={formData.price} 
                  onChange={handleChange}
                  placeholder="e.g. 85,000" 
                  className="w-full px-4 py-2.5 bg-[var(--farm-background)] border border-[var(--farm-green-border)] rounded-xl text-sm font-semibold text-[var(--farm-green-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--farm-green)]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[var(--farm-green-dark)] mb-2">Location</label>
                <input 
                  type="text" 
                  name="location" 
                  value={formData.location} 
                  onChange={handleChange}
                  placeholder="e.g. Nakuru, Kenya" 
                  className="w-full px-4 py-2.5 bg-[var(--farm-background)] border border-[var(--farm-green-border)] rounded-xl text-sm font-semibold text-[var(--farm-green-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--farm-green)]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[var(--farm-green-dark)] mb-2">Health Info</label>
              <input 
                type="text" 
                name="healthInfo" 
                value={formData.healthInfo} 
                onChange={handleChange}
                placeholder="e.g. Vaccinated, healthy, dewormed" 
                className="w-full px-4 py-2.5 bg-[var(--farm-background)] border border-[var(--farm-green-border)] rounded-xl text-sm font-semibold text-[var(--farm-green-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--farm-green)]"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[var(--farm-green-dark)] mb-2">Description</label>
              <textarea 
                name="description" 
                rows="4" 
                value={formData.description} 
                onChange={handleChange}
                placeholder="Describe your animal's diet, care routine, temperament..."
                className="w-full px-4 py-2.5 bg-[var(--farm-background)] border border-[var(--farm-green-border)] rounded-xl text-sm font-semibold text-[var(--farm-green-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--farm-green)]"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-4 border-t border-[var(--farm-green-border)]">
              <button 
                type="button" 
                onClick={() => navigate('/farmer/dashboard')}
                className="px-6 py-3 rounded-xl border border-[var(--farm-green-border)] text-sm font-bold text-[var(--farm-green-dark)] hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-8 py-3 rounded-xl bg-[var(--farm-green)] text-white text-sm font-bold hover:bg-[var(--farm-green-dark)] transition-colors shadow-sm"
              >
                Publish Listing
              </button>
            </div>

          </form>
        </div>

      </main>
    </div>
  )
}