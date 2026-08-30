import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Minus, Plus, ShoppingCart, ArrowLeft } from 'react-icons/fa'

function LivestockDetails({
  livestock,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
}) {
  const [quantity, setQuantity] = useState(1)

  if (!livestock) {
    return (
      <>
        <style>{`
          .farmart-details-empty {
            min-height: 60vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;

            color: #71847a;
            font-family: "Modern Antiqua", serif;
          }
        `}</style>

        <div className="farmart-details-empty">
          Livestock listing not found.
        </div>
      </>
    )
  }

  const {
    id,
    name,
    breed,
    type,
    location,
    age,
    sex,
    weight,
    price,
    seller,
    image,
    description,
    availableQuantity = 1,
  } = livestock

  const increaseQuantity = () => {
    setQuantity((current) =>
      Math.min(current + 1, availableQuantity)
    )
  }

  const decreaseQuantity = () => {
    setQuantity((current) =>
      Math.max(current - 1, 1)
    )
  }

  const handleAddToCart = () => {
    onAddToCart?.({
      ...livestock,
      quantity,
    })
  }

  return (
    <>
      <style>{`
        .farmart-livestock-details-page {
          min-height: 100vh;
          padding: 38px 28px 70px;

          background: #0e140f;
          color: #edf4ee;
        }

        .farmart-details-container {
          width: min(100%, 1240px);
          margin: 0 auto;
        }

        .farmart-details-back {
          display: inline-flex;
          align-items: center;
          gap: 7px;

          margin-bottom: 28px;

          color: #4fdc82;
          text-decoration: none;

          font-family: "IBM Plex Serif", serif;
          font-size: 18px;
          font-weight: 700;
        }

        .farmart-details-back:hover {
          color: #72c9a3;
        }

        .farmart-details-main {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          gap: 34px;
          align-items: start;
        }

        .farmart-details-image-wrapper {
          width: 100%;
          aspect-ratio: 1 / 0.78;
          overflow: hidden;

          border-radius: 20px;

          background: #edf5e9;
        }

        .farmart-details-image {
          width: 100%;
          height: 100%;
          display: block;

          object-fit: cover;
        }

        .farmart-details-no-image {
          width: 100%;
          height: 100%;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #61736a;

          font-family: "Modern Antiqua", serif;
          font-size: 17px;
        }

        .farmart-details-info {
          min-width: 0;
        }

        .farmart-details-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
        }

        .farmart-details-title {
          margin: 4px 0 8px;

          color: #f0f5f0;

          font-family: "IBM Plex Serif", serif;
          font-size: clamp(30px, 4vw, 38px);
          font-weight: 500;
          line-height: 1.2;
        }

        .farmart-details-location {
          margin: 0;

          color: #71847a;

          font-family: "Modern Antiqua", serif;
          font-size: 15px;
        }

        .farmart-details-wishlist {
          width: 40px;
          height: 40px;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          border: none;
          border-radius: 50%;

          background: transparent;
          color: #789184;

          cursor: pointer;

          transition:
            color 180ms ease,
            background 180ms ease;
        }

        .farmart-details-wishlist:hover {
          color: #e6c65c;
          background: rgba(230, 198, 92, 0.08);
        }

        .farmart-details-wishlist-active {
          color: #e6c65c;
        }

        .farmart-details-price {
          margin: 27px 0 25px;

          color: #4fdc82;

          font-family: "IBM Plex Serif", serif;
          font-size: 38px;
          font-weight: 700;
          line-height: 1;
        }

        .farmart-details-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
        }

        .farmart-details-stat {
          min-height: 76px;
          padding: 13px 14px;

          display: flex;
          flex-direction: column;
          justify-content: space-between;

          border-radius: 13px;

          background: #f4f7f3;
          color: #5d7165;
        }

        .farmart-details-stat-label {
          font-family: "Modern Antiqua", serif;
          font-size: 12px;
        }

        .farmart-details-stat-value {
          color: #52675a;

          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          font-weight: 600;
        }

        .farmart-details-quantity {
          margin-top: 30px;
        }

        .farmart-details-quantity-label {
          margin: 0 0 10px;

          color: #71847a;

          font-family: "Modern Antiqua", serif;
          font-size: 15px;
        }

        .farmart-quantity-controls {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .farmart-quantity-button {
          width: 56px;
          height: 56px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid #d8e2da;
          border-radius: 12px;

          background: #f4f7f3;
          color: #607268;

          cursor: pointer;

          transition:
            background 180ms ease,
            border-color 180ms ease;
        }

        .farmart-quantity-button:hover:not(:disabled) {
          border-color: #91aa98;
          background: #ffffff;
        }

        .farmart-quantity-button:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .farmart-quantity-value {
          min-width: 20px;

          color: #edf4ee;

          font-family: "IBM Plex Serif", serif;
          font-size: 20px;
          font-weight: 700;
          text-align: center;
        }

        .farmart-details-cart-button {
          width: 100%;
          min-height: 70px;

          margin-top: 20px;

          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;

          border: 1px solid #4a9f7b;
          border-radius: 14px;

          background: linear-gradient(
            135deg,
            #72c9a3,
            #4a9f7b
          );

          color: #ffffff;

          font-family: "Modern Antiqua", serif;
          font-size: 16px;
          font-weight: 600;

          cursor: pointer;

          box-shadow:
            0 9px 22px rgba(74, 159, 123, 0.18);

          transition:
            background 180ms ease,
            box-shadow 180ms ease;
        }

        .farmart-details-cart-button:hover {
          background: linear-gradient(
            135deg,
            #82d4af,
            #55aa85
          );

          box-shadow:
            0 12px 26px rgba(74, 159, 123, 0.24);
        }

        .farmart-details-description {
          margin-top: 72px;
        }

        .farmart-details-description h2 {
          margin: 0 0 22px;

          color: #edf4ee;

          font-family: "IBM Plex Serif", serif;
          font-size: 26px;
          font-weight: 500;
        }

        .farmart-details-description p {
          max-width: 800px;
          margin: 0;

          color: #71847a;

          font-family: "Modern Antiqua", serif;
          font-size: 16px;
          line-height: 1.8;
        }

        @media (max-width: 900px) {
          .farmart-details-main {
            grid-template-columns: 1fr;
          }

          .farmart-details-image-wrapper {
            aspect-ratio: 16 / 10;
          }
        }

        @media (max-width: 600px) {
          .farmart-livestock-details-page {
            padding: 25px 16px 55px;
          }

          .farmart-details-main {
            gap: 25px;
          }

          .farmart-details-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .farmart-details-price {
            font-size: 32px;
          }

          .farmart-details-description {
            margin-top: 48px;
          }
        }
      `}</style>

      <main className="farmart-livestock-details-page">
        <div className="farmart-details-container">

          <Link
            to="/buyer"
            className="farmart-details-back"
          >
            <ArrowLeft size={19} />
            Back
          </Link>

          <div className="farmart-details-main">

            <div className="farmart-details-image-wrapper">
              {image ? (
                <img
                  src={image}
                  alt={name}
                  className="farmart-details-image"
                />
              ) : (
                <div className="farmart-details-no-image">
                  No image available
                </div>
              )}
            </div>

            <section className="farmart-details-info">

              <div className="farmart-details-heading">

                <div>
                  <h1 className="farmart-details-title">
                    {name}
                  </h1>

                  <p className="farmart-details-location">
                    {seller}
                    {seller && location ? ' • ' : ''}
                    {location}
                  </p>
                </div>

                <button
                  type="button"
                  className={`
                    farmart-details-wishlist
                    ${isWishlisted ? 'farmart-details-wishlist-active' : ''}
                  `}
                  onClick={() => onToggleWishlist?.(livestock)}
                  aria-label={
                    isWishlisted
                      ? 'Remove from wishlist'
                      : 'Add to wishlist'
                  }
                  aria-pressed={isWishlisted}
                >
                  <Heart
                    size={22}
                    fill={isWishlisted ? 'currentColor' : 'none'}
                  />
                </button>

              </div>

              <p className="farmart-details-price">
                KES {Number(price || 0).toLocaleString()}
              </p>

              <div className="farmart-details-stats">

                <div className="farmart-details-stat">
                  <span className="farmart-details-stat-label">
                    Breed
                  </span>
                  <span className="farmart-details-stat-value">
                    {breed || '—'}
                  </span>
                </div>

                <div className="farmart-details-stat">
                  <span className="farmart-details-stat-label">
                    Type
                  </span>
                  <span className="farmart-details-stat-value">
                    {type || '—'}
                  </span>
                </div>

                <div className="farmart-details-stat">
                  <span className="farmart-details-stat-label">
                    Age
                  </span>
                  <span className="farmart-details-stat-value">
                    {age !== undefined && age !== null
                      ? `${age} ${age === 1 ? 'Year' : 'Years'}`
                      : '—'}
                  </span>
                </div>

                <div className="farmart-details-stat">
                  <span className="farmart-details-stat-label">
                    Gender
                  </span>
                  <span className="farmart-details-stat-value">
                    {sex || '—'}
                  </span>
                </div>

                <div className="farmart-details-stat">
                  <span className="farmart-details-stat-label">
                    Weight
                  </span>
                  <span className="farmart-details-stat-value">
                    {weight !== undefined && weight !== null
                      ? `${weight} Kg`
                      : '—'}
                  </span>
                </div>

                <div className="farmart-details-stat">
                  <span className="farmart-details-stat-label">
                    Available
                  </span>
                  <span className="farmart-details-stat-value">
                    {availableQuantity} Unit(s)
                  </span>
                </div>

              </div>

              <div className="farmart-details-quantity">

                <p className="farmart-details-quantity-label">
                  Quantity
                </p>

                <div className="farmart-quantity-controls">

                  <button
                    type="button"
                    className="farmart-quantity-button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={17} />
                  </button>

                  <span className="farmart-quantity-value">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    className="farmart-quantity-button"
                    onClick={increaseQuantity}
                    disabled={quantity >= availableQuantity}
                    aria-label="Increase quantity"
                  >
                    <Plus size={17} />
                  </button>

                </div>

              </div>

              <button
                type="button"
                className="farmart-details-cart-button"
                onClick={handleAddToCart}
                disabled={availableQuantity < 1}
              >
                <ShoppingCart size={19} />
                Add to Cart
              </button>

            </section>

          </div>

          <section className="farmart-details-description">
            <h2>Description</h2>

            <p>
              {description || 'No description provided.'}
            </p>
          </section>

        </div>
      </main>
    </>
  )
}

export default LivestockDetails
