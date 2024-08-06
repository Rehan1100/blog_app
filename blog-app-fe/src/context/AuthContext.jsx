import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    role: '', // 'admin' or 'user'
  });

  const login = (role) => {
    setAuth({ isAuthenticated: true, role });
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, role: '' });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
