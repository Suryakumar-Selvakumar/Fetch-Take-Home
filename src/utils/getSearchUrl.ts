import type { FiltersState, SortState } from "@/pages/Search";
import getZipCodes from "./getZipCodes";
import normalizeQueryArrayIndices from "./normalizeQueryArrayIndices";

export default async function getSearchUrl(
  filters: FiltersState,
  sort: SortState,
  query: string
): Promise<string> {
  if (query != "") {
    return `https://frontend-take-home-service.fetch.com${normalizeQueryArrayIndices(query)}`;
  } else {
    const { search, breeds, ageMin, ageMax }: FiltersState = filters;
    const { sortBy, orderBy }: SortState = sort;

    const params: URLSearchParams = new URLSearchParams();

    if (search.length > 0) {
      const zipCodes: string[] = await getZipCodes(search);
      zipCodes.forEach((zip) => params.append("zipCodes", zip));
    }

    breeds.forEach((breed: string) => params.append("breeds", breed));

    if (ageMin > 0) params.append("ageMin", ageMin.toString());
    if (ageMax < 15) params.append("ageMax", ageMax.toString());
    params.append("size", "9");
    params.append("sort", `${sortBy}:${orderBy}`);

    return `https://frontend-take-home-service.fetch.com/dogs/search?${params.toString()}`;
  }
}
