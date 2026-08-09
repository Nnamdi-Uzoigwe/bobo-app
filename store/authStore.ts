// import { create } from "zustand";

// type AuthUser = {
//   id: string;
//   email: string;
//   isVerified: boolean;
//   fullName?: string;
//   avatarUrl?: string;
// };

// type AuthState = {
//   token: string | null;
//   user: AuthUser | null;
//   setAuth: (token: string, user: AuthUser) => void;
//   logout: () => void;
// };

// export const useAuthStore = create<AuthState>((set) => ({
//   token: null,
//   user: null,
//   setAuth: (token, user) => set({ token, user }),
//   logout: () => set({ token: null, user: null }),
// }));

import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthUser = {
  id: string;
  email: string;
  isVerified: boolean;
  fullName?: string;
  avatarUrl?: string;
};

type AuthState = {
  token: string | null;
  user: AuthUser | null;
  hasHydrated: boolean;
  setAuth: (token: string, user: AuthUser) => void;
  logout: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      hasHydrated: false,
      setAuth: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ token: state.token, user: state.user }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
