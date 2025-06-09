import type { Dog } from "@/pages/Search";
import { Card } from "./Card";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import getDistance from "@/utils/getDistance";

interface CardsProps {
  dogs: Dog[];
  favorites: string[];
  isLoading: boolean;
}

export default function Cards({ dogs, favorites, isLoading }: CardsProps) {
  const { userZip } = useAuth();
  const [distVals, setDistVals] = useState<Record<string, number>>({});

  useEffect(() => {
    if (dogs.length === 0 || !userZip) return;

    const zipCodes = dogs.map((dog) => dog.zip_code);

    async function addDistanceValues() {
      const distanceValues = await getDistance(userZip, zipCodes);
      setDistVals(distanceValues);
    }

    addDistanceValues();
  }, [dogs, userZip]);

  function isEmpty(obj: object) {
    return Object.keys(obj).length === 0;
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(275px,1fr))] auto-rows-max gap-8 p-8">
      {dogs.map((dog) => (
          <Card
            key={dog.id}
            dog={dog}
            favorite={favorites.includes(dog.id)}
            isLoading={isLoading}
            dist={
              Object.hasOwnProperty.call(distVals, dog.zip_code)
                ? distVals[dog.zip_code]
                : undefined
            }
          />
        ))}
    </div>
  );
}
