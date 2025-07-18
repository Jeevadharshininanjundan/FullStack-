// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from '../axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchUser = async () => {
    try {
        console.log("[1] Fetching user...");
      const res = await axios.get('/me', { withCredentials: true });
       console.log("[2] User data:", res.data.user);
      setUser(res.data.user);
    } catch {
      console.error("[3] Fetch error:", error.response?.data || error.message);
      setUser(null);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading ,setUser, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUser= () => useContext(AuthContext);
