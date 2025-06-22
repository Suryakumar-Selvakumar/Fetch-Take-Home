import createFetchResponse from "./createFetchResponse";

const setFakeMatch = () => {
  return Promise.resolve(
    createFetchResponse({
      match: "1",
    })
  );
};

export default setFakeMatch;
