import type { JSX } from "react";
import fetchLogo from "../assets/Fetch.svg";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconButton, Collapse } from "@material-tailwind/react";
import { Menu, Xmark } from "iconoir-react";
import checkIsAuthenticated from "@/lib/checkIsAuthenticated";
import { toast, Toaster } from "sonner";

interface NavbarProps {
  loggedIn?: boolean;
}

const LINKS = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Search",
    href: "/search",
  },
];

function NavList(): JSX.Element {
  return (
    <ul className="mt-4 flex flex-col gap-x-8 gap-y-1.5 lg:mt-0 lg:flex-row lg:items-center">
      {LINKS.map(({ title, href }) => (
        <li
          key={title}
          className="hover:text-valentino-hv transition duration-150 ease-in"
        >
          <Link
            to={href}
            className="flex items-center gap-x-2 p-1 hover:text-primary"
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Navbar({ loggedIn }: NavbarProps): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn || false);
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    checkIsAuthenticated().then(setIsLoggedIn);
  }, [loggedIn]);

  const handleLogout = async (): Promise<void> => {
    try {
      const res = await fetch(
        "https://frontend-take-home-service.fetch.com/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (res.ok) {
        toast.info("Logout Successful");
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="mx-auto w-full max-w-screen-xl">
      <Toaster richColors position={"top-center"} />
      <div className="flex items-center gap-8">
        <Link to={"/"} className="w-50 ml-2 mr-2 block py-1">
          <img src={fetchLogo} alt="fetch logo" />
        </Link>
        <div className="hidden lg:block lg:w-full lg:flex lg:justify-end">
          <NavList />
        </div>
        {isLoggedIn ? (
          <button
            onClick={() => navigate("/login")}
            className="hidden lg:ml-auto lg:inline-block lg:min-w-max px-3 py-2 bg-valentino text-white rounded-md hover:bg-valentino-hv hover:cursor-pointer transition duration-150 ease-in"
          >
            Log In
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="hidden lg:ml-auto lg:inline-block lg:min-w-max px-3 py-2 bg-valentino text-white rounded-md hover:bg-valentino-hv hover:cursor-pointer transition duration-150 ease-in"
          >
            Log Out
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
  );
}
