import type { JSX, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";
import checkIsAuthenticated from "./utils/checkIsAuthenticated";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkAuth = async () => {
    const res = await checkIsAuthenticated();
    setIsLoggedIn(res);
    console.log(`[Auth] checkAuth ran. Logged in: ${res}`);
    if (!res) navigate("/");
  };

  useEffect(() => {
    checkAuth();

    // Check if user is logged in every 1 hour
    // and Update isLoggedIn state accordingly
    const interval = setInterval(() => {
      checkAuth();
    }, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
