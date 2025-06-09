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
  const [distVals, setDistVals] = useState<Record<string, number | "MISSING">>(
    {}
  );

  useEffect(() => {
    if (dogs.length === 0 || !userZip) return;

    const zipCodes: string[] = dogs.map((dog) => dog.zip_code);

    async function addDistanceValues() {
      const distanceValues = await getDistance(userZip, zipCodes);
      const completeDistances: Record<string, number | "MISSING"> = {};

      zipCodes.forEach((zip) => {
        completeDistances[zip] =
          zip in distanceValues ? distanceValues[zip] : "MISSING";
      });

      console.log(zipCodes, distanceValues);

      setDistVals(completeDistances);
    }

    addDistanceValues();
  }, [dogs, userZip]);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(275px,1fr))] auto-rows-max gap-8 p-8">
      {dogs.map((dog) => (
        <Card
          key={dog.id}
          dog={dog}
          favorite={favorites.includes(dog.id)}
          isLoading={isLoading}
          dist={distVals[dog.zip_code]}
        />
      ))}
    </div>
  );
}
