const getDistance = async (userZip: string, targetZips: string[]) => {
  const params = new URLSearchParams();

  params.append("apikey", "343b0660-4576-11f0-8f7e-7fab4b89e210");
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
