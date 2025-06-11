import type { FavoritesState } from "@/pages/Search";

const getMatch = async (favorties: FavoritesState): Promise<string> => {
  const response = await fetch(
    "https://frontend-take-home-service.fetch.com/dogs/match",
    {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(favorties),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }

  const fetchedMatch: { match: string } = await response.json();
  return fetchedMatch.match;
};

export default getMatch;
