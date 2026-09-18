import { create } from 'zustand';

function getStorageKey(userId) {
  return userId ? `furbowl-wishlist-user-${userId}` : 'furbowl-wishlist-guest';
}

function loadWishlistFromStorage(userId) {
  if (typeof window === 'undefined') return [];
  try {
    const key = getStorageKey(userId);
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch (err) {
    console.error('Failed to load wishlist from storage:', err);
  }
  return [];
}

function saveWishlistToStorage(userId, items) {
  if (typeof window === 'undefined') return;
  try {
    const key = getStorageKey(userId);
    localStorage.setItem(key, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save wishlist to storage:', err);
  }
}

const useWishlistStore = create((set, get) => ({
  items: [],
  userId: null,
  isHydrated: false,

  setUserScope: (userId) => {
    const currentUserId = get().userId;
    if (currentUserId === userId && get().isHydrated) return;

    const items = loadWishlistFromStorage(userId);
    set({ userId, items, isHydrated: true });
  },

  rehydrate: () => {
    const userId = get().userId;
    const items = loadWishlistFromStorage(userId);
    set({ items, isHydrated: true });
  },

  isWishlisted: (productId) => {
    if (!productId) return false;
    return get().items.some(
      (item) => item.id === productId || item.slug === productId
    );
  },

  addItem: (product) => {
    if (!product) return;
    const items = get().items;
    const exists = items.some(
      (i) => i.id === product.id || (product.slug && i.slug === product.slug)
    );
    if (exists) return;

    const primaryVariant = product.variants?.[0];
    const primaryImage = product.images?.[0]?.url || product.image || '';

    const newItem = {
      id: product.id || product.slug,
      slug: product.slug || product.id,
      name: product.name || product.title || 'FurBowl Recipe',
      subtitle: product.subtitle || product.shortDescription || '',
      price: primaryVariant?.sellingPrice || product.price || 199,
      originalPrice: primaryVariant?.mrp || product.originalPrice || product.price || 219,
      image: primaryImage,
      isVeg: product.isVeg || product.slug?.includes('paneer') || product.slug?.includes('egg') || false,
      size: primaryVariant?.size || product.size || '100g Pouch',
      addedAt: new Date().toISOString(),
    };

    const nextItems = [newItem, ...items];
    set({ items: nextItems });
    saveWishlistToStorage(get().userId, nextItems);
  },

  removeItem: (productId) => {
    const items = get().items;
    const nextItems = items.filter(
      (i) => i.id !== productId && i.slug !== productId
    );
    set({ items: nextItems });
    saveWishlistToStorage(get().userId, nextItems);
  },

  toggleItem: (product) => {
    if (!product) return false;
    const isPresent = get().isWishlisted(product.id || product.slug);
    if (isPresent) {
      get().removeItem(product.id || product.slug);
      return false;
    } else {
      get().addItem(product);
      return true;
    }
  },

  clearWishlist: () => {
    set({ items: [] });
    saveWishlistToStorage(get().userId, []);
  },

  getItemCount: () => {
    return get().items.length;
  },
}));

export default useWishlistStore;
