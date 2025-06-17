import type { JSX } from "react";

interface HoverCardProps {
  imgUrl: string;
  gifUrl: string;
  name: string;
  desc: string;
  navigateToSearch: (breed: string) => void;
}

export default function HoverCard({
  imgUrl,
  gifUrl,
  name,
  desc,
  navigateToSearch,
}: HoverCardProps): JSX.Element {
  return (
    <div
      className="max-w-xs h-min cursor-pointer"
      onClick={() => navigateToSearch(name)}
      data-testid="hover-card"
    >
      <div
        style={{
          background: `url(${imgUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className={
          "group relative w-full h-96 overflow-hidden rounded-2xl shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800 transition-all duration-500"
        }
      >
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            backgroundImage: `url(${gifUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            zIndex: 0,
          }}
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-500 z-10" />
        <div className="relative z-50">
          <h1 className="font-bold text-xl md:text-3xl text-gray-50 relative">
            {name}
          </h1>
          <p className="font-normal text-base text-gray-50 relative my-4">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}
