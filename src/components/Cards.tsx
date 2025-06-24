import type { Dog } from "@/pages/Search";
import Card from "./Card";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import getDistance from "@/utils/getDistance";

interface CardsProps {
  dogs: Dog[];
  favorites: string[];
  toggleFavorite: (dogId: string) => void;
  isLoading: boolean;
  toggleModal: (dogId: string) => void;
}

export default function Cards({
  dogs,
  favorites,
  toggleFavorite,
  isLoading,
  toggleModal,
}: CardsProps) {

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
          toggleModal={toggleModal}
        />
      ))}
    </section>
  );
}
