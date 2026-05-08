import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  wishlist: string[];
  login: (email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      wishlist: [],
      login: async (email: string, password?: string) => {
        // Required credentials: test@mail.com / Password@123
        if (email === "test@mail.com" && password === "Password@123") {
          const mockUser: User = {
            id: "1",
            name: "Demo User",
            email: email,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent("Demo User")}&background=random`,
          };
          set({ user: mockUser, isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null, isAuthenticated: false, wishlist: [] }),
      toggleWishlist: (productId: string) => {
        const currentWishlist = get().wishlist;
        if (currentWishlist.includes(productId)) {
          set({ wishlist: currentWishlist.filter((id) => id !== productId) });
        } else {
          set({ wishlist: [...currentWishlist, productId] });
        }
      },
      isInWishlist: (productId: string) => get().wishlist.includes(productId),
    }),
    {
      name: "auth-storage",
    },
  ),
);
