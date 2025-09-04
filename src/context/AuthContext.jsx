import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged
      ? auth.onAuthStateChanged((u) => {
          setUser(u);
          setLoading(false);
        })
      : () => {};
    if (!auth.onAuthStateChanged) setLoading(false);
    return () => unsubscribe && unsubscribe();
  }, []);

  // Dummy auth functions for demo (replace with real Firebase logic)
  const login = async (email, password) => {};
  const register = async (name, email, password) => {};
  const logout = async () => {};
  const updateProfile = async (name, email) => {};
  const loginWithGoogle = async () => {};
  const loginWithFacebook = async () => {};
  const loginWithInstagram = async () => {};

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    loginWithGoogle,
    loginWithFacebook,
    loginWithInstagram,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);