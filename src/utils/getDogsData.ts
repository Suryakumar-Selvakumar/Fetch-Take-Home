import type { Dog, Location } from "@/pages/Search";

export const getDogsData = async (
  dogIds: string[],
  signal: AbortSignal | null
): Promise<Dog[]> => {
  const response = await fetch(
    "https://frontend-take-home-service.fetch.com/dogs",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dogIds),
      signal,
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }

  const dogObjs = await response.json();

  const zipCodes = dogObjs.map(
    (dog: {
      id: string;
      img: string;
      name: string;
      age: number;
      zip_code: string;
      breed: string;
    }) => dog.zip_code
  );

  const locationsResponse = await fetch(
    "https://frontend-take-home-service.fetch.com/locations",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(zipCodes),
      signal,
    }
  );

  if (!locationsResponse.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }
  const dogLocObjs = await locationsResponse.json();

  const locationMap = new Map(
    dogLocObjs.map((loc: Location) => [
      loc.zip_code,
      { city: loc.city, state: loc.state },
    ])
  );

  const updatedDogs = dogObjs.map((dog: Dog) => {
    const location: { city: string; state: string } = locationMap.get(
      dog.zip_code
    ) as { city: string; state: string };
    return {
      ...dog,
      ...location,
    };
  });

  return updatedDogs;
};
