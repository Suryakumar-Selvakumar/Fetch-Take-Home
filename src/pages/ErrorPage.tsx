import { Link } from "react-router-dom";
import { useEffect, useState, type JSX } from "react";
import spotsBg from "@/assets/spots.png";
import fetchLogo from "@/assets/Fetch.svg";
import NavbarComp from "@/components/Navbar";
import dogFamImg from "@/assets/dog-family.jpg";

const ErrorPage = (): JSX.Element => {
  const [isMobileView, setIsMobileView] = useState<boolean>(
    window.matchMedia("(max-width: 1024px)").matches
  );

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
      <NavbarComp />
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
        aria-label="Page content"
        className="lg:relative flex flex-col items-center justify-center"
      >
        <section
          role="alert"
          aria-labelledby="error-heading"
          aria-live="assertive"
          className="lg:absolute relative -top-40 lg:-top-50 flex flex-col items-center justify-center"
        >
          <h1
            id="error-heading"
            className="lg:text-5xl text-[1.8rem] text-white font-medium text-shadow-md"
          >
            Whoops!
          </h1>
          <p className="text-white lg:text-3xl text-shadow-md text-center lg:text-justify">
            This route does not exist.
          </p>
        </section>
        <section
          aria-label="Page actions"
          className="relative mx-4 -mb-25 lg:-mb-0 lg:absolute flex flex-wrap lg:flex-nowrap justify-center items-center -top-35 lg:-top-20 2xl:gap-8 xl:gap-6 gap-4"
        >
          <div className="self-center flex flex-col gap-6 inset-ring inset-ring-valentino shadow-input mx-auto w-[calc(100vw-4rem)] lg:w-md bg-white p-6 rounded-2xl md:p-8 dark:bg-black">
            <img
              src={fetchLogo}
              alt="fetch logo"
              className="w-30 m-auto block py-1"
            />
            <hr />
            <Link
              aria-label="Navigate to the home page"
              to={"/"}
              className="m-auto underline text-valentino-hv text-center"
            >
              Back to home page
            </Link>
          </div>
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
};

export default ErrorPage;
