import { useState } from "react";
import spotsBg from "../assets/spots.png";
import Navbar from "../components/Navbar";
import { Input } from "@/components/ui/input";
import { Typography } from "@material-tailwind/react";
import type { FormEvent, JSX } from "react";

function Login(): JSX.Element {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {}

  return (
    <main className="w-full h-screen flex flex-col gap-50">
      <div className="bg-amber-400 h-min py-3 flex flex-col items-end">
        <Navbar />
      </div>
      <form className="self-center flex flex-col gap-8 inset-ring shadow-lg shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
        <h2 className="text-xl m-auto font-bold text-neutral-800 dark:text-neutral-200">
          Welcome to Fetch
        </h2>
        <div className="flex flex-col gap-1">
          <Typography
            as={"label"}
            type="small"
            className="font-semibold"
            htmlFor="name"
          >
            Name
          </Typography>
          <Input type="text" name="name" id="name" placeholder="John Smith" />
        </div>
        <div className="flex flex-col gap-1">
          <Typography
            as={"label"}
            type="small"
            className="font-semibold"
            htmlFor="email"
          >
            Email
          </Typography>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="example@domain.com"
          />
        </div>
        <button
          className="cursor-pointer relative block m-auto h-10 w-full rounded-md bg-valentino hover:bg-valentino-hv transition-all duration-150 ease-in font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          Log in &rarr;
        </button>
      </form>
      <div className="h-full w-full absolute flex -z-1 overflow-x-hidden">
        <img src={spotsBg} alt="spots background" className="object-cover" />
        <img src={spotsBg} alt="spots background" className="object-cover" />
      </div>
      {/* <img src={spotsBg} alt="spots background" className="absolute -z-1 w-full h-full object-cover" /> */}
    </main>
  );
}

export default Login;
