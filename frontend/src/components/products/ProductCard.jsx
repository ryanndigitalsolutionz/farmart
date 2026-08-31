import { Link } from 'react-router-dom'
import { Heart, ShoppingCart } from 'react-icons/fa'

function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
}) {
  if (!product) return null

  const {
    id,
    name,
    category,
    location,
    quantity,
    quantityUnit = 'g',
    price,
    seller,
    image,
    availability,
  } = product

  return (
    <>
      <style>{`
        .farmart-product-card {
          width: 100%;
          max-width: 360px;
          overflow: hidden;

          border: 1px solid #b9c8bc;
          border-radius: 18px;

          background: #172019;
          color: #edf4ee;

          box-shadow: 0 12px 28px rgba(25, 48, 33, 0.12);

          transition:
            box-shadow 180ms ease,
            border-color 180ms ease;
        }

        .farmart-product-card:hover {
          border-color: #83a58d;
          box-shadow: 0 16px 34px rgba(25, 48, 33, 0.18);
        }

        .farmart-product-image-link {
          display: block;
          width: 100%;
          height: 220px;

          background: #edf5e9;
        }

        .farmart-product-image {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .farmart-product-no-image {
          width: 100%;
          height: 100%;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #61736a;
          font-family: "Modern Antiqua", serif;
        }

        .farmart-product-content {
          padding: 20px 21px 22px;
        }

        .farmart-product-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }

        .farmart-product-title-link {
          min-width: 0;
          color: #f0f5f0;
          text-decoration: none;
        }

        .farmart-product-title {
          margin: 0;

          font-family: "IBM Plex Serif", serif;
          font-size: 20px;
          font-weight: 700;
          line-height: 1.3;
        }

        .farmart-product-title-link:hover {
          color: #72c9a3;
        }

        .farmart-product-wishlist {
          width: 34px;
          height: 34px;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          border: none;
          background: transparent;
          color: #789184;

          cursor: pointer;

          transition:
            color 180ms ease,
            background 180ms ease;
        }

        .farmart-product-wishlist:hover {
          color: #e6c65c;
          background: rgba(230, 198, 92, 0.08);
          border-radius: 50%;
        }

        .farmart-product-wishlist-active {
          color: #e6c65c;
        }

        .farmart-product-location {
          margin: 5px 0 0;

          color: #71847a;

          font-family: "Modern Antiqua", serif;
          font-size: 14px;
        }

        .farmart-product-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 7px 16px;

          margin-top: 16px;

          color: #81948a;

          font-family: "Modern Antiqua", serif;
          font-size: 13px;
        }

        .farmart-product-divider {
          height: 1px;
          margin: 15px 0 17px;
          background: #526259;
        }

        .farmart-product-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
        }

        .farmart-product-amount {
          margin: 0;

          color: #4fdc82;

          font-family: "IBM Plex Serif", serif;
          font-size: 22px;
          font-weight: 700;
        }

        .farmart-product-seller {
          margin: 4px 0 0;

          color: #71847a;

          font-family: "Modern Antiqua", serif;
          font-size: 13px;

          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .farmart-product-cart {
          min-height: 52px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;

          flex-shrink: 0;

          padding: 0 17px;

          border: 1px solid #4a9f7b;
          border-radius: 13px;

          background: linear-gradient(
            135deg,
            #72c9a3,
            #4a9f7b
          );

          color: #ffffff;

          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          font-weight: 600;

          cursor: pointer;

          transition:
            background 180ms ease,
            box-shadow 180ms ease;
        }

        .farmart-product-cart:hover {
          background: linear-gradient(
            135deg,
            #82d4af,
            #55aa85
          );

          box-shadow: 0 9px 20px rgba(74, 159, 123, 0.23);
        }

        .farmart-product-unavailable {
          color: #b8c2bb;
          font-family: "Modern Antiqua", serif;
          font-size: 13px;
        }
      `}</style>

      <article className="farmart-product-card">

        <Link
          to={`/buyer/products/${id}`}
          className="farmart-product-image-link"
          aria-label={`View ${name}`}
        >
          {image ? (
            <img
              src={image}
              alt={name}
              className="farmart-product-image"
            />
          ) : (
            <div className="farmart-product-no-image">
              No image
            </div>
          )}
        </Link>

        <div className="farmart-product-content">

          <div className="farmart-product-heading">

            <Link
              to={`/buyer/products/${id}`}
              className="farmart-product-title-link"
            >
              <h2 className="farmart-product-title">
                {name}
              </h2>
            </Link>

            <button
              type="button"
              className={`
                farmart-product-wishlist
                ${isWishlisted ? 'farmart-product-wishlist-active' : ''}
              `}
              onClick={() => onToggleWishlist?.(product)}
              aria-label={
                isWishlisted
                  ? 'Remove from wishlist'
                  : 'Add to wishlist'
              }
              aria-pressed={isWishlisted}
            >
              <Heart
                size={19}
                fill={isWishlisted ? 'currentColor' : 'none'}
              />
            </button>

          </div>

          <p className="farmart-product-location">
            {category || 'Farm Product'}
            {location ? ` • ${location}` : ''}
          </p>

          <div className="farmart-product-meta">
            {quantity !== undefined && (
              <span>
                Quantity: {quantity}{quantityUnit}
              </span>
            )}
          </div>

          <div className="farmart-product-divider" />

          <div className="farmart-product-bottom">

            <div>
              <p className="farmart-product-amount">
                KES {Number(price || 0).toLocaleString()}
              </p>

              {seller && (
                <p className="farmart-product-seller">
                  {seller}
                </p>
              )}
            </div>

            {availability !== 'unavailable' ? (
              <button
                type="button"
                className="farmart-product-cart"
                onClick={() => onAddToCart?.(product)}
              >
                <ShoppingCart size={16} />
                Add to cart
              </button>
            ) : (
              <span className="farmart-product-unavailable">
                Unavailable
              </span>
            )}

          </div>

        </div>
      </article>
    </>
  )
}

export default ProductCard
