import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { cartApi } from '../api/cart.api';
import { UserContext } from './userContext';

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = useCallback(async () => {
    if (!user || !user.token) {
      setCartItems([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const items = await cartApi.getCart();
      setCartItems(Array.isArray(items) ? items : []);
    } catch (err) {
      console.warn('Could not fetch cart items:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (item) => {
    try {
      await cartApi.addToCart(item);
      await fetchCart();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      await cartApi.deleteItem(cartId);
      setCartItems((prev) => prev.filter((item) => item._id !== cartId));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const clearCart = async () => {
    try {
      await cartApi.clearCart();
      setCartItems([]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const totalAmount = cartItems.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount: cartItems.length,
        totalAmount,
        loading,
        error,
        fetchCart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
