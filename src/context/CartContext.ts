import { createContext } from "react";
import type { CartItem, Product } from "../types";

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

interface CartContextType extends CartState {
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export type { CartContextType, CartState };
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
