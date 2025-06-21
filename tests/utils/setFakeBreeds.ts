import createFetchResponse from "./createFetchResponse";

const setFakeBreeds = (okInput: boolean, breed: string[] = []) =>
  Promise.resolve(createFetchResponse(breed, okInput));

export default setFakeBreeds;
