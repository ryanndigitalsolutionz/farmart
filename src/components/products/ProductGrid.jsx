import ProductCard from './ProductCard'

function ProductGrid({
  products = [],
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
}) {
  if (products.length === 0) {
    return (
      <>
        <style>{`
          .farmart-product-empty {
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

          .farmart-product-empty h2 {
            margin: 0 0 8px;

            color: #385442;

            font-family: "IBM Plex Serif", serif;
            font-size: 22px;
          }

          .farmart-product-empty p {
            max-width: 420px;
            margin: 0;

            color: #71847a;

            font-family: "Modern Antiqua", serif;
            font-size: 14px;
            line-height: 1.7;
          }
        `}</style>

        <div className="farmart-product-empty">
          <h2>No farm products found</h2>

          <p>
            Sorry, but there is no farm produce matching
            your current search or filters.
          </p>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{`
        .farmart-product-grid {
          width: 100%;

          display: grid;
          grid-template-columns:
            repeat(auto-fit, minmax(280px, 360px));

          justify-content: center;
          gap: 24px;
        }

        @media (max-width: 650px) {
          .farmart-product-grid {
            grid-template-columns: minmax(0, 1fr);
          }
        }
      `}</style>

      <div className="farmart-product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            isWishlisted={wishlistIds.includes(product.id)}
          />
        ))}
      </div>
    </>
  )
}

export default ProductGrid
