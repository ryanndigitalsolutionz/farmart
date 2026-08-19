import { useState } from 'react'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

const LivestockGallery = ({ images = [], alt = 'Livestock image' }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  if (!images || images.length === 0) {
    return (
      <div className="livestock-gallery livestock-gallery-empty">
        <div className="livestock-gallery-placeholder">
          <ZoomIn size={48} />
          <p>No images available</p>
        </div>
      </div>
    )
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="livestock-gallery">
      <div className="livestock-gallery-main">
        <img
          src={images[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          className="livestock-gallery-image"
          onClick={() => setIsZoomed(true)}
        />
        {images.length > 1 && (
          <>
            <button className="livestock-gallery-btn livestock-gallery-prev" onClick={goToPrevious}>
              <ChevronLeft size={24} />
            </button>
            <button className="livestock-gallery-btn livestock-gallery-next" onClick={goToNext}>
              <ChevronRight size={24} />
            </button>
          </>
        )}
        <div className="livestock-gallery-counter">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
      {images.length > 1 && (
        <div className="livestock-gallery-thumbnails">
          {images.map((image, index) => (
            <button
              key={index}
              className={`livestock-gallery-thumbnail ${index === currentIndex ? 'livestock-gallery-thumbnail-active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            >
              <img src={image} alt={`${alt} thumbnail ${index + 1}`} />
            </button>
          ))}
        </div>
      )}

      {isZoomed && (
        <div className="livestock-gallery-zoom-overlay" onClick={() => setIsZoomed(false)}>
          <div className="livestock-gallery-zoom-content">
            <img src={images[currentIndex]} alt={`${alt} zoomed`} />
            <button className="livestock-gallery-zoom-close" onClick={() => setIsZoomed(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default LivestockGallery
