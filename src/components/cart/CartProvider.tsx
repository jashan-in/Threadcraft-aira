"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import type { CartItem } from "@/types/cart";

type AddCartItem = Omit<CartItem, "cartItemId">;

type CartContextType = {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;

  addToCart: (item: AddCartItem) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (
    cartItemId: string,
    quantity: number
  ) => void;

  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

const CART_STORAGE_KEY = "threadcraft-aira-cart";

export default function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(
        CART_STORAGE_KEY
      );

      if (savedCart) {
        const parsedCart = JSON.parse(
          savedCart
        ) as CartItem[];

        setCartItems(parsedCart);
      }
    } catch (error) {
      console.error("Unable to load cart:", error);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cartItems)
    );
  }, [cartItems, loaded]);

  const addToCart = (item: AddCartItem) => {
    const cartItem: CartItem = {
      ...item,
      cartItemId: crypto.randomUUID(),
    };

    setCartItems((currentItems) => [
      ...currentItems,
      cartItem,
    ]);
  };

  const removeFromCart = (
    cartItemId: string
  ) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) =>
          item.cartItemId !== cartItemId
      )
    );
  };

  const updateQuantity = (
    cartItemId: string,
    quantity: number
  ) => {
    if (quantity < 1) return;

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.cartItemId === cartItemId
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}