import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserProfile = {
  username?: string | null;
  email: string | null;
};

type AuthStoreState = {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearAuth: () => set({ user: null }),
    }),
    {
      name: "bn_game_username",
    },
  ),
);
