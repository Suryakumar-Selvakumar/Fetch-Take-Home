import handleFakeLogin from "./handleFakeLogin";
import setFakeBreeds from "./setFakeBreeds";
import setFakeUserZip from "./setFakeUserZip";

const fakeFetchLoggedOut = (input: URL | RequestInfo): Promise<Response> => {
  const url = typeof input === "string" ? input : input.toString();

  if (url.includes("geoapify")) {
    return setFakeUserZip(false);
  } else if (url.includes("/dogs/breeds")) {
    return setFakeBreeds(false);
  } else {
    return handleFakeLogin();
  }
};

export default fakeFetchLoggedOut;
