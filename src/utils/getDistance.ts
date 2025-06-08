const getDistance = async (userZip: string, targetZips: string[]) => {
  const params = new URLSearchParams();

  params.append("apikey", "0dabbc80-4488-11f0-9d01-81de3ad9c480");
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
