"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  ReactNode,
} from "react";
import { toast } from "react-hot-toast";

export interface Product {
  id: string | number;
  name: string;
  price: number;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  /** updated on each add — handy for triggering animations in UI */
  lastAddedAt: number;
}

type Action =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity?: number } }
  | { type: "REMOVE_ITEM"; payload: { id: CartItem["id"] } }
  | { type: "INCREMENT"; payload: { id: CartItem["id"] } }
  | { type: "DECREMENT"; payload: { id: CartItem["id"] } }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; payload: CartState };

const initialState: CartState = { items: [], lastAddedAt: 0 };

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity = 1 } = action.payload;
      const idx = state.items.findIndex((i) => i.id === product.id);
      let items: CartItem[];
      if (idx !== -1) {
        items = state.items.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        items = [...state.items, { ...product, quantity }];
      }
      return { items, lastAddedAt: Date.now() };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload.id),
      };
    case "INCREMENT":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    case "DECREMENT":
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity - 1 } : i
          )
          .filter((i) => i.quantity > 0),
      };
    case "CLEAR":
      return { items: [], lastAddedAt: state.lastAddedAt };
    case "HYDRATE":
      return action.payload;
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  lastAddedAt: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: CartItem["id"]) => void;
  increment: (id: CartItem["id"]) => void;
  decrement: (id: CartItem["id"]) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "cart/v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // hydrate from localStorage (client only)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        dispatch({ type: "HYDRATE", payload: parsed });
      }
    } catch {}
  }, []);

  // persist whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const totalItems = useMemo(
    () => state.items.reduce((sum, i) => sum + i.quantity, 0),
    [state.items]
  );

  const totalPrice = useMemo(
    () => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [state.items]
  );

  const addToCartWithToast = (product: Product, quantity: number = 1) => {
    const existingItem = state.items.find((i) => i.id === product.id);
    
    if (existingItem) {
      // Product already in cart - show warning toast
      toast.error(`${product.name} is already in your cart!`, {
        icon: '⚠️',
        duration: 3000,
        style: {
          background: '#fef3f2',
          color: '#b91c1c',
          border: '1px solid #fecaca',
        },
      });
    } else {
      // New product - show success toast
      dispatch({ type: "ADD_ITEM", payload: { product, quantity } });
      toast.success(`${product.name} added to cart!`, {
        icon: '🛒',
        duration: 3000,
        style: {
          background: '#f0fdf4',
          color: '#15803d',
          border: '1px solid #bbf7d0',
        },
      });
    }
  };

  const removeFromCartWithToast = (id: CartItem["id"]) => {
    const item = state.items.find((i) => i.id === id);
    if (item) {
      dispatch({ type: "REMOVE_ITEM", payload: { id } });
      toast.success(`${item.name} removed from cart!`, {
        icon: '🗑️',
        duration: 3000,
        style: {
          background: '#fffbeb',
          color: '#b45309',
          border: '1px solid #fde68a',
        },
      });
    }
  };

  const incrementWithToast = (id: CartItem["id"]) => {
    const item = state.items.find((i) => i.id === id);
    if (item) {
      dispatch({ type: "INCREMENT", payload: { id } });
    }
  };

  const decrementWithToast = (id: CartItem["id"]) => {
    const item = state.items.find((i) => i.id === id);
    if (item && item.quantity > 1) {
      dispatch({ type: "DECREMENT", payload: { id } });
    }
  };

  const clearCartWithToast = () => {
    if (state.items.length > 0) {
      dispatch({ type: "CLEAR" });
      toast.success('Cart cleared!', {
        icon: '🧹',
        duration: 3000,
        style: {
          background: '#fef3f2',
          color: '#b91c1c',
          border: '1px solid #fecaca',
        },
      });
    }
  };

  const value: CartContextValue = {
    items: state.items,
    totalItems,
    totalPrice,
    lastAddedAt: state.lastAddedAt,
    addToCart: addToCartWithToast,
    removeFromCart: removeFromCartWithToast,
    increment: incrementWithToast,
    decrement: decrementWithToast,
    clearCart: clearCartWithToast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider/>");
  return ctx;
}