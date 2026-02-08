import {create} from "zustand";
import {persist} from "zustand/middleware";
import type { CartProduct } from "../types/CartProduct";

type CartState = {
    cart: CartProduct[];
    addToCart: (product: CartProduct) => void;
    removeFromCart: (productId: number) => void;
    increaseQty: (productId: number) => void;
    decreaseQty: (productId: number) => void;
    clearCart: () => void;
    totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) =>
        set((state) => {
          const existing = state.cart.find((p) => p.id === product.id);

          if (existing) {
            return {
              cart: state.cart.map((p) =>
                p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
              ),
            };
          }

          return {
            cart: [...state.cart, { ...product, quantity: 1 }],
          };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((p) => p.id !== id),
        })),

      increaseQty: (id) =>
        set((state) => ({
          cart: state.cart.map((p) =>
            p.id === id ? { ...p, quantity: p.quantity + 1 } : p
          ),
        })),

      decreaseQty: (id) =>
        set((state) => ({
          cart: state.cart
            .map((p) =>
              p.id === id ? { ...p, quantity: p.quantity - 1 } : p
            )
            .filter((p) => p.quantity > 0),
        })),

      clearCart: () => set({ cart: [] }),

      totalPrice: () =>
        get().cart.reduce((sum, p) => sum + p.price * p.quantity, 0),
    }),
    {
      name: "cart-storage", // zapis do localStorage
    }
  )
);