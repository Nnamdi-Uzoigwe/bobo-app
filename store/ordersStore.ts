// import type { Order } from "@/components/orders/OrderCard";
// import type { CartItem } from "@/store/cartStore";
// import { create } from "zustand";

// export type OrderStatus = "current" | "previous";

// export type StoredOrder = Order & {
//   status: OrderStatus;
//   placedAt: number;
// };

// type OrdersState = {
//   orders: StoredOrder[];
//   placeOrder: (items: CartItem[], estDelivery?: string) => void;
//   markDelivered: (id: string) => void;
// };

// export const useOrdersStore = create<OrdersState>((set) => ({
//   orders: [],

//   placeOrder: (items, estDelivery = "30mins") =>
//     set((state) => {
//       if (items.length === 0) return state;

//       const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
//       const [first, second] = items;

//       const newOrder: StoredOrder = {
//         id: Date.now().toString(),
//         status: "current",
//         placedAt: Date.now(),
//         estDelivery,
//         summary: first.name,
//         image: first.image,
//         thumbnail: second?.image,
//         extraItemsCount: items.length > 2 ? items.length - 2 : undefined,
//         total,
//       };

//       return { orders: [newOrder, ...state.orders] };
//     }),

//   markDelivered: (id) =>
//     set((state) => ({
//       orders: state.orders.map((o) =>
//         o.id === id ? { ...o, status: "previous" } : o,
//       ),
//     })),
// }));

// import type { Order } from "@/components/orders/OrderCard";
// import { apiGet, apiPost } from "@/lib/api";
// import { useAuthStore } from "@/store/authStore";
// import { create } from "zustand";

// export type OrderStatus = "current" | "previous";

// export type StoredOrder = Order & {
//   status: OrderStatus;
//   placedAt: number;
// };

// type OrdersState = {
//   orders: StoredOrder[];
//   hydrateOrders: () => Promise<void>;
//   placeOrder: (estDelivery?: string) => Promise<void>;
// };

// function getToken() {
//   return useAuthStore.getState().token ?? undefined;
// }

// // backend order: { _id, items: [{ name, image, price, quantity }], status, estDelivery, total, createdAt }
// function mapServerOrder(o: any): StoredOrder {
//   const [first, second] = o.items;

//   return {
//     id: o._id,
//     status: o.status,
//     estDelivery: o.estDelivery,
//     summary: first?.name ?? "",
//     image: { uri: first?.image },
//     thumbnail: second ? { uri: second.image } : undefined,
//     extraItemsCount: o.items.length > 2 ? o.items.length - 2 : undefined,
//     total: o.total,
//     placedAt: new Date(o.createdAt).getTime(),
//   };
// }

// export const useOrdersStore = create<OrdersState>((set) => ({
//   orders: [],

//   hydrateOrders: async () => {
//     const token = getToken();
//     if (!token) return;
//     try {
//       const data = await apiGet("/orders", token);
//       set({ orders: data.map(mapServerOrder) });
//     } catch (err) {
//       console.error("Failed to load orders:", err);
//     }
//   },

//   placeOrder: async (estDelivery = "30mins") => {
//     const token = getToken();
//     if (!token) throw new Error("Not authenticated");

//     const data = await apiPost("/orders", { estDelivery }, token);
//     const newOrder = mapServerOrder(data);

//     set((state) => ({ orders: [newOrder, ...state.orders] }));
//   },
// }));

import type { Order } from "@/components/orders/OrderCard";
import { apiGet, apiPost } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { create } from "zustand";

export type OrderStatus = "current" | "previous";

export type StoredOrder = Order & {
  status: OrderStatus;
  placedAt: number;
};

type OrdersState = {
  orders: StoredOrder[];
  hydrateOrders: () => Promise<void>;
  placeOrder: (estDelivery?: string) => Promise<void>;
};

function getToken() {
  return useAuthStore.getState().token ?? undefined;
}

function getStatusLabel(status: OrderStatus): string {
  return status === "current" ? "Order in progress" : "Delivered";
}

// backend order: { _id, items: [{ name, image, price, quantity }], status, estDelivery, total, createdAt }
function mapServerOrder(o: any): StoredOrder {
  const [first, second] = o.items;
  const status: OrderStatus = o.status;

  return {
    id: o._id,
    status,
    statusLabel: getStatusLabel(status),
    estDelivery: o.estDelivery,
    summary: first?.name ?? "",
    image: { uri: first?.image },
    thumbnail: second ? { uri: second.image } : undefined,
    extraItemsCount: o.items.length > 2 ? o.items.length - 2 : undefined,
    total: o.total,
    placedAt: new Date(o.createdAt).getTime(),
  };
}

export const useOrdersStore = create<OrdersState>((set) => ({
  orders: [],

  hydrateOrders: async () => {
    const token = getToken();
    if (!token) return;
    try {
      const data = await apiGet("/orders", token);
      set({ orders: data.map(mapServerOrder) });
    } catch (err) {
      console.error("Failed to load orders:", err);
    }
  },

  placeOrder: async (estDelivery = "30mins") => {
    const token = getToken();
    if (!token) throw new Error("Not authenticated");

    const data = await apiPost("/orders", { estDelivery }, token);
    const newOrder = mapServerOrder(data);

    set((state) => ({ orders: [newOrder, ...state.orders] }));
  },
}));
