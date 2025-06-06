interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

export default async function getZipCodes(search: string[]): Promise<string[]> {
  const zipRegex = /^\d{5}$/;
  const stateRegex = /^[A-Z]{2}$/;

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

  const cityZipPromises = cities.map((city) =>
    fetch("https://frontend-take-home-service.fetch.com/locations/search", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city }),
    }).then((res) => res.json())
  );

  const stateZipPromise = fetch(
    "https://frontend-take-home-service.fetch.com/locations/search",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ states }),
    }
  ).then((res) => res.json());

  const [cityResults, stateResult] = await Promise.all([
    Promise.allSettled(cityZipPromises),
    stateZipPromise,
  ]);

  const cityZips = cityResults.flatMap((result) =>
    result.status === "fulfilled"
      ? result.value.results.map((loc: Location) => loc.zip_code)
      : []
  );

  const stateZips = stateResult.results.map((loc: Location) => loc.zip_code);

  const allZips = [...zips, ...cityZips, ...stateZips];
  const dedupedZips = Array.from(new Set(allZips));

  return dedupedZips;
}
