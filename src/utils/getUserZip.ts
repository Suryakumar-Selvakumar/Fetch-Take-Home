const getUserZip = async (lat: number, lon: number) => {
  const response = await fetch(
    `https://api.geoapify.com/v1/postcode/search?lat=${lat}&lon=${lon}&apiKey=e99e8ed431f94cb7a7434f2a901c1e48`
  );

  const userLocation = await response.json();
  const userZip = await userLocation.features[0].properties.postcode;

  return userZip;
};

export default getUserZip;
