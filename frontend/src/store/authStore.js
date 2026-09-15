import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useCartStore from './cartStore';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setUser: (user, token) => {
        set({ user, token, isAuthenticated: true });
        if (typeof window !== 'undefined') {
          useCartStore.getState().setUserScope(user?.id);
        }
      },

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      logout: () => {
        if (typeof window !== 'undefined') {
          useCartStore.getState().logoutCart();
        }
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'furbowl-auth',
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        if (typeof window !== 'undefined') {
          useCartStore.getState().setUserScope(state?.user?.id || null);
        }
      },
    }
  )
);

export default useAuthStore;
