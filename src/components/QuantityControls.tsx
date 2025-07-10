import React, { useCallback } from "react";

interface QuantityControlsProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  size?: "sm" | "md";
}

const QuantityControls: React.FC<QuantityControlsProps> = React.memo(
  ({ quantity, onIncrement, onDecrement, size = "md" }) => {
    const handleDecrement = useCallback(() => {
      onDecrement();
    }, [onDecrement]);

    const handleIncrement = useCallback(() => {
      onIncrement();
    }, [onIncrement]);

    const buttonSize = size === "sm" ? "w-8 h-8" : "w-10 h-10";
    const textSize = size === "sm" ? "text-lg" : "text-xl";
    const iconSize = size === "sm" ? "w-4 h-4" : "w-4 h-4";

    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={handleDecrement}
          className={`${buttonSize} rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors`}
        >
          <svg
            className={iconSize}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 12H4"
            />
          </svg>
        </button>

        <span
          className={`${textSize} font-semibold text-gray-800 min-w-[2rem] text-center`}
        >
          {quantity}
        </span>

        <button
          onClick={handleIncrement}
          className={`${buttonSize} rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors`}
        >
          <svg
            className={iconSize}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
    );
  }
);



export default QuantityControls;
