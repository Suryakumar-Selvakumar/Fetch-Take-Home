const getDistance = async (userZip: string, targetZips: string[]) => {
  const params = new URLSearchParams();

  params.append("apikey", "089c29c0-44bf-11f0-ac13-7d15d5a225ae");
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
