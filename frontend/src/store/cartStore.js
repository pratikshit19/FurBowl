import { create } from 'zustand';
import api from '@/lib/api';

/**
 * Storage helpers for user-scoped carts
 */
function getStorageKey(userId) {
  return userId ? `furbowl-cart-user-${userId}` : 'furbowl-cart-guest';
}

function loadCartFromStorage(userId) {
  if (typeof window === 'undefined') return { items: [], coupon: null };
  try {
    const key = getStorageKey(userId);
    let raw = localStorage.getItem(key);

    // One-time migration: If guest cart is empty, check legacy 'furbowl-cart'
    if (!raw && !userId) {
      const legacy = localStorage.getItem('furbowl-cart');
      if (legacy) {
        try {
          const parsed = JSON.parse(legacy);
          const legacyState = parsed?.state || parsed;
          if (Array.isArray(legacyState?.items) && legacyState.items.length > 0) {
            raw = JSON.stringify({
              items: legacyState.items,
              coupon: legacyState.coupon || null,
            });
            localStorage.setItem('furbowl-cart-guest', raw);
            localStorage.removeItem('furbowl-cart');
          }
        } catch (_) {}
      }
    }

    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        items: Array.isArray(parsed.items) ? parsed.items : [],
        coupon: parsed.coupon || null,
      };
    }
  } catch (err) {
    console.error('Failed to load cart from storage:', err);
  }
  return { items: [], coupon: null };
}

function saveCartToStorage(userId, state) {
  if (typeof window === 'undefined') return;
  try {
    const key = getStorageKey(userId);
    const payload = JSON.stringify({
      items: state.items || [],
      coupon: state.coupon || null,
    });
    localStorage.setItem(key, payload);
  } catch (err) {
    console.error('Failed to save cart to storage:', err);
  }
}

