import type { Order } from "@/components/orders/OrderCard";
import type { CartItem } from "@/store/cartStore";
import { create } from "zustand";

export type OrderStatus = "current" | "previous";

export type StoredOrder = Order & {
  status: OrderStatus;
  placedAt: number;
};

type OrdersState = {
  orders: StoredOrder[];
  placeOrder: (items: CartItem[], estDelivery?: string) => void;
  markDelivered: (id: string) => void;
};

export const useOrdersStore = create<OrdersState>((set) => ({
  orders: [],

  placeOrder: (items, estDelivery = "30mins") =>
    set((state) => {
      if (items.length === 0) return state;

      const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const [first, second] = items;

      const newOrder: StoredOrder = {
        id: Date.now().toString(),
        status: "current",
        placedAt: Date.now(),
        estDelivery,
        summary: first.name,
        image: first.image,
        thumbnail: second?.image,
        extraItemsCount: items.length > 2 ? items.length - 2 : undefined,
        total,
      };

      return { orders: [newOrder, ...state.orders] };
    }),

  markDelivered: (id) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === id ? { ...o, status: "previous" } : o,
      ),
    })),
}));
