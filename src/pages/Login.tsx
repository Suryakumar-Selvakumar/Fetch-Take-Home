import { useEffect, useState } from "react";
import spotsBg from "@/assets/spots.png";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import type { FormEvent, JSX } from "react";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import dogFamImg from "@/assets/dog-family.jpg";
import fetchLogo from "@/assets/Fetch.svg";
import handleLogout from "@/utils/handleLogout";
import { MoveLeft, MoveRight } from "lucide-react";

function Login(): JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [isMobileView, setIsMobileView] = useState<boolean>(
    window.matchMedia("(max-width: 1024px)").matches
  );
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    try {
      const res: Response = await fetch(
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
    const mediaQuery: MediaQueryList = window.matchMedia("(max-width: 1024px)");

    const handleMediaChange = (event: MediaQueryListEvent): false | void =>
      setIsMobileView(event.matches);

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

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
        aria-hidden="true"
        style={{
          background: `radial-gradient(rgba(255,255,255,0.1), rgba(0,0,0,0.3)), url(${dogFamImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: isMobileView ? "42% 100%" : "40% 55%",
        }}
        className={`lg:h-325 h-100 border-b-10 border-b-amber-400`}
      />
      <section
        aria-label="Page description"
        role="region"
        className="lg:relative flex flex-col items-center justify-center"
      >
        <section
          aria-labelledby="login-page-heading"
          className="lg:absolute relative -top-40 lg:-top-50 flex flex-col items-center justify-center"
        >
          <h1
            id="login-page-heading"
            className="lg:text-5xl text-[1.8rem] text-white font-medium text-shadow-md"
          >
            Login to access our catalog
          </h1>
          <p className="text-white lg:text-3xl text-shadow-md text-center lg:text-justify">
            Browse 10,000+ dogs from our network of over 14,500 shelters and
            rescues.
          </p>
        </section>
        <section
          role="region"
          aria-label="Page content"
          aria-live="polite"
          className="relative mx-4 -mb-25 lg:-mb-0 lg:absolute flex flex-wrap lg:flex-nowrap justify-center items-center -top-35 lg:-top-20 2xl:gap-8 xl:gap-6 gap-4"
        >
          {isLoggedIn ? (
            <section
              aria-label="User actions"
              className="self-center flex flex-col gap-6 inset-ring inset-ring-valentino shadow-input mx-auto w-[calc(100vw-4rem)] lg:w-md bg-white p-6 rounded-2xl md:p-8 dark:bg-black"
            >
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
                type="button"
                aria-label="Press to logout"
                data-testid="logout-button"
                onClick={() => handleLogout(setIsLoggedIn, navigate)}
                className="cursor-pointer flex gap-1 justify-center items-center relative h-10 w-full rounded-md bg-valentino hover:bg-valentino-hv transition-all duration-150 ease-in font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
              >
                <span>Logout</span> <MoveLeft size={20} />
              </button>
            </section>
          ) : (
            <form
              role="form"
              onSubmit={handleSubmit}
              className="self-center flex flex-col gap-6 inset-ring inset-ring-valentino shadow-input mx-auto w-[calc(100vw-4rem)] lg:w-md bg-white p-6 rounded-2xl md:p-8 dark:bg-black"
              aria-label="Login form"
            >
              <img
                src={fetchLogo}
                alt="fetch logo"
                className="w-30 m-auto block py-1"
              />
              <hr />
              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="name">
                  Name
                </label>
                <Input
                  autoComplete="on"
                  required
                  data-testid="name-input"
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
                <label className="font-medium" htmlFor="email">
                  Email
                </label>
                <Input
                  autoComplete="on"
                  required
                  data-testid="email-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@domain.com"
                />
              </div>
              <button
                aria-label="Press to submit login form"
                data-testid="login-form"
                className="cursor-pointer gap-1 flex justify-center items-center relative h-10 w-full rounded-md bg-valentino hover:bg-valentino-hv transition-all duration-150 ease-in font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                type="submit"
              >
                <span>Login</span> <MoveRight size={20} />
              </button>
            </form>
          )}
        </section>
      </section>
      <div
        aria-hidden="true"
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
