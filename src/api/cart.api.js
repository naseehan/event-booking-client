import apiClient from './client';

export const cartApi = {
  getCart: async () => {
    const response = await apiClient.get('/getCart');
    return response.data || [];
  },

  addToCart: async (item) => {
    const response = await apiClient.post('/cart', item);
    return response.data;
  },

  deleteItem: async (cartId) => {
    const response = await apiClient.delete(`/deleteCart/${cartId}`);
    return response.data;
  },

  clearCart: async () => {
    const response = await apiClient.delete('/clearCart');
    return response.data;
  },

  createCheckout: async (products) => {
    const response = await apiClient.post('/purchase', { products });
    return response.data;
  },
};
