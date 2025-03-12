import { createContext, useState, type ReactNode } from "react";
import { api } from "../lib/axios";
import type { User } from "@/types";

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  user: User | null;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post<User>("Auth/SignIn", {
        email,
        password,
      })

      if (response.status !== 200) {
        throw new Error("Invalid credentials");
      }

      if (response.data.token.token) {
        localStorage.setItem("authToken", response.data.token.token);
        setUser(response.data);
        setIsAuthenticated(true);
      }

    } catch (error) {
      console.error(error);
    }

  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await api.post("Auth/Register", { name, email, password });
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token.token);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error registering:", error);
      throw error;
    }
  };

  const signOut = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, register, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};