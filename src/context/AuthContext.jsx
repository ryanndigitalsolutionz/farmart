/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { storage } from "../hooks/useLocalStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => storage.get("currentUser", null));
  const [loading, setLoading] = useState(false);
  const [farmProfile, setFarmProfile] = useState(() => storage.get("farmProfile", null));
  const [isVerified, setIsVerified] = useState(() => storage.get("emailVerified", false));

  useEffect(() => { storage.set("currentUser", user); }, [user]);
  useEffect(() => { storage.set("farmProfile", farmProfile); }, [farmProfile]);
  useEffect(() => { storage.set("emailVerified", isVerified); }, [isVerified]);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const { api } = await import("../api");
      const data = await api.login(email, password);
      setUser(data);
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (data) => {
    setLoading(true);
    try {
      const { api } = await import("../api");
      const user = await api.register(data);
      setUser(user);
      return user;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setFarmProfile(null);
    setIsVerified(false);
  }, []);

  const updateFarmProfile = useCallback((profile) => {
    setFarmProfile(profile);
  }, []);

  const verifyEmail = useCallback(() => {
    setIsVerified(true);
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    role: user?.role || null,
    farmProfile,
    isVerified,
    login,
    register,
    logout,
    updateFarmProfile,
    verifyEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
/* eslint-enable react-refresh/only-export-components */
