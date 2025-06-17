import createFetchResponse from "./createFetchResponse";

const setFakeBreeds = (okInput: boolean) => {
  return createFetchResponse([], okInput);
};

export default setFakeBreeds;
