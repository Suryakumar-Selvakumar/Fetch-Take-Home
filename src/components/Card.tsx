import type { Dog } from "@/pages/Search";
import { Skeleton } from "./ui/skeleton";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface CardProps {
  dog: Dog;
  favorite: boolean;
  isLoading: boolean;
  dist: undefined | number;
}

export const Card = ({ dog, favorite, isLoading, dist }: CardProps) => {
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  return (
    <div className="bg-white grid grid-rows-[200px_125px] rounded-xl shadow-md">
      <div className="w-full h-full rounded-t-xl">
        {imageLoading && <Skeleton className="h-[200px] w-full rounded-t-xl" />}
        <img
          src={dog.img}
          alt={dog.name}
          onLoad={() => setImageLoading(false)}
          style={{
            opacity: imageLoading ? "0" : "1",
          }}
          className="object-fill h-[200px] w-full rounded-t-xl transition-opacity duration-500 ease-in"
        />
      </div>
      <div className="flex flex-col items-center gap-2 mt-3.5 px-4">
        {isLoading || !dist ? (
          <Skeleton className="h-5 w-[150px] mt-1.5" />
        ) : (
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-valentino-hv">
            {dog.name}
          </h4>
        )}
        {isLoading || !dist ? (
          <Skeleton className="h-4 w-full mt-1.5" />
        ) : (
          <span className="flex justify-center w-full gap-2 h-6">
            <span className="truncate">
              {dog.age} {dog.age == 1 ? "year" : "years"} old
            </span>{" "}
            <span>&bull;</span>
            <span className="truncate">{dog.breed}</span>
          </span>
        )}
        {isLoading || !dist ? (
          <Skeleton className="h-4 w-[175px] mt-2" />
        ) : (
          <span>
            {dist && (
              <Tooltip>
                <TooltipTrigger>{Math.round(dist)} miles away</TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={-5}>
                  <p>Zip: {dog.zip_code}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </span>
        )}
      </div>
    </div>
  );
};
