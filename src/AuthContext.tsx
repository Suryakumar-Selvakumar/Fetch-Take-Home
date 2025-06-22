import { createContext, type Dispatch, type SetStateAction } from "react";
import type { FavoritesState } from "./AuthProvider";

export interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  userZip: string;
  favorites: FavoritesState;
  setFavorites: Dispatch<SetStateAction<FavoritesState>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
