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
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorited: (id: string) => boolean;
  removeFavorite: (id: string) => void;
};

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  items: [],

  toggleFavorite: (item) =>
    set((state) => {
      const exists = state.items.some((i) => i.id === item.id);

      if (exists) {
        return { items: state.items.filter((i) => i.id !== item.id) };
      }

      return { items: [...state.items, item] };
    }),

  isFavorited: (id) => get().items.some((i) => i.id === id),

  removeFavorite: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),
}));
