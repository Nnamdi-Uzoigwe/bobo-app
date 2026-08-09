// // store/cartStore.ts
// import { ImageSourcePropType } from "react-native";
// import { create } from "zustand";

// export type CartItem = {
//   id: string;
//   name: string;
//   image: ImageSourcePropType;
//   price: number;
//   quantity: number;
// };

// type CartStore = {
//   items: CartItem[];
//   addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
//   increaseQty: (id: string) => void;
//   decreaseQty: (id: string) => void;
//   removeFromCart: (id: string) => void;
//   clearCart: () => void;
// };

// export const useCartStore = create<CartStore>((set) => ({
//   items: [],

//   addToCart: (item, quantity = 1) =>
//     set((state) => {
//       const existing = state.items.find((i) => i.id === item.id);

//       if (existing) {
//         return {
//           items: state.items.map((i) =>
//             i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i,
//           ),
//         };
//       }

//       return { items: [...state.items, { ...item, quantity }] };
//     }),

//   increaseQty: (id) =>
//     set((state) => ({
//       items: state.items.map((i) =>
//         i.id === id ? { ...i, quantity: i.quantity + 1 } : i,
//       ),
//     })),

//   decreaseQty: (id) =>
//     set((state) => ({
//       items: state.items.map((i) =>
//         i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i,
//       ),
//     })),

//   removeFromCart: (id) =>
//     set((state) => ({
//       items: state.items.filter((i) => i.id !== id),
//     })),

//   clearCart: () => set({ items: [] }),
// }));

import { apiDelete, apiGet, apiPatch, apiPost } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { ImageSourcePropType } from "react-native";
import { create } from "zustand";

export type CartItem = {
  id: string;
  name: string;
  image: ImageSourcePropType;
  price: number;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  hydrateCart: () => Promise<void>;
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

function getToken() {
  return useAuthStore.getState().token ?? undefined;
}

// backend returns items as [{ menuItem: { _id, name, price, image, ... }, quantity }]
// map that shape into the flat CartItem shape the UI already expects
function mapServerCart(serverItems: any[]): CartItem[] {
  return serverItems
    .filter((i) => i.menuItem) // guard against a deleted menu item still referenced
    .map((i) => ({
      id: i.menuItem._id,
      name: i.menuItem.name,
      image: { uri: i.menuItem.image },
      price: i.menuItem.price,
      quantity: i.quantity,
    }));
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],

  hydrateCart: async () => {
    const token = getToken();
    if (!token) return;
    try {
      const data = await apiGet("/cart", token);
      set({ items: mapServerCart(data.items) });
    } catch (err) {
      console.error("Failed to load cart:", err);
    }
  },

  addToCart: (item, quantity = 1) => {
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i,
          ),
        };
      }
      return { items: [...state.items, { ...item, quantity }] };
    });

    const token = getToken();
    if (token) {
      apiPost("/cart/items", { menuItemId: item.id, quantity }, token).catch(
        (err) => console.error("Failed to sync add to cart:", err),
      );
    }
  },

  increaseQty: (id) => {
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    }));

    const token = getToken();
    if (token) {
      apiPatch(`/cart/items/${id}/increase`, {}, token).catch((err) =>
        console.error("Failed to sync quantity increase:", err),
      );
    }
  },

  decreaseQty: (id) => {
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i,
      ),
    }));

    const token = getToken();
    if (token) {
      apiPatch(`/cart/items/${id}/decrease`, {}, token).catch((err) =>
        console.error("Failed to sync quantity decrease:", err),
      );
    }
  },

  removeFromCart: (id) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    }));

    const token = getToken();
    if (token) {
      apiDelete(`/cart/items/${id}`, token).catch((err) =>
        console.error("Failed to sync item removal:", err),
      );
    }
  },

  clearCart: () => {
    set({ items: [] });

    const token = getToken();
    if (token) {
      apiDelete("/cart", token).catch((err) =>
        console.error("Failed to sync cart clear:", err),
      );
    }
  },
}));
