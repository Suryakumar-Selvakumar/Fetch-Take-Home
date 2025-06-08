import type { Dog } from "@/pages/Search";
import { Skeleton } from "./skeleton";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

interface CardProps {
  dog: Dog;
  favorite: boolean;
  isLoading: boolean;
  dist: number;
}

export const Card = ({ dog, favorite, isLoading, dist }: CardProps) => {
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log(dist);
  }, [dist]);

  return (
    <div className="grid grid-rows-[200px_125px] rounded-xl">
      <div className="w-full h-full rounded-t-xl">
        {imageLoading && <Skeleton className="h-[200px] w-full rounded-t-xl" />}
        <img
          src={dog.img}
          alt={dog.name}
          onLoad={() => setImageLoading(false)}
          className="object-fill h-[200px] w-full rounded-t-xl"
        />
      </div>
      <div className="flex flex-col items-center">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {dog.name}
        </h4>
        <span>
          {dog.age} {dog.age == 1 ? "year" : "years"} old &bull; {dog.breed}
        </span>
        {dist ? (
          <Tooltip>
            <TooltipTrigger>{Math.round(dist)} miles away</TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{dog.zip_code}</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <p>Zip: {dog.zip_code}</p>
        )}
      </div>
    </div>
  );
};
