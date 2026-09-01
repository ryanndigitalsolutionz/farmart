import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
} from 'react-icons/fa'

function ProductDetails({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
}) {
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="farmart-product-details-empty">
        Product not found.
      </div>
    )
  }

  const {
    id,
    name,
    category,
    location,
    price,
    seller,
    image,
    description,
    producedDate,
    expiryDate,
    quantityAvailable = 1,
    quantityUnit = 'g',
  } = product

  const increaseQuantity = () => {
    setQuantity((current) =>
      Math.min(current + 1, quantityAvailable)
    )
  }

  const decreaseQuantity = () => {
    setQuantity((current) =>
      Math.max(current - 1, 1)
    )
  }

  const handleAddToCart = () => {
    onAddToCart?.({
      ...product,
      quantity,
    })
  }

  return (
    <>
      <style>{`
        .farmart-product-details-page {
          min-height: 100vh;
          padding: 38px 28px 70px;

          background: #0e140f;
          color: #edf4ee;
        }

        .farmart-product-details-container {
          width: min(100%, 1240px);
          margin: 0 auto;
        }

        .farmart-product-details-back {
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

        .farmart-product-details-back:hover {
          color: #72c9a3;
        }

        .farmart-product-details-main {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          gap: 34px;
          align-items: start;
        }

        .farmart-product-details-image {
          width: 100%;
          aspect-ratio: 1 / 0.78;

          overflow: hidden;
          border-radius: 20px;

          background: #edf5e9;
        }

        .farmart-product-details-image img {
          width: 100%;
          height: 100%;
          display: block;

          object-fit: cover;
        }

        .farmart-product-details-no-image {
          width: 100%;
          height: 100%;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #61736a;
          font-family: "Modern Antiqua", serif;
        }

        .farmart-product-details-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
        }

        .farmart-product-details-title {
          margin: 4px 0 8px;

          color: #f0f5f0;

          font-family: "IBM Plex Serif", serif;
          font-size: clamp(30px, 4vw, 38px);
          font-weight: 500;
          line-height: 1.2;
        }

        .farmart-product-details-location {
          margin: 0;

          color: #71847a;

          font-family: "Modern Antiqua", serif;
          font-size: 15px;
        }

        .farmart-product-details-wishlist {
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

        .farmart-product-details-wishlist:hover {
          color: #e6c65c;
          background: rgba(230, 198, 92, 0.08);
        }

        .farmart-product-details-wishlist-active {
          color: #e6c65c;
        }

        .farmart-product-details-price {
          margin: 27px 0 25px;

          color: #4fdc82;

          font-family: "IBM Plex Serif", serif;
          font-size: 38px;
          font-weight: 700;
        }

        .farmart-product-details-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .farmart-product-details-stat {
          min-height: 76px;
          padding: 13px 14px;

          display: flex;
          flex-direction: column;
          justify-content: space-between;

          border-radius: 13px;
          background: #f4f7f3;
        }

        .farmart-product-details-stat-label {
          color: #5d7165;

          font-family: "Modern Antiqua", serif;
          font-size: 12px;
        }

        .farmart-product-details-stat-value {
          color: #52675a;

          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          font-weight: 600;
        }

        .farmart-product-details-quantity {
          margin-top: 30px;
        }

        .farmart-product-details-quantity-label {
          margin: 0 0 10px;

          color: #71847a;

          font-family: "Modern Antiqua", serif;
        }

        .farmart-product-quantity-controls {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .farmart-product-quantity-button {
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
        }

        .farmart-product-quantity-button:hover:not(:disabled) {
          border-color: #91aa98;
          background: #ffffff;
        }

        .farmart-product-quantity-button:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .farmart-product-quantity-value {
          color: #edf4ee;

          font-family: "IBM Plex Serif", serif;
          font-size: 20px;
          font-weight: 700;
        }

        .farmart-product-details-cart {
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
        }

        .farmart-product-details-cart:hover {
          background: linear-gradient(
            135deg,
            #82d4af,
            #55aa85
          );
        }

        .farmart-product-description {
          margin-top: 72px;
        }

        .farmart-product-description h2 {
          margin: 0 0 22px;

          color: #edf4ee;

          font-family: "IBM Plex Serif", serif;
          font-size: 26px;
          font-weight: 500;
        }

        .farmart-product-description p {
          max-width: 800px;
          margin: 0;

          color: #71847a;

          font-family: "Modern Antiqua", serif;
          font-size: 16px;
          line-height: 1.8;
        }

        @media (max-width: 900px) {
          .farmart-product-details-main {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .farmart-product-details-page {
            padding: 25px 16px 55px;
          }

          .farmart-product-details-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .farmart-product-details-price {
            font-size: 32px;
          }
        }
      `}</style>

      <main className="farmart-product-details-page">
        <div className="farmart-product-details-container">

          <Link
            to="/buyer"
            className="farmart-product-details-back"
          >
            <ArrowLeft size={19} />
            Back
          </Link>

          <div className="farmart-product-details-main">

            <div className="farmart-product-details-image">
              {image ? (
                <img src={image} alt={name} />
              ) : (
                <div className="farmart-product-details-no-image">
                  No image available
                </div>
              )}
            </div>

            <section>

              <div className="farmart-product-details-heading">

                <div>
                  <h1 className="farmart-product-details-title">
                    {name}
                  </h1>

                  <p className="farmart-product-details-location">
                    {seller}
                    {seller && location ? ' • ' : ''}
                    {location}
                  </p>
                </div>

                <button
                  type="button"
                  className={`
                    farmart-product-details-wishlist
                    ${isWishlisted
                      ? 'farmart-product-details-wishlist-active'
                      : ''}
                  `}
                  onClick={() => onToggleWishlist?.(product)}
                  aria-label={
                    isWishlisted
                      ? 'Remove from wishlist'
                      : 'Add to wishlist'
                  }
                >
                  <Heart
                    size={22}
                    fill={isWishlisted ? 'currentColor' : 'none'}
                  />
                </button>

              </div>

              <p className="farmart-product-details-price">
                KES {Number(price || 0).toLocaleString()}
              </p>

              <div className="farmart-product-details-stats">

                <div className="farmart-product-details-stat">
                  <span className="farmart-product-details-stat-label">
                    Category
                  </span>
                  <span className="farmart-product-details-stat-value">
                    {category || '—'}
                  </span>
                </div>

                <div className="farmart-product-details-stat">
                  <span className="farmart-product-details-stat-label">
                    Produced
                  </span>
                  <span className="farmart-product-details-stat-value">
                    {producedDate || '—'}
                  </span>
                </div>

                <div className="farmart-product-details-stat">
                  <span className="farmart-product-details-stat-label">
                    Expires
                  </span>
                  <span className="farmart-product-details-stat-value">
                    {expiryDate || '—'}
                  </span>
                </div>

                <div className="farmart-product-details-stat">
                  <span className="farmart-product-details-stat-label">
                    Quantity
                  </span>
                  <span className="farmart-product-details-stat-value">
                    {quantityAvailable}{quantityUnit}
                  </span>
                </div>

              </div>

              <div className="farmart-product-details-quantity">

                <p className="farmart-product-details-quantity-label">
                  Quantity
                </p>

                <div className="farmart-product-quantity-controls">

                  <button
                    type="button"
                    className="farmart-product-quantity-button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={17} />
                  </button>

                  <span className="farmart-product-quantity-value">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    className="farmart-product-quantity-button"
                    onClick={increaseQuantity}
                    disabled={
                      quantity >= quantityAvailable
                    }
                    aria-label="Increase quantity"
                  >
                    <Plus size={17} />
                  </button>

                </div>

              </div>

              <button
                type="button"
                className="farmart-product-details-cart"
                onClick={handleAddToCart}
                disabled={quantityAvailable < 1}
              >
                <ShoppingCart size={19} />
                Add to Cart
              </button>

            </section>

          </div>

          <section className="farmart-product-description">
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

export default ProductDetails
