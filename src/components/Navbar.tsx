import type { JSX } from "react";
import fetchLogo from "@/assets/Fetch.svg";
import { useState, useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  type Location,
  type NavigateFunction,
} from "react-router-dom";
import { Collapse } from "@material-tailwind/react";
import { Menu, Xmark } from "iconoir-react";
import { toast, Toaster } from "sonner";
import useAuth from "@/hooks/useAuth";
import handleLogout from "@/utils/handleLogout";
import { cn } from "@/utils/cn";

function NavList(): JSX.Element {
  const navigate: NavigateFunction = useNavigate();
  const {
    isLoggedIn,
    setIsLoggedIn,
  }: { isLoggedIn: boolean; setIsLoggedIn: (value: boolean) => void } =
    useAuth();
  const location: Location = useLocation();
  const currentPath: string = location.pathname;

  const handleNavigation = (endpoint: string): void => {
    if (isLoggedIn) navigate(endpoint);
    else {
      if (endpoint == "/search")
        toast.info("Please login to access the catalog");
      else toast.info("Please login to access your favorites");
    }
  };

  return (
    <ul className="mt-4 flex flex-col lg:gap-x-8 gap-y-1.5 lg:mt-0 lg:flex-row lg:items-center px-2">
      <li
        className={cn(
          "hover:text-valentino-hv transition-all duration-150 ease-in",
          currentPath === "/" && "text-valentino-hv"
        )}
        data-testid="home-nav"
      >
        <Link to="/" className="flex items-center gap-x-2 p-1">
          Home
        </Link>
      </li>
      <li
        onClick={() => handleNavigation("/search")}
        data-testid="search-nav"
        className={cn(
          "hover:text-valentino-hv transition-all duration-150 ease-in cursor-pointer",
          currentPath === "/search" && "text-valentino-hv"
        )}
      >
        <div className="flex items-center gap-x-2 p-1">Search</div>
      </li>
      <li
        onClick={() => handleNavigation("/favorites")}
        data-testid="favorites-nav"
        className={cn(
          "hover:text-valentino-hv transition-all duration-150 ease-in cursor-pointer",
          currentPath === "/favorites" && "text-valentino-hv"
        )}
      >
        <div className="flex items-center gap-x-2 p-1">Favorites</div>
      </li>
      {isLoggedIn ? (
        <li
          data-testid="logout-nav"
          className="pt-2 lg:pt-0"
          onClick={() => handleLogout(setIsLoggedIn, navigate)}
        >
          <div className="lg:hover:shadow-xs lg:ml-auto lg:inline-block text-center lg:w-25 py-1 lg:py-2 bg-valentino text-white rounded-md hover:bg-valentino-hv hover:cursor-pointer transition duration-150 ease-in">
            Logout
          </div>
        </li>
      ) : (
        <li
          data-testid="login-nav"
          className="pt-2 lg:pt-0"
          onClick={() => navigate("/login")}
        >
          <div className="lg:ml-auto lg:hover:shadow-xs lg:inline-block text-center lg:w-25 py-1 lg:py-2 bg-valentino text-white rounded-md hover:bg-valentino-hv hover:cursor-pointer transition duration-150 ease-in">
            Login
          </div>
        </li>
      )}
    </ul>
  );
}

export default function NavbarComp(): JSX.Element {
  const [openNav, setOpenNav] = useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className="bg-amber-400">
      <Toaster richColors position={"top-center"} />
      <nav className="lg:mx-auto w-full lg:max-w-screen-2xl px-2 h-min py-3 bg-transparent border-none shadow-none text-valentino">
        <div className="flex items-center gap-8 justify-between">
          <Link
            to={"/"}
            className="lg:w-50 w-30 pl-2 block lg:py-1"
            data-testid="logo-nav"
          >
            <img src={fetchLogo} alt="fetch logo" />
          </Link>
          <div className="hidden lg:w-full lg:flex lg:justify-end">
            <NavList />
          </div>
          {openNav ? (
            <Xmark
              onClick={() => setOpenNav(!openNav)}
              className="min-h-7 min-w-7 mr-2 relative left-1 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            />
          ) : (
            <Menu
              onClick={() => setOpenNav(!openNav)}
              className="h-6 w-6 mr-2 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            />
          )}
        </div>
        <Collapse open={openNav} className="lg:hidden">
          <NavList />
        </Collapse>
      </nav>
    </div>
  );
}
