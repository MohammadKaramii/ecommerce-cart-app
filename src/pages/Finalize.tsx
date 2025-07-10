import React, { useState, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const Finalize: React.FC = React.memo(() => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isConfirming, setIsConfirming] = useState(false);

  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const orderItems = useMemo(() => {
    return items.map((item) => (
      <div key={item.id} className="p-6 flex items-center space-x-4">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-16 h-16 object-cover rounded-lg"
        />

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">
            {item.product.name}
          </h3>
          <p className="text-gray-600">
            ${item.product.price.toFixed(2)} × {item.quantity}
          </p>
        </div>

        <div className="text-lg font-bold text-blue-600">
          ${(item.product.price * item.quantity).toFixed(2)}
        </div>
      </div>
    ));
  }, [items]);

  const handleConfirmOrder = useCallback(async () => {
    setIsConfirming(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    clearCart();
    alert("Order confirmed successfully! Thank you for your purchase.");
    navigate("/");
  }, [clearCart, navigate]);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            No Items to Finalize
          </h1>
          <p className="text-gray-600 mb-8">
            Your cart is empty. Add some products first.
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
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Order Summary
        </h1>

        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Items in Your Order
            </h2>
          </div>

          <div className="divide-y divide-gray-200">{orderItems}</div>
        </div>

        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Order Total
            </h2>

            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({totalItems} items):</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax:</span>
                <span>Included</span>
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between text-xl font-bold text-gray-800">
                  <span>Total:</span>
                  <span className="text-blue-600">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Delivery Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
              <div>
                <p className="font-medium text-gray-800">Shipping Address:</p>
                <p>123 Demo Street</p>
                <p>Demo City, DC 12345</p>
                <p>United States</p>
              </div>

              <div>
                <p className="font-medium text-gray-800">Estimated Delivery:</p>
                <p>3-5 business days</p>
                <p className="font-medium text-gray-800 mt-2">
                  Payment Method:
                </p>
                <p>Credit Card ending in ****1234</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/cart"
            className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors text-center font-semibold"
          >
            Back to Cart
          </Link>

          <button
            onClick={handleConfirmOrder}
            disabled={isConfirming}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold text-white transition-colors ${
              isConfirming
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isConfirming ? "Processing Order..." : "Confirm Order"}
          </button>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <svg
              className="w-6 h-6 text-blue-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-blue-800">
              Order Confirmation
            </h3>
          </div>
          <p className="text-blue-700">
            By clicking "Confirm Order", you agree to our terms and conditions.
            Your order will be processed immediately and you'll receive a
            confirmation email.
          </p>
        </div>
      </div>
    </div>
  );
});



export default Finalize;
