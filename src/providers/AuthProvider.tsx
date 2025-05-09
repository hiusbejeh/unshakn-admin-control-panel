
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CORRECT_PASSWORD = "الله اكبر"; // The password you specified

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user has an auth token in localStorage
    const authToken = localStorage.getItem("unshakn-auth-token");
    if (authToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (password: string) => {
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      // Create a simple token (in a real app, this would be a JWT or similar)
      const token = Date.now().toString();
      localStorage.setItem("unshakn-auth-token", token);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("unshakn-auth-token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
