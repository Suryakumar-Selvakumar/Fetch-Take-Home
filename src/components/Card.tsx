import type { Dog } from "@/pages/Search";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/utils/cn";
import { useState } from "react";

interface CardProps {
  dog: Dog;
  favorite: boolean;
  toggleFavorite: (dogId: string) => void;
  isLoading: boolean;
  toggleModal: (dogId: string) => void;
}

const Card = ({
  dog,
  favorite,
  toggleFavorite,
  isLoading,
  toggleModal,
}: CardProps) => {
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  return (
    <article
      aria-label={`Dog card for ${dog.name}`}
      className="bg-white select-none grid grid-rows-[200px_125px] rounded-xl shadow-lg relative"
    >
      <button
        type="button"
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        aria-pressed={!!favorite}
        style={{
          zIndex: isLoading || imageLoading ? "-10" : "1",
        }}
        className={cn(
          "rounded-full p-2 absolute fill-transparent stroke-valentino-hv stroke-20 cursor-pointer right-3 top-3 hover:bg-[rgb(255,255,255,1)]",
          "bg-[rgb(255,255,255,0.7)]",
          "transition-colors ease-in duration-100",
          "transition-opacity duration-500 ease-in"
        )}
        data-testid="favorite-button"
        onClick={() => toggleFavorite(dog.id)}
      >
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="#ffffff"
          strokeWidth="1.5"
          className="overflow-visible group"
        >
          <path
            className="[stroke-dashoffset:0] [stroke-dasharray:1550] origin-center group-hover:animate-stroke-animation duration-200 ease-in-out fill-mode-forwards"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.9999 3.94228C13.1757 2.85872 14.7069 2.25 16.3053 2.25C18.0313 2.25 19.679 2.95977 20.8854 4.21074C22.0832 5.45181 22.75 7.1248 22.75 8.86222C22.75 10.5997 22.0831 12.2728 20.8854 13.5137C20.089 14.3393 19.2938 15.1836 18.4945 16.0323C16.871 17.7562 15.2301 19.4985 13.5256 21.14L13.5216 21.1438C12.6426 21.9779 11.2505 21.9476 10.409 21.0754L3.11399 13.5136C0.62867 10.9374 0.62867 6.78707 3.11399 4.21085C5.54605 1.68984 9.46239 1.60032 11.9999 3.94228Z"
            fill={favorite ? "var(--color-valentino-hv)" : "transparent"}
          ></path>
        </svg>
      </button>
      <div className="w-full h-full rounded-t-xl relative">
        {(isLoading || imageLoading) && (
          <Skeleton className="h-[200px] w-full rounded-t-xl rounded-b-none absolute z-10" />
        )}
        {!isLoading && (
          <img
            onClick={() => {
              if (!imageLoading) {
                toggleModal(dog.id);
              }
            }}
            onLoad={() => setImageLoading(false)}
            src={dog.img}
            alt={dog.name}
            style={{
              opacity: imageLoading ? "0" : "1",
              pointerEvents: imageLoading ? "none" : "auto",
            }}
            className="cursor-pointer object-fill h-[200px] w-full rounded-t-xl transition-opacity duration-500 ease-in"
          />
        )}
      </div>
      <div className="flex flex-col items-center gap-2 mt-3.5 px-4">
        {isLoading ? (
          <Skeleton className="h-5 w-[150px] mt-1.5" />
        ) : (
          <button
            type="button"
            role="heading"
            aria-level={4}
            aria-label="Open dog modal"
            onClick={() => {
              if (!imageLoading) {
                toggleModal(dog.id);
              }
            }}
            data-testid="dog-card-name"
            className="cursor-pointer scroll-m-20 text-xl font-semibold tracking-tight text-valentino-hv animate-pop-in"
          >
            {dog.name}
          </button>
        )}
        {isLoading ? (
          <Skeleton className="h-4 w-full mt-1.5" />
        ) : (
          <p className="flex justify-center w-full gap-2 h-6 animate-pop-in">
            <span className="text-ellipsis overflow-hidden">
              {dog.age} {dog.age == 1 ? "year" : "years"} old
            </span>{" "}
            <span>&bull;</span>
            <span className="truncate" data-testid="dog-card-breed">
              {dog.breed}
            </span>
          </p>
        )}
        {isLoading ? (
          <Skeleton className="h-4 w-[175px] mt-2" />
        ) : (
          <p className="animate-pop-in" data-testid="dog-card-address">
            {dog.city}, {dog.state}, {dog.zip_code}
          </p>
        )}
      </div>
    </article>
  );
};

export default Card;
