// Analytics utility for GA4 and Meta Pixel tracking

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

// Log page view
export const pageview = (url) => {
  if (typeof window !== 'undefined') {
    if (window.gtag && GA_TRACKING_ID) {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
      });
    }
    if (window.fbq && META_PIXEL_ID) {
      window.fbq('track', 'PageView');
    }
  }
};

// Generic event tracking
export const trackEvent = ({ action, category, label, value, params = {} }) => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        ...params,
      });
    }
  }
};

// E-commerce specific events
export const trackAddToCart = (product, variant, quantity = 1) => {
  if (typeof window === 'undefined') return;

  const itemData = {
    item_id: product.id || product.slug,
    item_name: product.name,
    item_category: product.category?.name || 'Dog Food',
    price: variant?.sellingPrice || product.price,
    quantity,
  };

  if (window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'INR',
      value: (variant?.sellingPrice || product.price) * quantity,
      items: [itemData],
    });
  }

  if (window.fbq) {
    window.fbq('track', 'AddToCart', {
      content_ids: [product.id || product.slug],
      content_name: product.name,
      currency: 'INR',
      value: (variant?.sellingPrice || product.price) * quantity,
    });
  }
};

export const trackBeginCheckout = (cartItems, totalAmount) => {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', 'begin_checkout', {
      currency: 'INR',
      value: totalAmount,
      items: cartItems.map((item) => ({
        item_id: item.product?.id || item.product?.slug,
        item_name: item.product?.name,
        price: item.variant?.sellingPrice,
        quantity: item.quantity,
      })),
    });
  }

  if (window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      value: totalAmount,
      currency: 'INR',
      num_items: cartItems.length,
    });
  }
};

export const trackPurchase = (orderId, totalAmount, items = []) => {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: orderId,
      value: totalAmount,
      currency: 'INR',
      items: items.map((item) => ({
        item_id: item.productId || item.slug,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    });
  }

  if (window.fbq) {
    window.fbq('track', 'Purchase', {
      value: totalAmount,
      currency: 'INR',
      order_id: orderId,
    });
  }
};
