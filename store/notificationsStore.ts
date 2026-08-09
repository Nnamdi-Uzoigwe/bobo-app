import { apiGet, apiPatch } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { create } from "zustand";

export type RawNotification = {
  _id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
};

type NotificationsState = {
  notifications: RawNotification[];
  hydrateNotifications: () => Promise<void>;
  markRead: (id: string) => void;
};

function getToken() {
  return useAuthStore.getState().token ?? undefined;
}

export const useNotificationsStore = create<NotificationsState>((set) => ({
  notifications: [],

  hydrateNotifications: async () => {
    const token = getToken();
    if (!token) return;
    try {
      const data = await apiGet("/notifications", token);
      set({ notifications: data });
    } catch (err) {
      console.error("Failed to load notifications:", err);
    }
  },

  markRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n._id === id ? { ...n, read: true } : n,
      ),
    }));

    const token = getToken();
    if (token) {
      apiPatch(`/notifications/${id}/read`, {}, token).catch((err) =>
        console.error("Failed to sync notification read:", err),
      );
    }
  },
}));
