import type { FilterState, SortState } from "@/pages/Search";
import getZipCodes from "./getZipCodes";

export default async function getSearchUrl(
  filters: FilterState,
  sort: SortState,
  query: string
): Promise<string> {
  if (query) {
    return `https://frontend-take-home-service.fetch.com${query}`;
  } else {
    const { search, breeds, ageMin, ageMax } = filters;
    const { sortBy, orderBy } = sort;

    const params = new URLSearchParams();

    if (search.length > 0) {
      const zipCodes: string[] = await getZipCodes(search);
      zipCodes.forEach((zip) => params.append("zipCodes", zip));
    }

    breeds.forEach((breed) => params.append("breeds", breed));

    if (ageMin > 0) params.append("ageMin", ageMin.toString());
    if (ageMax < 29) params.append("ageMax", ageMax.toString());
    params.append("sort", `${sortBy}:${orderBy}`);

    return `https://frontend-take-home-service.fetch.com/dogs/search?${params.toString()}`;
  }
}
