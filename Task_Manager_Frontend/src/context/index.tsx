import { createContext, useEffect, useState, type ReactNode } from "react";
import { api } from "../lib/axios";
import { User } from "@/types";

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
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

      if (response.data) {

        localStorage.setItem("authToken", response.data.token);

        localStorage.setItem("user", JSON.stringify(response.data))

        setUser(response.data);

        setIsAuthenticated(true);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await api.post("Auth/Register", { username, email, password });
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
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, register, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};