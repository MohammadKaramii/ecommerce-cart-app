import React, { useCallback } from "react";
import type { CartItem as CartItemType } from "../types";
import QuantityControls from "./QuantityControls";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
  view?: "desktop" | "mobile";
}

const CartItem: React.FC<CartItemProps> = React.memo(
  ({ item, onUpdateQuantity, onRemove, view = "desktop" }) => {
    const handleIncrement = useCallback(() => {
      onUpdateQuantity(item.product.id, item.quantity + 1);
    }, [item.product.id, item.quantity, onUpdateQuantity]);

    const handleDecrement = useCallback(() => {
      if (item.quantity > 1) {
        onUpdateQuantity(item.product.id, item.quantity - 1);
      }
    }, [item.product.id, item.quantity, onUpdateQuantity]);

    const handleRemove = useCallback(() => {
      onRemove(item.product.id);
    }, [item.product.id, onRemove]);

    const totalPrice = item.product.price * item.quantity;

    if (view === "desktop") {
      return (
        <tr className="hover:bg-gray-50">
          <td className="px-6 py-4">
            <div className="flex items-center">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded-lg mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.product.name}
                </h3>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 text-lg font-medium text-gray-800">
            ${item.product.price.toFixed(2)}
          </td>
          <td className="px-6 py-4">
            <QuantityControls
              quantity={item.quantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              size="sm"
            />
          </td>
          <td className="px-6 py-4 text-lg font-bold text-blue-600">
            ${totalPrice.toFixed(2)}
          </td>
          <td className="px-6 py-4">
            <button
              onClick={handleRemove}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </td>
        </tr>
      );
    }

    return (
      <div className="p-4">
        <div className="flex items-center space-x-4">
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {item.product.name}
            </h3>
            <p className="text-lg font-medium text-gray-600">
              ${item.product.price.toFixed(2)}
            </p>
          </div>
          <button
            onClick={handleRemove}
            className="text-red-600 hover:text-red-800 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Quantity:</span>
            <QuantityControls
              quantity={item.quantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              size="sm"
            />
          </div>

          <div className="text-lg font-bold text-blue-600">
            ${totalPrice.toFixed(2)}
          </div>
        </div>
      </div>
    );
  }
);



export default CartItem;
