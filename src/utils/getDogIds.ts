import type { SearchResult } from "@/pages/Search";

export const getDogIds = async (
  url: string,
  signal: AbortSignal | null
): Promise<SearchResult> => {
    const response = await fetch(url, {
      credentials: "include",
      signal,
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error: ${response.status} ${response.statusText}.`
      );
    }

    const searchData = await response.json();
    return searchData;
};
