import React, { createContext, useState } from 'react';
import { AUTH_TOKEN_KEY, AUTH_EMAIL_KEY, AUTH_USERID_KEY } from '../utils/constants';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const email = localStorage.getItem(AUTH_EMAIL_KEY);
    const userId = localStorage.getItem(AUTH_USERID_KEY);
    return {
      token,
      email,
      userId,
      isAuthenticated: Boolean(token),
    };
  });

  const login = (userData) => {
    const token = userData.token || (userData.result && userData.result.token);
    const email = userData.email || userData.result?.email || userData.result?.existingUser?.email || userData.user?.email;
    const userId = userData.userId || userData.result?.existingUser?._id || userData.user?.id;

    if (token) localStorage.setItem(AUTH_TOKEN_KEY, token);
    if (email) localStorage.setItem(AUTH_EMAIL_KEY, email);
    if (userId) localStorage.setItem(AUTH_USERID_KEY, userId);

    setUser({
      token,
      email,
      userId,
      isAuthenticated: Boolean(token),
    });
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_EMAIL_KEY);
    localStorage.removeItem(AUTH_USERID_KEY);
    setUser({ token: null, email: null, userId: null, isAuthenticated: false });
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, isAuthenticated: user.isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
}