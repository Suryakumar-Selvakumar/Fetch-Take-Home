import type { Dog } from "@/pages/Search";
import { type FavoritesState } from "@/AuthProvider";
import Card from "./Card";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import getDistance from "@/utils/getDistance";

interface CardsProps {
  dogs: Dog[];
  favorites: string[];
  setFavorites: Dispatch<SetStateAction<FavoritesState>>;
  isLoading: boolean;
}

export default function Cards({
  dogs,
  favorites,
  setFavorites,
  isLoading,
}: CardsProps) {
  const { userZip }: { userZip: string } = useAuth();
  const [distVals, setDistVals] = useState<Record<string, number | "MISSING">>(
    {}
  );

  useEffect(() => {
    if (dogs.length === 0 || !userZip) return;

    const zipCodes: string[] = dogs.map((dog) => dog.zip_code);

    async function addDistanceValues() {
      try {
        const distanceValues: Record<string, number> = await getDistance(
          userZip,
          zipCodes
        );
        const completeDistances: Record<string, number | "MISSING"> = {};

        zipCodes.forEach((zip) => {
          completeDistances[zip] =
            zip in distanceValues ? distanceValues[zip] : "MISSING";
        });

        setDistVals(completeDistances);
      } catch {
        const completeDistances: Record<string, number | "MISSING"> = {};

        zipCodes.forEach((zip) => {
          completeDistances[zip] = "MISSING";
        });

        setDistVals(completeDistances);
      }
    }

    addDistanceValues();
  }, [dogs, userZip]);

  const toggleFavorite = (dogId: string): void => {
    setFavorites((favs: FavoritesState) => {
      return favs.includes(dogId)
        ? favs.filter((id) => id !== dogId)
        : [...favs, dogId];
    });
  };

  return (
    <section
      aria-label="Dog cards"
      className="grid grid-cols-[repeat(auto-fill,minmax(275px,1fr))] auto-rows-max gap-8 p-4 lg:py-8 lg:pl-8"
    >
      {dogs.map((dog) => (
        <Card
          key={dog.id}
          dog={dog}
          favorite={favorites.includes(dog.id)}
          toggleFavorite={toggleFavorite}
          isLoading={isLoading}
          dist={distVals[dog.zip_code]}
        />
      ))}
    </section>
  );
}
