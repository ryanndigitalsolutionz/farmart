import CartItem from './CartItem'

const CartList = ({ items, onUpdateQuantity, onRemove }) => {
  if (!items.length) return null
  return (
    <div>
      {items.map((item) => (
        <CartItem
          key={item.cartItemId}
          item={item}
          onUpdateQuantity={onUpdateQuantity}
          onRemove={onRemove}
        />
      ))}
    </div>
  )
}

export default CartList
