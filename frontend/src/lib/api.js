const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

/**
 * Centralized API client for making requests to the backend.
 * Handles JSON parsing, error responses, and auth headers.
 */
async function apiFetch(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // Send cookies for auth
    ...options,
  };

  // Don't set Content-Type for FormData (file uploads)
  if (options.body instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: 'An unexpected error occurred',
    }));
    throw new ApiError(error.error || 'Request failed', response.status, error);
  }

  // Handle 204 No Content
  if (response.status === 204) return null;

  return response.json();
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
  applyCoupon: (code) => apiFetch('/cart/apply-coupon', { method: 'POST', body: JSON.stringify({ code }) }),
  removeCoupon: () => apiFetch('/cart/coupon', { method: 'DELETE' }),

  // Auth
  sendOtp: (phone) => apiFetch('/auth/send-otp', { method: 'POST', body: JSON.stringify({ phone }) }),
  verifyOtp: (phone, otp) => apiFetch('/auth/verify-otp', { method: 'POST', body: JSON.stringify({ phone, otp }) }),
  register: (data) => apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  logout: () => apiFetch('/auth/logout', { method: 'POST' }),
  getMe: () => apiFetch('/auth/me'),

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

  // Content
  getBanners: () => apiFetch('/banners'),
  getFaqs: () => apiFetch('/faqs'),

  // Health
  health: () => fetch(`${API_URL.replace('/v1', '')}/health`).then((r) => r.json()),
};

export { ApiError };
export default api;
