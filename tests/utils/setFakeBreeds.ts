import createFetchResponse from "./createFetchResponse";

const setFakeBreeds = (okInput: boolean, breed: string[] = []) => {
  return createFetchResponse(breed, okInput);
};

export default setFakeBreeds;
