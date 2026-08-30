import CartItem from "./CartItem";

const list = {
  display: "flex",
  flexDirection: "column",
};

export default function CartList({ items = [], onUpdateQuantity, onRemove }) {
  if (!items.length) return null;
  return (
    <div style={list}>
      {items.map((item) => (
        <CartItem
          key={item.listingId}
          item={item}
          onUpdateQuantity={onUpdateQuantity}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