const useCartStore = create((set, get) => ({
  currentUserId: null,
  items: [],
  coupon: null,
  orderNote: '',
  isInitialized: false,
  isDrawerOpen: false,

  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  setOrderNote: (orderNote) => set({ orderNote }),

  /**
   * Set user scope: switches cart to the target user (or guest).
   * Merges guest items if a guest just logged in.
   */
  setUserScope: async (userId, options = { mergeGuest: true }) => {
    const previousUserId = get().currentUserId;

    // Save previous scope before switching
    if (get().isInitialized) {
      saveCartToStorage(previousUserId, get());
    }

    // Load target cart
    const targetCart = loadCartFromStorage(userId);
    let finalItems = [...targetCart.items];
    let finalCoupon = targetCart.coupon || get().coupon;

    // If logging in from guest state, merge guest items
    if (userId && !previousUserId && options.mergeGuest) {
      const guestCart = loadCartFromStorage(null);
      if (guestCart.items.length > 0) {
        const itemMap = new Map();
        finalItems.forEach((item) => {
          itemMap.set(`${item.variantId}-${Boolean(item.isSubscription)}`, { ...item });
        });

        guestCart.items.forEach((gItem) => {
          const key = `${gItem.variantId}-${Boolean(gItem.isSubscription)}`;
          if (itemMap.has(key)) {
            const existing = itemMap.get(key);
            existing.quantity += gItem.quantity;
          } else {
            itemMap.set(key, { ...gItem });
          }
        });

        finalItems = Array.from(itemMap.values());
        if (!finalCoupon && guestCart.coupon) {
          finalCoupon = guestCart.coupon;
        }

        // Clear guest cart so it doesn't leak to subsequent guests
        saveCartToStorage(null, { items: [], coupon: null });
      }
    }

    set({
      currentUserId: userId,
      items: finalItems,
      coupon: finalCoupon,
      isInitialized: true,
    });

    saveCartToStorage(userId, { items: finalItems, coupon: finalCoupon });

    // Sync with backend if authenticated
    if (userId) {
      try {
        if (finalItems.length > 0) {
          const synced = await api.syncCart(finalItems);
          if (synced?.items) {
            set({ items: synced.items });
            saveCartToStorage(userId, { items: synced.items, coupon: finalCoupon });
          }
        } else {
          const remote = await api.getCart();
          if (remote?.items?.length) {
            set({ items: remote.items });
            saveCartToStorage(userId, { items: remote.items, coupon: finalCoupon });
          }
        }
      } catch (err) {
        // Offline or demo fallback: local cart remains untouched
      }
    }
  },

  /**
   * Reset cart on logout: saves user cart, and switches to clean guest state
   */
  logoutCart: () => {
    const currentUserId = get().currentUserId;
    if (currentUserId) {
      saveCartToStorage(currentUserId, get());
    }

    const emptyGuestCart = { items: [], coupon: null };
    saveCartToStorage(null, emptyGuestCart);

    set({
      currentUserId: null,
      items: [],
      coupon: null,
      isInitialized: true,
    });
  },

  // Add item or increment quantity
  addItem: (product, variant, quantity = 1, isSubscription = false) => {
    const state = get();
    const existingIndex = state.items.findIndex(
      (i) => i.variantId === variant.id && i.isSubscription === isSubscription
    );

    let updatedItems;
    if (existingIndex >= 0) {
      updatedItems = [...state.items];
      updatedItems[existingIndex] = {
        ...updatedItems[existingIndex],
        quantity: updatedItems[existingIndex].quantity + quantity,
      };
    } else {
      updatedItems = [
        ...state.items,
        {
          id: `${variant.id}-${isSubscription ? 'sub' : 'ot'}-${Date.now()}`,
          productId: product.id,
          variantId: variant.id,
          productName: product.name,
          variantName: variant.name,
          slug: product.slug,
          imageUrl: product.images?.[0]?.url || null,
          isVeg: product.isVeg,
          price: Number(variant.sellingPrice),
          mrp: Number(variant.mrp),
          quantity,
          isSubscription,
        },
      ];
    }

    set({ items: updatedItems, isDrawerOpen: true });
    saveCartToStorage(state.currentUserId, { items: updatedItems, coupon: state.coupon });

    // Sync to backend if logged in
    if (state.currentUserId) {
      api.addToCart({
        productId: product.id,
        variantId: variant.id,
        quantity,
        isSubscription,
      }).catch(() => {});
    }
  },

  // Update quantity
  updateQuantity: (itemId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(itemId);
      return;
    }

    const state = get();
    const updatedItems = state.items.map((i) =>
      i.id === itemId ? { ...i, quantity } : i
    );

    set({ items: updatedItems });
    saveCartToStorage(state.currentUserId, { items: updatedItems, coupon: state.coupon });

    if (state.currentUserId) {
      api.updateCartItem(itemId, { quantity }).catch(() => {});
    }
  },

  // Remove item
  removeItem: (itemId) => {
    const state = get();
    const updatedItems = state.items.filter((i) => i.id !== itemId);

    set({ items: updatedItems });
    saveCartToStorage(state.currentUserId, { items: updatedItems, coupon: state.coupon });

    if (state.currentUserId) {
      api.removeCartItem(itemId).catch(() => {});
    }
  },

  // Clear all
  clearCart: () => {
    const state = get();
    set({ items: [], coupon: null });
    saveCartToStorage(state.currentUserId, { items: [], coupon: null });

    if (state.currentUserId) {
      api.clearCart().catch(() => {});
    }
  },

  // Apply coupon
  setCoupon: (coupon) => {
    set({ coupon });
    saveCartToStorage(get().currentUserId, get());
  },
  removeCoupon: () => {
    set({ coupon: null });
    saveCartToStorage(get().currentUserId, get());
  },

  // Computed totals
  getSubtotal: () => {
    return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  },
  getItemCount: () => {
    return get().items.reduce((sum, i) => sum + i.quantity, 0);
  },
  getDiscount: () => {
    const coupon = get().coupon;
    if (!coupon) return 0;
    const subtotal = get().getSubtotal();
    if (coupon.type === 'PERCENTAGE') {
      const discount = (subtotal * coupon.value) / 100;
      return coupon.maxDiscount ? Math.min(discount, coupon.maxDiscount) : discount;
    }
    return coupon.value;
  },
  getShipping: () => {
    const subtotal = get().getSubtotal();
    return subtotal >= 499 ? 0 : 49;
  },
  getTotal: () => {
    const subtotal = get().getSubtotal();
    const discount = get().getDiscount();
    const shipping = get().getShipping();
    return Math.max(0, subtotal - discount + shipping);
  },
  getTotalSavings: () => {
    const itemSavings = get().items.reduce((sum, i) => {
      const mrp = Number(i.mrp) || i.price;
      return sum + Math.max(0, mrp - i.price) * i.quantity;
    }, 0);
    const couponDiscount = Number(get().getDiscount()) || 0;
    return itemSavings + couponDiscount;
  },
}));

/**
 * Backward compatibility with `useCartStore.persist.rehydrate()`
 */
useCartStore.persist = {
  rehydrate: () => {
    if (typeof window === 'undefined') return;
    let userId = null;
    try {
      const raw = localStorage.getItem('furbowl-auth');
      if (raw) {
        const parsed = JSON.parse(raw);
        userId = parsed?.state?.user?.id || null;
      }
    } catch (_) {}
    useCartStore.getState().setUserScope(userId);
  },
  hasHydrated: () => useCartStore.getState().isInitialized,
};

export default useCartStore;
