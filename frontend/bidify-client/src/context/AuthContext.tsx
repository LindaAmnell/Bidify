import { createContext, useEffect, useState, type ReactNode } from "react";
import {
  loginUser as loginApi,
  registerUser as registerApi,
  getMe,
} from "../services/authService";

import type { User } from "../types/user";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loginUser: (username: string, password: string) => Promise<void>;
  registerUser: (
    username: string,
    password: string,
    email: string,
  ) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const loadUser = async () => {
      try {
        const user = await getMe();
        setUser(user);
        console.log(user);
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      }
    };

    loadUser();
  }, []);

  const loginUser = async (username: string, password: string) => {
    const result = await loginApi(username, password);

    localStorage.setItem("token", String(result.token.token));
    console.log(result.user);
    setUser(result.user);
  };

  const registerUser = async (
    username: string,
    password: string,
    email: string,
  ) => {
    await registerApi(username, password, email);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginUser,
        registerUser,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
