// import { ImageSourcePropType } from "react-native";
// import { create } from "zustand";

// export type FavoriteItem = {
//   id: string;
//   name: string;
//   image: ImageSourcePropType;
//   price: number;
// };

// type FavoritesStore = {
//   items: FavoriteItem[];
//   toggleFavorite: (item: FavoriteItem) => void;
//   isFavorited: (id: string) => boolean;
//   removeFavorite: (id: string) => void;
// };

// export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
//   items: [],

//   toggleFavorite: (item) =>
//     set((state) => {
//       const exists = state.items.some((i) => i.id === item.id);

//       if (exists) {
//         return { items: state.items.filter((i) => i.id !== item.id) };
//       }

//       return { items: [...state.items, item] };
//     }),

//   isFavorited: (id) => get().items.some((i) => i.id === id),

//   removeFavorite: (id) =>
//     set((state) => ({
//       items: state.items.filter((i) => i.id !== id),
//     })),
// }));

import { apiDelete, apiGet, apiPost } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { ImageSourcePropType } from "react-native";
import { create } from "zustand";

export type FavoriteItem = {
  id: string;
  name: string;
  image: ImageSourcePropType;
  price: number;
};

type FavoritesStore = {
  items: FavoriteItem[];
  hydrateFavorites: () => Promise<void>;
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorited: (id: string) => boolean;
  removeFavorite: (id: string) => void;
};

function getToken() {
  return useAuthStore.getState().token ?? undefined;
}

// backend returns items as [{ _id, name, price, image, ... }] (populated MenuItems)
function mapServerFavorites(serverItems: any[]): FavoriteItem[] {
  return serverItems.map((i) => ({
    id: i._id,
    name: i.name,
    image: { uri: i.image },
    price: i.price,
  }));
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  items: [],

  hydrateFavorites: async () => {
    const token = getToken();
    if (!token) return;
    try {
      const data = await apiGet("/favorites", token);
      set({ items: mapServerFavorites(data.items) });
    } catch (err) {
      console.error("Failed to load favorites:", err);
    }
  },

  toggleFavorite: (item) => {
    set((state) => {
      const exists = state.items.some((i) => i.id === item.id);
      if (exists) {
        return { items: state.items.filter((i) => i.id !== item.id) };
      }
      return { items: [...state.items, item] };
    });

    const token = getToken();
    if (token) {
      apiPost(`/favorites/${item.id}/toggle`, {}, token).catch((err) =>
        console.error("Failed to sync favorite toggle:", err),
      );
    }
  },

  isFavorited: (id) => get().items.some((i) => i.id === id),

  removeFavorite: (id) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    }));

    const token = getToken();
    if (token) {
      apiDelete(`/favorites/${id}`, token).catch((err) =>
        console.error("Failed to sync favorite removal:", err),
      );
    }
  },
}));
