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
    if (dogs.length === 0) return;

    const zipCodes = dogs.map((dog) => dog.zip_code);

    async function addDistanceValues() {
      const distanceValues = await getDistance(userZip, zipCodes);
      setDistVals(distanceValues);
    }

    addDistanceValues();
  }, [dogs]);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(325px,1fr))] auto-rows-max gap-8 p-8">
      {Object.keys(distVals).length &&
        dogs.map((dog) => (
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
