import { Link } from 'react-router-dom'
import { Heart, ShoppingCart } from 'react-icons/fa'

function LivestockCard({
  livestock,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
}) {
  if (!livestock) {
    return null
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
    availability,
  } = livestock

  return (
    <>
      <style>{`
        .farmart-livestock-card {
          width: 100%;
          max-width: 360px;
          overflow: hidden;

          border: 1px solid #b9c8bc;
          border-radius: 18px;

          background: #172019;
          color: #edf4ee;

          box-shadow:
            0 12px 28px rgba(25, 48, 33, 0.12);

          transition:
            box-shadow 180ms ease,
            border-color 180ms ease;
        }

        .farmart-livestock-card:hover {
          border-color: #83a58d;
          box-shadow:
            0 16px 34px rgba(25, 48, 33, 0.18);
        }

        .farmart-livestock-image-link {
          display: block;
          width: 100%;
          height: 220px;

          background: #edf5e9;
          text-decoration: none;
        }

        .farmart-livestock-image {
          width: 100%;
          height: 100%;
          display: block;

          object-fit: cover;
        }

        .farmart-livestock-no-image {
          width: 100%;
          height: 100%;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #61736a;

          font-family: "Modern Antiqua", serif;
          font-size: 16px;
        }

        .farmart-livestock-content {
          padding: 20px 21px 22px;
        }

        .farmart-livestock-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }

        .farmart-livestock-title-link {
          min-width: 0;
          color: #f0f5f0;
          text-decoration: none;
        }

        .farmart-livestock-title {
          margin: 0;

          font-family: "IBM Plex Serif", serif;
          font-size: 20px;
          font-weight: 700;
          line-height: 1.3;
        }

        .farmart-livestock-title-link:hover {
          color: #72c9a3;
        }

        .farmart-wishlist-button {
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

        .farmart-wishlist-button:hover {
          color: #e6c65c;
          background: rgba(230, 198, 92, 0.08);
          border-radius: 50%;
        }

        .farmart-wishlist-active {
          color: #e6c65c;
        }

        .farmart-livestock-location {
          margin: 5px 0 0;

          color: #71847a;

          font-family: "Modern Antiqua", serif;
          font-size: 14px;
          line-height: 1.5;
        }

        .farmart-livestock-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 7px 16px;

          margin-top: 16px;

          color: #81948a;

          font-family: "Modern Antiqua", serif;
          font-size: 13px;
          line-height: 1.5;
        }

        .farmart-livestock-divider {
          height: 1px;
          margin: 15px 0 17px;

          background: #526259;
        }

        .farmart-livestock-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
        }

        .farmart-livestock-price {
          min-width: 0;
        }

        .farmart-livestock-amount {
          margin: 0;

          color: #4fdc82;

          font-family: "IBM Plex Serif", serif;
          font-size: 22px;
          font-weight: 700;
          line-height: 1.2;
        }

        .farmart-livestock-seller {
          margin: 4px 0 0;

          overflow: hidden;

          color: #71847a;

          font-family: "Modern Antiqua", serif;
          font-size: 13px;
          line-height: 1.4;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .farmart-add-cart {
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

          box-shadow:
            0 7px 16px rgba(74, 159, 123, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.25);

          transition:
            background 180ms ease,
            box-shadow 180ms ease;
        }

        .farmart-add-cart:hover {
          background: linear-gradient(
            135deg,
            #82d4af,
            #55aa85
          );

          box-shadow:
            0 9px 20px rgba(74, 159, 123, 0.23),
            inset 0 1px 0 rgba(255, 255, 255, 0.30);
        }

        .farmart-add-cart:active {
          box-shadow:
            inset 3px 3px 7px rgba(0, 0, 0, 0.14);
        }

        .farmart-unavailable {
          color: #b8c2bb;
          font-family: "Modern Antiqua", serif;
          font-size: 13px;
        }

        @media (max-width: 500px) {
          .farmart-livestock-image-link {
            height: 200px;
          }

          .farmart-livestock-content {
            padding: 18px;
          }

          .farmart-livestock-title {
            font-size: 18px;
          }

          .farmart-livestock-bottom {
            align-items: flex-end;
          }

          .farmart-add-cart {
            min-height: 46px;
            padding: 0 13px;
          }
        }
      `}</style>

      <article className="farmart-livestock-card">

        <Link
          to={`/buyer/livestock/${id}`}
          className="farmart-livestock-image-link"
          aria-label={`View ${name}`}
        >
          {image ? (
            <img
              src={image}
              alt={name}
              className="farmart-livestock-image"
            />
          ) : (
            <div className="farmart-livestock-no-image">
              No image
            </div>
          )}
        </Link>

        <div className="farmart-livestock-content">

          <div className="farmart-livestock-heading">

            <Link
              to={`/buyer/livestock/${id}`}
              className="farmart-livestock-title-link"
            >
              <h2 className="farmart-livestock-title">
                {name}
              </h2>
            </Link>

            <button
              type="button"
              className={`
                farmart-wishlist-button
                ${isWishlisted ? 'farmart-wishlist-active' : ''}
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
                size={19}
                fill={isWishlisted ? 'currentColor' : 'none'}
              />
            </button>

          </div>

          <p className="farmart-livestock-location">
            {breed || type}
            {location ? ` • ${location}` : ''}
          </p>

          <div className="farmart-livestock-meta">
            {age !== undefined && age !== null && (
              <span>Age: {age}</span>
            )}

            {sex && (
              <span>Gender: {sex}</span>
            )}

            {weight !== undefined && weight !== null && (
              <span>Weight: {weight}kg</span>
            )}
          </div>

          <div className="farmart-livestock-divider" />

          <div className="farmart-livestock-bottom">

            <div className="farmart-livestock-price">

              <p className="farmart-livestock-amount">
                KES {Number(price || 0).toLocaleString()}
              </p>

              {seller && (
                <p className="farmart-livestock-seller">
                  {seller}
                </p>
              )}

            </div>

            {availability !== 'unavailable' ? (
              <button
                type="button"
                className="farmart-add-cart"
                onClick={() => onAddToCart?.(livestock)}
              >
                <ShoppingCart size={16} />
                Add to cart
              </button>
            ) : (
              <span className="farmart-unavailable">
                Unavailable
              </span>
            )}

          </div>

        </div>

      </article>
    </>
  )
}

export default LivestockCard
// commit 43
