import type { JSX, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";
import checkIsAuthenticated from "./utils/checkIsAuthenticated";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import getUserZip from "./utils/getUserZip";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userZip, setUserZip] = useState<string>("");
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    const retrieveZip = (): void => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        getUserZip(latitude, longitude).then((zip) => {
          setUserZip(zip);
        });
      });
    };

    retrieveZip();

    const checkAuth = async (): Promise<void> => {
      const res = await checkIsAuthenticated();
      setIsLoggedIn(res);
      console.log(`[Auth] checkAuth ran. Logged in: ${res}`);
      if (!res) navigate("/");
    };

    checkAuth();

    // Check if user is logged in every 1 hour
    // and Update isLoggedIn state accordingly
    const interval = setInterval(() => {
      checkAuth();
    }, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userZip }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
