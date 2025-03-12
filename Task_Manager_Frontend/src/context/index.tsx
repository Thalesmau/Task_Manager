import { createContext, useState, type ReactNode } from "react";
import { api } from "../lib/axios";

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post("Auth/SignIn", {
        email,
        password,
      })

      if (response.status !== 200) {
        throw new Error("Invalid credentials");
      }

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
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
        localStorage.setItem("authToken", response.data.token);
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
    <AuthContext.Provider value={{ isAuthenticated, signIn, register, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};