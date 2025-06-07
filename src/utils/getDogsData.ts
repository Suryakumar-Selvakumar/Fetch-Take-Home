import type { Dog } from "@/pages/Search";

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
  return dogObjs;
};
