import { type Location } from "@/pages/Search";

interface LocationsSearch {
  results: Location[];
  total: number;
}

async function getZipCodes(search: string[]): Promise<string[]> {
  const zipRegex: RegExp = /^\d{5}$/;
  const stateRegex: RegExp = /^[A-Z]{2}$/;

  const cities: string[] = [];
  const states: string[] = [];
  const zips: string[] = [];

  search.forEach((entry) => {
    if (zipRegex.test(entry)) {
      zips.push(entry);
    } else if (stateRegex.test(entry.toUpperCase())) {
      states.push(entry);
    } else {
      cities.push(entry);
    }
  });

  const cityZipPromises: Promise<LocationsSearch>[] | [] =
    cities.length > 0
      ? cities.map((city) =>
          fetch(
            "https://frontend-take-home-service.fetch.com/locations/search",
            {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ city }),
            }
          ).then((res) => res.json())
        )
      : [];

  const stateZipPromises: Promise<LocationsSearch>[] | [] =
    states.length > 0
      ? states.map((state) =>
          fetch(
            "https://frontend-take-home-service.fetch.com/locations/search",
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ states: [state] }),
            }
          ).then((res) => res.json())
        )
      : [];

  const [cityResults, stateResults] = await Promise.all([
    Promise.allSettled(cityZipPromises),
    Promise.allSettled(stateZipPromises),
  ]);

  const cityZips: string[] = cityResults.flatMap((result) =>
    result.status === "fulfilled"
      ? result.value.results.map((loc: Location) => loc.zip_code)
      : []
  );

  const stateZips: string[] = stateResults.flatMap((result) =>
    result.status === "fulfilled"
      ? result.value.results.map((loc: Location) => loc.zip_code)
      : []
  );

  const allZips: string[] = [...zips, ...cityZips, ...stateZips];
  const dedupedZips: string[] = Array.from(new Set(allZips));

  return dedupedZips;
}

export default getZipCodes;
