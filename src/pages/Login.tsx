import { useState } from "react";
import spotsBg from "@/assets/spots.png";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/input";
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

  return (
    <main className="w-full h-screen flex flex-col">
      <Navbar />
      <div
        style={{
          background: `radial-gradient(rgba(255,255,255,0.1), rgba(0,0,0,0.3)), url(${dogFamImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "100% 55%",
        }}
        className={`h-350 border-b-10 border-b-amber-400`}
      />
      <div className="relative z-10 flex flex-col w-screen items-center justify-center">
        <div className="absolute -top-50 flex flex-col items-center justify-center">
          <h1 className="text-5xl text-white font-medium text-shadow-md">
            Login to access our catalog
          </h1>
          <p className="text-white text-2xl text-shadow-md">
            Browse 10,000+ dogs from our network of over 14,500 shelters and
            rescues.
          </p>
        </div>
        <div className="absolute flex justify-center items-center -top-20 gap-8">
          {isLoggedIn ? (
            <div className="self-center flex flex-col gap-8 inset-ring inset-ring-valentino shadow-input mx-auto w-full w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
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
              className="self-center flex flex-col gap-8 inset-ring inset-ring-valentino shadow-input mx-auto w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black"
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
                <span>Login</span>{" "}
                <span className="text-2xl relative -top-1">&rarr;</span>
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="flex h-full max-h-150 bg-white overflow-hidden">
        <img
          src={spotsBg}
          alt="spots background"
          className="h-full w-full object-cover"
        />
        <img
          src={spotsBg}
          alt="spots background"
          className="h-full w-full object-cover"
        />
      </div>
    </main>
  );
}

export default Login;
