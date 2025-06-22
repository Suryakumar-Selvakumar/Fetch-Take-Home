import handleFakeLogout from "./handleFakeLogout";
import setFakeBreeds from "./setFakeBreeds";
import setFakeDistance from "./setFakeDistance";
import setFakeDogIds from "./setFakeDogIds";
import { setFakeDogs, setFakeLocations } from "./setFakeDogsData";
import setFakeUserZip from "./setFakeUserZip";

const fakeFetchLoggedIn = (
  input: URL | RequestInfo,
  init?: RequestInit
): Promise<Response> => {
  const url = typeof input === "string" ? input : input.toString();
  const body = init?.body ? JSON.parse(init.body as string) : null;

  if (url.includes("geoapify")) {
    return setFakeUserZip(true);
  }

  if (url.includes("/dogs/breeds")) {
    return setFakeBreeds(true, ["breed 1", "breed 2"]);
  }

  if (url.includes("/dogs/search")) {
    return setFakeDogIds(url);
  }

  if (url.includes("/dogs")) {
    return setFakeDogs(body);
  }

  if (url.includes("/locations")) {
    return setFakeLocations(body);
  }

  if (url.includes("/distance")) {
    return setFakeDistance(url);
  }

  return handleFakeLogout();
};

export default fakeFetchLoggedIn;
