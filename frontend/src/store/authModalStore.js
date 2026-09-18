import { create } from 'zustand';

export const useAuthModalStore = create((set) => ({
  isOpen: false,
  openAuthModal: () => set({ isOpen: true }),
  closeAuthModal: () => set({ isOpen: false }),
}));

export default useAuthModalStore;
