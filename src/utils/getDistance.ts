const getDistance = async (
  userZip: string,
  targetZips: string[]
): Promise<Record<string, number>> => {
  const params = new URLSearchParams();

  params.append("apikey", "38dfe140-4646-11f0-ac0f-8f0e193c5e69");
  params.append("code", userZip);
  params.append("compare", targetZips.join(","));
  params.append("country", "us");
  params.append("unit", "miles");

  const response = await fetch(
    `https://app.zipcodebase.com/api/v1/distance?${params.toString()}`
  );

  const distanceVals = await response.json();

  return distanceVals.results;
};

export default getDistance;
