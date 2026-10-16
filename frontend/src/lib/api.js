export const CLOUD_API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://furbowl.onrender.com/api/v1';
export const LOCAL_API_URL = 'http://localhost:5000/api/v1';

export function getApiBaseUrl() {
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return LOCAL_API_URL;
  }
  return CLOUD_API_URL;
}

/**
 * Centralized API client for making requests to the backend.
 * Automatically supports both development (localhost with cloud failover) and production.
 */
export async function apiFetch(endpoint, options = {}) {
  const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  const baseUrls = isLocal ? [LOCAL_API_URL, CLOUD_API_URL] : [CLOUD_API_URL];

  let authToken = options.token;
  if (!authToken && typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem('furbowl-auth');
      if (raw) {
        const parsed = JSON.parse(raw);
        authToken = parsed?.state?.token;
      }
    } catch (_) {}
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...options.headers,
    },
    credentials: 'include', // Send cookies for auth
    ...options,
  };

  // Don't set Content-Type for FormData (file uploads)
  if (options.body instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  let lastError = null;

  for (const base of baseUrls) {
    try {
      const response = await fetch(`${base}${endpoint}`, config);

      if (!response.ok) {
        const error = await response.json().catch(() => ({
          error: 'An unexpected error occurred',
        }));
        throw new ApiError(error.error || 'Request failed', response.status, error);
      }

      // Handle 204 No Content
      if (response.status === 204) return null;

      return response.json();
    } catch (err) {
      lastError = err;
      // If server responded with an application error (4xx/5xx), don't retry alternate URL
      if (err instanceof ApiError) throw err;
    }
  }

  throw lastError || new Error('Failed to connect to API server');
}

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// ─── API Methods ────────────────────────────────────────────────────────────

export const api = {
  // Products
  getProducts: (params) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/products${query ? `?${query}` : ''}`);
  },
  getFeaturedProducts: () => apiFetch('/products/featured'),
  getProduct: (slug) => apiFetch(`/products/${slug}`),

  // Categories
  getCategories: () => apiFetch('/categories'),

  // Cart
  getCart: () => apiFetch('/cart'),
  addToCart: (data) => apiFetch('/cart/items', { method: 'POST', body: JSON.stringify(data) }),
  updateCartItem: (id, data) => apiFetch(`/cart/items/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  removeCartItem: (id) => apiFetch(`/cart/items/${id}`, { method: 'DELETE' }),
  clearCart: () => apiFetch('/cart', { method: 'DELETE' }),
  syncCart: (items) => apiFetch('/cart/sync', { method: 'POST', body: JSON.stringify({ items }) }),
  applyCoupon: (code) => apiFetch('/cart/apply-coupon', { method: 'POST', body: JSON.stringify({ code }) }),
  removeCoupon: () => apiFetch('/cart/coupon', { method: 'DELETE' }),

  // Auth
  sendOtp: (phone) => apiFetch('/auth/send-otp', { method: 'POST', body: JSON.stringify({ phone }) }),
  verifyOtp: (phone, otp) => apiFetch('/auth/verify-otp', { method: 'POST', body: JSON.stringify({ phone, otp }) }),
  register: (data) => apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  logout: () => apiFetch('/auth/logout', { method: 'POST' }),
  getMe: () => apiFetch('/auth/me'),
  updateProfile: (data) => apiFetch('/auth/profile', { method: 'PUT', body: JSON.stringify(data) }),

  // Orders
  createOrder: (data) => apiFetch('/orders', { method: 'POST', body: JSON.stringify(data) }),
  getOrders: (params) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/orders${query ? `?${query}` : ''}`);
  },
  getOrder: (orderNumber) => apiFetch(`/orders/${orderNumber}`),
  cancelOrder: (id) => apiFetch(`/orders/${id}/cancel`, { method: 'POST' }),

  // Payments
  createRazorpayOrder: (data) => apiFetch('/payments/create-razorpay-order', { method: 'POST', body: JSON.stringify(data) }),
  verifyPayment: (data) => apiFetch('/payments/verify', { method: 'POST', body: JSON.stringify(data) }),

  // Reviews
  getProductReviews: (productId) => apiFetch(`/products/${productId}/reviews`),
  submitReview: (productId, data) => apiFetch(`/products/${productId}/reviews`, { method: 'POST', body: JSON.stringify(data) }),

  // User
  getProfile: () => apiFetch('/users/profile'),
  updateProfile: (data) => apiFetch('/users/profile', { method: 'PATCH', body: JSON.stringify(data) }),
  getAddresses: () => apiFetch('/users/addresses'),
  addAddress: (data) => apiFetch('/users/addresses', { method: 'POST', body: JSON.stringify(data) }),
  updateAddress: (id, data) => apiFetch(`/users/addresses/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteAddress: (id) => apiFetch(`/users/addresses/${id}`, { method: 'DELETE' }),

  // Wishlist
  getWishlist: () => apiFetch('/users/wishlist'),
  addToWishlist: (productId) => apiFetch(`/users/wishlist/${productId}`, { method: 'POST' }),
  removeFromWishlist: (productId) => apiFetch(`/users/wishlist/${productId}`, { method: 'DELETE' }),

  // Blog
  getBlogs: (params) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/blogs${query ? `?${query}` : ''}`);
  },
  getBlog: (slug) => apiFetch(`/blogs/${slug}`),

  // Quiz
  submitQuiz: (answers) => apiFetch('/quiz/recommend', { method: 'POST', body: JSON.stringify({ answers }) }),

  // Contact
  submitContact: (data) => apiFetch('/contact', { method: 'POST', body: JSON.stringify(data) }),
  subscribeNewsletter: (email) => apiFetch('/contact/newsletter', { method: 'POST', body: JSON.stringify({ email, consent: true }) }),

  // Content
  getBanners: () => apiFetch('/banners'),
  getFaqs: () => apiFetch('/faqs'),

  // Health
  health: () => fetch(`${API_URL.replace('/v1', '')}/health`).then((r) => r.json()),
};

export { ApiError };
export default api;
