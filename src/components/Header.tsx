import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const Header: React.FC = () => {
  const { totalItems } = useCart();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
          >
            TechStore
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Products
            </Link>
          </nav>

          <Link
            to="/cart"
            className="relative flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5-5M7 13l-2.5 5m0 0v3a2 2 0 002 2h10a2 2 0 002-2v-3m-10 0V9a2 2 0 012-2h6a2 2 0 012 2v4"
              />
            </svg>
            <span className="font-medium">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        <nav className="md:hidden mt-4 pt-4 border-t border-gray-200">
          <Link
            to="/"
            className="block text-gray-600 hover:text-blue-600 transition-colors font-medium"
          >
            Products
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
