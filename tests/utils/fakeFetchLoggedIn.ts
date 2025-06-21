import handleFakeLogout from "./handleFakeLogout";
import setFakeBreeds from "./setFakeBreeds";
import setFakeDogIds from "./setFakeDogIds";
import { setFakeDogs, setFakeLocations } from "./setFakeDogsData";
import setFakeUserZip from "./setFakeUserZip";

const fakeFetchLoggedIn = (input: URL | RequestInfo): Promise<Response> => {
  const url = typeof input === "string" ? input : input.toString();

  if (url.includes("geoapify")) {
    return setFakeUserZip(true);
  } else if (url.includes("/dogs/breeds")) {
    return setFakeBreeds(true, ["breed 1", "breed 2"]);
  } else if (url.includes("/dogs/search")) {
    return setFakeDogIds();
  } else if (url.includes("/dogs")) {
    return setFakeDogs();
  } else if (url.includes("/locations")) {
    return setFakeLocations();
  } else {
    return handleFakeLogout();
  }
};

export default fakeFetchLoggedIn;
