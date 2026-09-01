import LivestockCard from './LivestockCard'

function LivestockGrid({
  livestock = [],
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
}) {
  if (livestock.length === 0) {
    return (
      <>
        <style>{`
          .farmart-livestock-empty {
            width: 100%;
            padding: 60px 24px;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            text-align: center;

            border: 1px dashed #b9c8bc;
            border-radius: 20px;

            background: rgba(237, 245, 233, 0.45);
          }

          .farmart-livestock-empty h2 {
            margin: 0 0 8px;

            color: #385442;

            font-family: "IBM Plex Serif", serif;
            font-size: 22px;
          }

          .farmart-livestock-empty p {
            max-width: 420px;
            margin: 0;

            color: #71847a;

            font-family: "Modern Antiqua", serif;
            font-size: 14px;
            line-height: 1.7;
          }
        `}</style>

        <div className="farmart-livestock-empty">
          <h2>No livestock found</h2>

          <p>
            Sorry, but there is no livestock matching
            your current search or filters.
          </p>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{`
        .farmart-livestock-grid {
          width: 100%;

          display: grid;
          grid-template-columns:
            repeat(auto-fit, minmax(280px, 360px));

          justify-content: center;
          gap: 24px;
        }

        @media (max-width: 650px) {
          .farmart-livestock-grid {
            grid-template-columns: minmax(0, 1fr);
          }
        }
      `}</style>

      <div className="farmart-livestock-grid">
        {livestock.map((animal) => (
          <LivestockCard
            key={animal.id}
            livestock={animal}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            isWishlisted={wishlistIds.includes(animal.id)}
          />
        ))}
      </div>
    </>
  )
}

export default LivestockGrid
// commit 45
