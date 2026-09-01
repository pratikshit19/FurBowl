import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,

      // Add item or increment quantity
      addItem: (product, variant, quantity = 1, isSubscription = false) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.variantId === variant.id && i.isSubscription === isSubscription
          );
          if (existingIndex >= 0) {
            const updated = [...state.items];
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: updated[existingIndex].quantity + quantity,
            };
            return { items: updated };
          }
          return {
            items: [
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
            ],
          };
        });
      },

      // Update quantity
      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === itemId ? { ...i, quantity } : i
          ),
        }));
      },

      // Remove item
      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== itemId),
        }));
      },

      // Clear all
      clearCart: () => set({ items: [], coupon: null }),

      // Apply coupon
      setCoupon: (coupon) => set({ coupon }),
      removeCoupon: () => set({ coupon: null }),

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
    }),
    {
      name: 'furbowl-cart',
      skipHydration: true,
    }
  )
);

export default useCartStore;
