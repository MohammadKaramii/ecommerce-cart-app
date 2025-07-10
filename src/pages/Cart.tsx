import React, { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import CartItem from "../components/CartItem";

const Cart: React.FC = React.memo(() => {
  const { items, totalPrice, updateQuantity, removeFromCart } = useCart();

  const handleUpdateQuantity = useCallback(
    (productId: number, quantity: number) => {
      updateQuantity(productId, quantity);
    },
    [updateQuantity]
  );

  const handleRemoveFromCart = useCallback(
    (productId: number) => {
      removeFromCart(productId);
    },
    [removeFromCart]
  );

  const desktopItems = useMemo(() => {
    return items.map((item) => (
      <CartItem
        key={item.id}
        item={item}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        view="desktop"
      />
    ));
  }, [items, handleUpdateQuantity, handleRemoveFromCart]);

  const mobileItems = useMemo(() => {
    return items.map((item) => (
      <CartItem
        key={item.id}
        item={item}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        view="mobile"
      />
    ));
  }, [items, handleUpdateQuantity, handleRemoveFromCart]);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-8">
            Add some products to your cart to get started.
          </p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
        >
          Continue Shopping
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="hidden md:block">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">{desktopItems}</tbody>
          </table>
        </div>

        <div className="md:hidden divide-y divide-gray-200">{mobileItems}</div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Cart Summary</h2>
          <div className="text-3xl font-bold text-blue-600">
            ${totalPrice.toFixed(2)}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/"
            className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors text-center font-semibold"
          >
            Back to Products
          </Link>
          <Link
            to="/finalize"
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center font-semibold"
          >
            Finalize Order
          </Link>
        </div>
      </div>
    </div>
  );
});


export default Cart;
