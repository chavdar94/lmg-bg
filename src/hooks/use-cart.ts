import { CartProduct } from "@/definitions/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  product: CartProduct;
};

type CartState = {
  items: CartProduct[];
  addItem: (product: CartProduct) => void;
  decreaseItem: (productId: string) => void;
  clearCart: () => void;
  removeItem: (productId: string) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          //
          const existingItemIndex = state.items.findIndex(
            (item) => item.id === product.id
          );
          const updatedItems = [...state.items];

          if (existingItemIndex > -1) {
            const existingItem = state.items[existingItemIndex];
            const updateItem = {
              ...existingItem,
              quantity: existingItem.quantity! + 1,
            };
            updatedItems[existingItemIndex] = updateItem;
          } else {
            updatedItems.push({ ...product, quantity: 1 });
          }

          return { ...state, items: updatedItems };
        }),
      decreaseItem: (productId) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.id === productId
          );

          const existingItem = state.items[existingItemIndex];
          const updatedItems = [...state.items];

          if (existingItem?.quantity === 1) {
            updatedItems.splice(existingItemIndex, 1);
          } else {
            const updatedItem = {
              ...existingItem,
              quantity: existingItem?.quantity! - 1,
            };
            updatedItems[existingItemIndex] = updatedItem;
          }

          return { ...state, items: updatedItems };
        }),
      clearCart: () =>
        set((state) => {
          return { items: [] };
        }),
      removeItem: (productId) =>
        set((state) => {
          return {
            items: state.items.filter((item) => item.id !== productId),
          };
        }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
