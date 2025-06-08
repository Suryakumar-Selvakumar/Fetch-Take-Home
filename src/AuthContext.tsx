import { createContext } from "react";

export interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  userZip: string;
}

export const AuthContext = createContext<AuthContextType | null>(null);
