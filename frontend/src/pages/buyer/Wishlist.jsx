import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FaHeart,
  FaTrash,
  FaArrowRight,
  FaTag,
} from 'react-icons/fa'
import farmartImages from '../../data/farmartImages'

function Wishlist() {
  const navigate = useNavigate()

  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: 'Friesian Cow',
      category: 'Livestock',
      type: 'Cow',
      breed: 'Friesian',
      price: 85000,
      unit: 'per animal',
      image: farmartImages.livestock.cows[0],
      farmer: 'Jomo Farm',
    },
    {
      id: 2,
      name: 'Boer Goat',
      category: 'Livestock',
      type: 'Goat',
      breed: 'Boer',
      price: 18000,
      unit: 'per animal',
      image: farmartImages.livestock.goats[0],
      farmer: 'Green Valley Farm',
    },
    {
      id: 3,
      name: 'Fresh Eggs',
      category: 'Farm Produce',
      type: 'Eggs',
      quantity: '30 eggs',
      price: 450,
      unit: 'per tray',
      image: farmartImages.products.eggs[0],
      farmer: 'Sunrise Farm',
    },
    {
      id: 4,
      name: 'Fresh Milk',
      category: 'Farm Produce',
      type: 'Milk',
      quantity: '1 litre',
      price: 120,
      unit: 'per litre',
      image: farmartImages.products.milk[0],
      farmer: 'Highland Dairy Farm',
    },
  ])

  const removeFromWishlist = (id) => {
    setWishlist((currentWishlist) =>
      currentWishlist.filter((item) => item.id !== id),
    )
  }

  const formatPrice = (price) => {
    return `KES ${price.toLocaleString()}`
  }

  return (
    <>
      <style>{`
        .buyer-wishlist-page {
          min-height: 100vh;
          padding: 42px 36px 70px;
          background: #f4f8f2;
          color: #173d28;
          box-sizing: border-box;
        }

        .buyer-wishlist-container {
          width: min(100%, 1150px);
          margin: 0 auto;
        }

        .buyer-wishlist-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 25px;
          margin-bottom: 32px;
        }

        .buyer-wishlist-title {
          margin: 0;
          color: #173d28;
          font-family: "IBM Plex Serif", serif;
          font-size: 36px;
        }

        .buyer-wishlist-subtitle {
          margin: 10px 0 0;
          color: #748078;
          font-family: "Modern Antiqua", serif;
          font-size: 16px;
        }

        .buyer-wishlist-count {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 15px;
          border: 1px solid #d1e1d3;
          border-radius: 999px;
          background: #eef6ef;
          color: #2d7042;
          font-family: "Modern Antiqua", serif;
          font-size: 13px;
          font-weight: 600;
          white-space: nowrap;
        }

        .buyer-wishlist-count svg {
          color: #b64444;
        }

        .buyer-wishlist-grid {
          display: grid;
          grid-template-columns: repeat(
            auto-fill,
            minmax(245px, 1fr)
          );
          gap: 22px;
        }

        .buyer-wishlist-card {
          overflow: hidden;
          border: 1px solid #d1e1d3;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.82);
          box-shadow:
            7px 7px 16px rgba(45, 112, 66, 0.07),
            -5px -5px 13px rgba(255, 255, 255, 0.8);
        }

        .buyer-wishlist-image-wrap {
          position: relative;
          height: 220px;
          overflow: hidden;
          background: #e8eee8;
        }

        .buyer-wishlist-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 350ms ease;
        }

        .buyer-wishlist-card:hover
        .buyer-wishlist-image {
          transform: scale(1.04);
        }

        .buyer-wishlist-category {
          position: absolute;
          top: 13px;
          left: 13px;
          padding: 6px 11px;
          border-radius: 999px;
          background: rgba(23, 61, 40, 0.88);
          color: #ffffff;
          font-family: "Modern Antiqua", serif;
          font-size: 11px;
          font-weight: 600;
        }

        .buyer-wishlist-remove {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.7);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.92);
          color: #a3483b;
          cursor: pointer;
          transition:
            background 180ms ease,
            color 180ms ease,
            border-color 180ms ease;
        }

        .buyer-wishlist-remove:hover {
          border-color: #b64444;
          background: #b64444;
          color: #ffffff;
        }

        .buyer-wishlist-content {
          padding: 20px;
        }

        .buyer-wishlist-name {
          margin: 0;
          color: #173d28;
          font-family: "IBM Plex Serif", serif;
          font-size: 21px;
        }

        .buyer-wishlist-farmer {
          margin: 6px 0 0;
          color: #748078;
          font-family: "Modern Antiqua", serif;
          font-size: 13px;
        }

        .buyer-wishlist-details {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-top: 14px;
        }

        .buyer-wishlist-detail {
          padding: 5px 9px;
          border-radius: 7px;
          background: #eef6ef;
          color: #53645a;
          font-family: "Modern Antiqua", serif;
          font-size: 11px;
        }

        .buyer-wishlist-price {
          display: flex;
          align-items: baseline;
          gap: 7px;
          margin-top: 18px;
        }

        .buyer-wishlist-price strong {
          color: #2d7042;
          font-family: "IBM Plex Serif", serif;
          font-size: 21px;
        }

        .buyer-wishlist-price span {
          color: #8a968e;
          font-family: "Modern Antiqua", serif;
          font-size: 11px;
        }

        .buyer-wishlist-view {
          width: 100%;
          min-height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 18px;
          border: 1px solid #2d7042;
          border-radius: 10px;
          background: #2d7042;
          color: #ffffff;
          font-family: "Modern Antiqua", serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition:
            background 180ms ease,
            border-color 180ms ease;
        }

        .buyer-wishlist-view:hover {
          border-color: #245d36;
          background: #245d36;
        }

        .buyer-wishlist-empty {
          padding: 75px 30px;
          border: 1px dashed #b9ccbd;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.55);
          text-align: center;
        }

        .buyer-wishlist-empty-icon {
          width: 62px;
          height: 62px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 18px;
          border-radius: 50%;
          background: #f8e9e6;
          color: #b64444;
        }

        .buyer-wishlist-empty h2 {
          margin: 0;
          color: #173d28;
          font-family: "IBM Plex Serif", serif;
          font-size: 24px;
        }

        .buyer-wishlist-empty p {
          max-width: 500px;
          margin: 9px auto 0;
          color: #748078;
          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          line-height: 1.6;
        }

        .buyer-wishlist-empty-button {
          min-height: 43px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 22px;
          padding: 0 19px;
          border: 1px solid #2d7042;
          border-radius: 10px;
          background: #2d7042;
          color: #ffffff;
          font-family: "Modern Antiqua", serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        @media (max-width: 650px) {
          .buyer-wishlist-page {
            padding: 30px 18px 55px;
          }

          .buyer-wishlist-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .buyer-wishlist-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <main className="buyer-wishlist-page">
        <div className="buyer-wishlist-container">

          <header className="buyer-wishlist-header">
            <div>
              <h1 className="buyer-wishlist-title">
                Wishlist
              </h1>

              <p className="buyer-wishlist-subtitle">
                Keep track of livestock and produce you want
                to come back to.
              </p>
            </div>

            <span className="buyer-wishlist-count">
              <FaHeart size={12} />
              {wishlist.length}{' '}
              {wishlist.length === 1 ? 'Saved Item' : 'Saved Items'}
            </span>
          </header>

          {wishlist.length === 0 ? (
            <section className="buyer-wishlist-empty">
              <div className="buyer-wishlist-empty-icon">
                <FaHeart size={23} />
              </div>

              <h2>
                Your wishlist is empty.
              </h2>

              <p>
                When you find livestock or farm produce you
                like, save it here so you can easily find it
                again.
              </p>

              <button
                type="button"
                className="buyer-wishlist-empty-button"
                onClick={() => navigate('/buyer')}
              >
                Browse Marketplace
                <FaArrowRight size={12} />
              </button>
            </section>
          ) : (
            <section className="buyer-wishlist-grid">
              {wishlist.map((item) => (
                <article
                  className="buyer-wishlist-card"
                  key={item.id}
                >
                  <div className="buyer-wishlist-image-wrap">
                    <img
                      className="buyer-wishlist-image"
                      src={item.image}
                      alt={item.name}
                    />

                    <span className="buyer-wishlist-category">
                      {item.category}
                    </span>

                    <button
                      type="button"
                      className="buyer-wishlist-remove"
                      onClick={() =>
                        removeFromWishlist(item.id)
                      }
                      aria-label={`Remove ${item.name} from wishlist`}
                      title="Remove from wishlist"
                    >
                      <FaTrash size={13} />
                    </button>
                  </div>

                  <div className="buyer-wishlist-content">
                    <h2 className="buyer-wishlist-name">
                      {item.name}
                    </h2>

                    <p className="buyer-wishlist-farmer">
                      {item.farmer}
                    </p>

                    <div className="buyer-wishlist-details">
                      <span className="buyer-wishlist-detail">
                        <FaTag size={9} /> {item.type}
                      </span>

                      {item.breed && (
                        <span className="buyer-wishlist-detail">
                          {item.breed}
                        </span>
                      )}

                      {item.quantity && (
                        <span className="buyer-wishlist-detail">
                          {item.quantity}
                        </span>
                      )}
                    </div>

                    <div className="buyer-wishlist-price">
                      <strong>
                        {formatPrice(item.price)}
                      </strong>

                      <span>{item.unit}</span>
                    </div>

                    <button
                      type="button"
                      className="buyer-wishlist-view"
                      onClick={() =>
                        navigate(
                          `/buyer/listing/${item.id}`,
                        )
                      }
                    >
                      View Listing
                      <FaArrowRight size={12} />
                    </button>
                  </div>
                </article>
              ))}
            </section>
          )}

        </div>
      </main>
    </>
  )
}

export default Wishlist
// commit 18
