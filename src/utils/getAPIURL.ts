import type { FilterState, SortState } from "@/pages/Search";

export default function getAPIURL(
  filters: FilterState,
  sort: SortState
): string {
  const { search, breeds, ageMin, ageMax } = filters;
  const { sortBy, orderBy } = sort;

  return `https://frontend-take-home-service.fetch.com&sort=${sortBy}:${orderBy}`;
}
