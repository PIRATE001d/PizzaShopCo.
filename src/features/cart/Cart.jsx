import { useAtom } from 'jotai';
import { cartAtom, deleteItemAtom, increaseItemQuantityAtom, decreaseItemQuantityAtom, clearCartAtom } from '../cart/cartSlice';
import { Link } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useAtom(cartAtom); // Use cartWithTotalPriceAtom for dynamic totalPrice
  const [, deleteItem] = useAtom(deleteItemAtom);
  const [, increaseQuantity] = useAtom(increaseItemQuantityAtom);
  const [, decreaseQuantity] = useAtom(decreaseItemQuantityAtom);
  const [, clearCart] = useAtom(clearCartAtom);

  const handleIncreaseQuantity = (pizzaId) => {
    increaseQuantity(pizzaId);
  };

  const handleDecreaseQuantity = (pizzaId) => {
    decreaseQuantity(pizzaId);
  };

  const handleDeleteItem = (pizzaId) => {
    deleteItem(pizzaId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      {/* Back button */}
      <Link
        className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
        to="/menu"
      >
        &larr; Back to menu
      </Link>

      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6">Your cart</h2>

      {/* Cart items */}
      <div className="space-y-4 mb-6">
        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-white rounded-md shadow-sm"
            >
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity} x ${item.unitPrice}
                </p>
              </div>
              <p className="font-bold">${item.totalPrice}</p>

              {/* Action buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleIncreaseQuantity(item.id)}
                  className="bg-blue-500 text-white py-1 px-3 rounded-full hover:bg-blue-600"
                >
                  +
                </button>
                <button
                  onClick={() => handleDecreaseQuantity(item.id)}
                  className="bg-yellow-500 text-white py-1 px-3 rounded-full hover:bg-yellow-600"
                >
                  -
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Link
          to="/order/new"
          className="bg-yellow-400 text-stone-500 py-2 px-4 rounded-full hover:bg-yellow-500 ease-out"
        >
          Order pizzas
        </Link>
        <button
          onClick={handleClearCart}
          className="border-2 rounded-full border-grey-lighter py-2 px-4 shadow-inner font-mono text-sm font-extrabold text-gray-400 hover:bg-gray-200 ease-out"
        >
          Clear cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
