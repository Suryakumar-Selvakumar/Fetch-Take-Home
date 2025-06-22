import type { FavoritesState } from "@/AuthProvider";

interface Match {
  match: string;
}

const getMatch = async (favorties: FavoritesState): Promise<string> => {
  const response: Response = await fetch(
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

  const fetchedMatch: Match = await response.json();
  return fetchedMatch.match;
};

export default getMatch;
