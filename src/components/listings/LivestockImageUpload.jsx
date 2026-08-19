import { useState, useCallback } from 'react'

const LivestockImageUpload = ({ images = [], onChange, error }) => {
  const [preview, setPreview] = useState(images)
  const [dragActive, setDragActive] = useState(false)

  const handleFiles = useCallback(
    (files) => {
      const newImages = []
      Array.from(files).forEach((file) => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader()
          reader.onloadend = () => {
            newImages.push(reader.result)
            if (newImages.length === files.length || newImages.length + preview.length <= 5) {
              onChange([...preview, ...newImages].slice(0, 5))
              setPreview([...preview, ...newImages].slice(0, 5))
            }
          }
          reader.readAsDataURL(file)
        }
      })
    },
    [preview, onChange]
  )

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      setDragActive(false)
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFiles(e.dataTransfer.files)
      }
    },
    [handleFiles]
  )

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleInputChange = useCallback(
    (e) => {
      if (e.target.files && e.target.files[0]) {
        handleFiles(e.target.files)
      }
    },
    [handleFiles]
  )

  const removeImage = useCallback(
    (index) => {
      const updated = preview.filter((_, i) => i !== index)
      setPreview(updated)
      onChange(updated)
    },
    [preview, onChange]
  )

  return (
    <div className="form-group">
      <label className="form-label">
        Images <span className="form-required">*</span>
      </label>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById('image-upload').click()}
      >
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleInputChange}
          className="hidden"
        />
        <p className="text-gray-600 mb-2">Drag & drop images here, or click to browse</p>
        <p className="text-sm text-gray-500">PNG, JPG, GIF up to 5MB each (max 5 images)</p>
      </div>
      {error && <p className="form-error">{error}</p>}
      {preview.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
          {preview.map((img, idx) => (
            <div key={idx} className="relative">
              <img
                src={img}
                alt={`Preview ${idx + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LivestockImageUpload
