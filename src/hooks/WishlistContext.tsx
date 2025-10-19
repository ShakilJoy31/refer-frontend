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

export interface WishlistItem extends Product {
  addedAt: number;
}

interface WishlistState {
  items: WishlistItem[];
  /** updated on each add — handy for triggering animations in UI */
  lastAddedAt: number;
}

type Action =
  | { type: "ADD_ITEM"; payload: { product: Product } }
  | { type: "REMOVE_ITEM"; payload: { id: WishlistItem["id"] } }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; payload: WishlistState };

const initialState: WishlistState = { items: [], lastAddedAt: 0 };

function wishlistReducer(state: WishlistState, action: Action): WishlistState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product } = action.payload;
      const idx = state.items.findIndex((i) => i.id === product.id);
      
      if (idx !== -1) {
        // Item already in wishlist, don't add again
        return state;
      }
      
      const items = [...state.items, { ...product, addedAt: Date.now() }];
      return { items, lastAddedAt: Date.now() };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload.id),
      };
    case "CLEAR":
      return { items: [], lastAddedAt: state.lastAddedAt };
    case "HYDRATE":
      return action.payload;
    default:
      return state;
  }
}

type WishlistContextValue = {
  items: WishlistItem[];
  totalItems: number;
  lastAddedAt: number;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: WishlistItem["id"]) => void;
  clearWishlist: () => void;
  isInWishlist: (id: WishlistItem["id"]) => boolean;
};

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

const STORAGE_KEY = "wishlist/v1";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // hydrate from localStorage (client only)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as WishlistState;
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
    () => state.items.length,
    [state.items]
  );

  const isInWishlist = (id: WishlistItem["id"]) => {
    return state.items.some(item => item.id === id);
  };

  const addToWishlistWithToast = (product: Product) => {
    if (isInWishlist(product.id)) {
      // Product already in wishlist - show info toast
      toast('Already in wishlist!', {
        icon: '❤️',
        duration: 2000,
        style: {
          background: '#fef7ff',
          color: '#7e22ce',
          border: '1px solid #e9d5ff',
        },
      });
    } else {
      // New product - show success toast
      dispatch({ type: "ADD_ITEM", payload: { product } });
      toast.success(`${product.name} added to wishlist!`, {
        icon: '❤️',
        duration: 3000,
         style: {
          background: '#f0fdf4',
          color: '#15803d',
          border: '1px solid #bbf7d0',
        },
      });
    }
  };

  const removeFromWishlistWithToast = (id: WishlistItem["id"]) => {
    const item = state.items.find((i) => i.id === id);
    if (item) {
      dispatch({ type: "REMOVE_ITEM", payload: { id } });
      toast.success(`${item.name} removed from wishlist!`, {
        icon: '💔',
        duration: 3000,
        style: {
          background: '#fffbeb',
          color: '#b45309',
          border: '1px solid #fde68a',
        },
      });
    }
  };

  const clearWishlistWithToast = () => {
    if (state.items.length > 0) {
      dispatch({ type: "CLEAR" });
      toast.success('Wishlist cleared!', {
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

  const value: WishlistContextValue = {
    items: state.items,
    totalItems,
    lastAddedAt: state.lastAddedAt,
    addToWishlist: addToWishlistWithToast,
    removeFromWishlist: removeFromWishlistWithToast,
    clearWishlist: clearWishlistWithToast,
    isInWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside <WishlistProvider/>");
  return ctx;
}