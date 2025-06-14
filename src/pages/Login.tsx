import { useEffect, useState } from "react";
import spotsBg from "@/assets/spots.png";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Typography } from "@material-tailwind/react";
import type { FormEvent, JSX } from "react";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import dogFamImg from "@/assets/dog-family.jpg";
import fetchLogo from "@/assets/Fetch.svg";
import handleLogout from "@/utils/handleLogout";

function Login(): JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [isMobileView, setIsMobileView] = useState<boolean>(
    window.matchMedia("(max-width: 1024px)").matches || false
  );
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    try {
      const res = await fetch(
        "https://frontend-take-home-service.fetch.com/auth/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/JSON",
          },
          body: JSON.stringify({ name, email }),
        }
      );

      if (res.ok) {
        toast.success("Login Successful");
        setName("");
        setEmail("");
        setIsLoggedIn(true);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    const handleMediaChange = () => mediaQuery.matches && setIsMobileView(true);

    window.addEventListener("change", handleMediaChange);

    return () => window.removeEventListener("change", handleMediaChange);
  }, []);

  const mediaQuery = window.matchMedia("(max-width: 640px)");

  return (
    <main
      className="w-full lg:h-screen min-h-screen h-full flex flex-col overflow-x-hidden"
      style={{
        background: isMobileView ? `url(${spotsBg})` : "none",
        backgroundRepeat: isMobileView ? "repeat" : "none",
        backgroundSize: isMobileView ? "contain" : "none",
      }}
    >
      <Navbar />
      <div
        style={{
          background: `radial-gradient(rgba(255,255,255,0.1), rgba(0,0,0,0.3)), url(${dogFamImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: mediaQuery.matches ? "42% 100%" : "100% 55%",
        }}
        className={`lg:h-325 h-100 border-b-10 border-b-amber-400`}
      />
      <div className="lg:relative flex flex-col items-center justify-center">
        <div className="lg:absolute relative -top-40 lg:-top-50 flex flex-col items-center justify-center">
          <h1 className="lg:text-5xl text-[1.8rem] text-white font-medium text-shadow-md">
            Login to access our catalog
          </h1>
          <p className="text-white text-shadow-md text-center lg:text-justify">
            Browse 10,000+ dogs from our network of over 14,500 shelters and
            rescues.
          </p>
        </div>
        <div className="relative mx-4 -mb-25 lg:-mb-0 lg:absolute flex flex-wrap lg:flex-nowrap justify-center items-center -top-35 lg:-top-20 2xl:gap-8 xl:gap-6 gap-4">
          {isLoggedIn ? (
            <div className="self-center flex flex-col gap-8 inset-ring inset-ring-valentino shadow-input mx-auto lg:w-full w-[calc(100vw-4rem)] bg-white p-6 rounded-2xl md:p-8 dark:bg-black">
              <img
                src={fetchLogo}
                alt="fetch logo"
                className="w-30 m-auto block py-1"
              />
              <hr />
              <h1 className="text-2xl m-auto font-bold text-neutral-800 dark:text-neutral-200">
                Welcome!
              </h1>
              <Link
                to={"/search"}
                className="m-auto underline text-valentino-hv"
              >
                Browse our catalog of dogs
              </Link>
              <button
                onClick={() => handleLogout(setIsLoggedIn, navigate)}
                className="cursor-pointer flex justify-center items-center relative h-10 w-full rounded-md bg-valentino hover:bg-valentino-hv transition-all duration-150 ease-in font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
              >
                <span>Logout</span>{" "}
                <span className="text-2xl relative -top-1">&larr;</span>
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="self-center flex flex-col gap-6 inset-ring inset-ring-valentino shadow-input mx-auto w-[calc(100vw-4rem)] lg:w-md bg-white p-6 rounded-2xl md:p-8 dark:bg-black"
            >
              <img
                src={fetchLogo}
                alt="fetch logo"
                className="w-30 m-auto block py-1"
              />
              <hr />
              <div className="flex flex-col gap-1">
                <Typography
                  as={"label"}
                  type="small"
                  className="font-medium"
                  htmlFor="name"
                >
                  Name
                </Typography>
                <Input
                  autoComplete="on"
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  id="name"
                  placeholder="John Smith"
                  pattern="^[A-Za-z ]+$"
                  title="only alphabets are allowed"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Typography
                  as={"label"}
                  type="small"
                  className="font-medium"
                  htmlFor="email"
                >
                  Email
                </Typography>
                <Input
                  autoComplete="on"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@domain.com"
                />
              </div>
              <button
                className="cursor-pointer flex justify-center items-center relative h-10 w-full rounded-md bg-valentino hover:bg-valentino-hv transition-all duration-150 ease-in font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                type="submit"
              >
                <span>Login</span>
                <span className="text-2xl relative -top-1">&rarr;</span>
              </button>
            </form>
          )}
        </div>
      </div>
      <div
        className="hidden lg:block lg:h-full lg:overflow-hidden"
        style={{
          background: `url(${spotsBg})`,
          backgroundRepeat: "repeat",
          backgroundSize: "contain",
        }}
      />
    </main>
  );
}

export default Login;
