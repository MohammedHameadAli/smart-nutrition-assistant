import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  token: string | null;// current jwt
  login: (token: string) => void;// store token 
  logout: () => void;//remove token
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {// wraps app in main
  const [token, setToken] = useState<string | null>(//stores token from loacal storage so u stay logged in
    localStorage.getItem("token")
  );

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>//this makes that token and functions are available for entire /App
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
