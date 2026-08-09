import { apiGet } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { create } from "zustand";

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  kcal: number;
  category: string;
};

type MenuState = {
  items: MenuItem[];
  loading: boolean;
  error: string;
  hydrateMenu: () => Promise<void>;
};

export const useMenuStore = create<MenuState>((set) => ({
  items: [],
  loading: true,
  error: "",

  hydrateMenu: async () => {
    set({ loading: true, error: "" });
    try {
      const token = useAuthStore.getState().token ?? undefined;
      const data = await apiGet("/menu", token);
      set({ items: data, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to load menu", loading: false });
    }
  },
}));
