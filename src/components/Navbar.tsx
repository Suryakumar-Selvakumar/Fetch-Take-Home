import type { JSX } from "react";
import fetchLogo from "@/assets/Fetch.svg";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconButton, Collapse } from "@material-tailwind/react";
import { Menu, Xmark } from "iconoir-react";
import { toast, Toaster } from "sonner";
import useAuth from "@/hooks/useAuth";
import handleLogout from "@/utils/handleLogout";

function NavList(): JSX.Element {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleSearch = (): void => {
    if (isLoggedIn) navigate("/search");
    else toast.info("User must be logged in to access the catalog");
  };

  return (
    <ul className="mt-4 flex flex-col gap-x-8 gap-y-1.5 lg:mt-0 lg:flex-row lg:items-center">
      <li className="hover:text-valentino-hv transition-all duration-150 ease-in">
        <Link to="/" className="flex items-center gap-x-2 p-1">
          Home
        </Link>
      </li>
      <li
        onClick={handleSearch}
        className="hover:text-valentino-hv transition-all duration-150 ease-in cursor-pointer"
      >
        <div className="flex items-center gap-x-2 p-1">Search</div>
      </li>
    </ul>
  );
}

export default function Navbar(): JSX.Element {
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-amber-400">
      <nav className="mx-auto w-full max-w-screen-2xl h-min py-3">
        <Toaster richColors position={"top-center"} />
        <div className="flex items-center gap-8">
          <Link to={"/"} className="w-50 pl-2 block py-1">
            <img src={fetchLogo} alt="fetch logo" />
          </Link>
          <div className="hidden lg:w-full lg:flex lg:justify-end">
            <NavList />
          </div>
          {isLoggedIn ? (
            <button
              onClick={() => handleLogout(setIsLoggedIn, navigate)}
              className="hidden lg:hover:shadow-xs lg:ml-auto lg:inline-block lg:w-25 py-2 bg-valentino text-white rounded-md hover:bg-valentino-hv hover:cursor-pointer transition duration-150 ease-in"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="hidden lg:ml-auto lg:hover:shadow-xs lg:inline-block lg:w-25 py-2 bg-valentino text-white rounded-md hover:bg-valentino-hv hover:cursor-pointer transition duration-150 ease-in"
            >
              Login
            </button>
          )}
          <IconButton
            size="sm"
            variant="filled"
            color="gray"
            onClick={() => setOpenNav(!openNav)}
            className="ml-auto grid lg:hidden"
          >
            {openNav ? (
              <Xmark className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </IconButton>
        </div>
        {openNav && (
          <Collapse open={openNav}>
            <NavList />
            <button className="mt-4 px-3 py-2 bg-valentino text-white rounded-md hover:bg-valentino-hv hover:cursor-pointer transition duration-150 ease-in">
              Log In
            </button>
          </Collapse>
        )}
      </nav>
    </div>
  );
}
