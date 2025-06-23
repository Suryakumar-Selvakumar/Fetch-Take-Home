const getDistance = async (
  userZip: string,
  targetZips: string[]
): Promise<Record<string, number>> => {
  const params = new URLSearchParams();

  params.append("apikey", "c8a43d10-4fd9-11f0-892d-2fa6d621e07");
  params.append("code", userZip);
  params.append("compare", targetZips.join(","));
  params.append("country", "us");
  params.append("unit", "miles");

  const response: Response = await fetch(
    `https://app.zipcodebase.com/api/v1/distance?${params.toString()}`
  );

  const distanceVals = await response.json();

  return distanceVals.results;
};

export default getDistance;
